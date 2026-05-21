const router = require('express').Router();
const auth = require('../middleware/auth');
const db = require('../config/db');

// GET /api/products — lấy sản phẩm của tenant
router.get('/', auth, async (req, res) => {
  const result = await db.query(
    'SELECT * FROM products WHERE tenant_id = $1 ORDER BY created_at DESC',
    [req.user.tenantId]
  );
  res.json(result.rows);
});

// GET /api/products/all — lấy TẤT CẢ sản phẩm (cho trang mua hàng, không cần auth)
router.get('/all', async (req, res) => {
  const result = await db.query(
    'SELECT * FROM products ORDER BY created_at DESC'
  );
  res.json(result.rows);
});

// POST /api/products
// Body: { name, price, image, category, description }
router.post('/', auth, async (req, res) => {
  const { name, price, image, category, description } = req.body;
  const result = await db.query(
    'INSERT INTO products (tenant_id, name, price, image, category, description) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *',
    [req.user.tenantId, name, price, image, category, description]
  );
  res.json(result.rows[0]);
});

// DELETE /api/products/:id
router.delete('/:id', auth, async (req, res) => {
  const result = await db.query(
    'DELETE FROM products WHERE id=$1 AND tenant_id=$2 RETURNING id',
    [req.params.id, req.user.tenantId]
  );
  if (!result.rows[0]) return res.status(404).json({ message: 'Not found' });
  res.json({ message: 'Deleted' });
});

// PUT /api/products/:id
router.put('/:id', auth, async (req, res) => {
  const { name, price, image, category, description } = req.body;
  const result = await db.query(
    'UPDATE products SET name=$1, price=$2, image=$3, category=$4, description=$5 WHERE id=$6 AND tenant_id=$7 RETURNING *',
    [name, price, image, category, description, req.params.id, req.user.tenantId]
  );
  if (!result.rows[0]) return res.status(404).json({ message: 'Not found' });
  res.json(result.rows[0]);
});

module.exports = router;