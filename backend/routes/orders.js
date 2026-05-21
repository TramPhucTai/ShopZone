const router = require('express').Router();
const auth = require('../middleware/auth');
const db = require('../config/db');
const { sendReceiptEmail } = require('../utils/mailer');

// POST /api/orders — tạo order mới (từ checkout)
// Body: { cart: [{productId, quantity, deliveryOptionId}], customerEmail }
router.post('/', async (req, res) => {
  const { cart, customerEmail } = req.body;
  const client = await db.connect();
  try {
    await client.query('BEGIN');

    let totalCents = 0;
    const enrichedItems = [];

    for (const item of cart) {
      const pResult = await client.query(
        'SELECT * FROM products WHERE id = $1', [item.productId]
      );
      const product = pResult.rows[0];
      if (!product) throw new Error(`Product not found: ${item.productId}`);

      const subtotal = product.price * item.quantity;
      totalCents += subtotal;
      enrichedItems.push({
        productId: product.id,
        productName: product.name,
        image: product.image,
        price: product.price,
        quantity: item.quantity,
        subtotal,
        deliveryOptionId: item.deliveryOptionId
      });
    }

    // Lấy tenantId từ product đầu tiên
    const tenantId = (await db.query(
      'SELECT tenant_id FROM products WHERE id = $1', [cart[0].productId]
    )).rows[0].tenant_id;

    const orderCode = 'ORD-' + Date.now();
    const orderResult = await client.query(
      `INSERT INTO orders (tenant_id, order_code, customer_email, total_amount, status)
       VALUES ($1,$2,$3,$4,'processing') RETURNING *`,
      [tenantId, orderCode, customerEmail || null, totalCents]
    );
    const order = orderResult.rows[0];

    for (const item of enrichedItems) {
      await client.query(
        `INSERT INTO order_items (order_id, product_id, product_name, image, price, quantity, subtotal, delivery_option_id)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8)`,
        [order.id, item.productId, item.productName, item.image,
         item.price, item.quantity, item.subtotal, item.deliveryOptionId]
      );
    }

    await client.query('COMMIT');

    // Gửi email nếu có
    if (customerEmail) {
      await sendReceiptEmail(customerEmail, { ...order, items: enrichedItems });
    }

    res.json({ ...order, items: enrichedItems });
  } catch (err) {
    await client.query('ROLLBACK');
    res.status(400).json({ error: err.message });
  } finally {
    client.release();
  }
});

// GET /api/orders — lấy orders của tenant (seller xem)
router.get('/', auth, async (req, res) => {
  const orders = await db.query(
    'SELECT * FROM orders WHERE tenant_id = $1 ORDER BY created_at DESC',
    [req.user.tenantId]
  );
  const result = [];
  for (const order of orders.rows) {
    const items = await db.query(
      'SELECT * FROM order_items WHERE order_id = $1', [order.id]
    );
    result.push({ ...order, items: items.rows });
  }
  res.json(result);
});

// GET /api/orders/:id
router.get('/:id', async (req, res) => {
  const order = await db.query('SELECT * FROM orders WHERE id = $1', [req.params.id]);
  if (!order.rows[0]) return res.status(404).json({ message: 'Not found' });
  const items = await db.query('SELECT * FROM order_items WHERE order_id = $1', [req.params.id]);
  res.json({ ...order.rows[0], items: items.rows });
});

module.exports = router;