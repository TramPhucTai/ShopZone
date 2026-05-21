const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

// POST /api/auth/register
// Body: { shopName, email, password }
router.post('/register', async (req, res) => {
  const { shopName, email, password } = req.body;
  const client = await db.connect();
  try {
    await client.query('BEGIN');
    const tenant = await client.query(
      'INSERT INTO tenants (name, email) VALUES ($1, $2) RETURNING id',
      [shopName, email]
    );
    const tenantId = tenant.rows[0].id;
    const hashed = await bcrypt.hash(password, 10);
    await client.query(
      'INSERT INTO users (tenant_id, name, email, password, role) VALUES ($1,$2,$3,$4,$5)',
      [tenantId, shopName, email, hashed, 'admin']
    );
    await client.query('COMMIT');
    res.json({ message: 'Registered successfully' });
  } catch (err) {
    await client.query('ROLLBACK');
    res.status(400).json({ error: err.message });
  } finally {
    client.release();
  }
});

// POST /api/auth/login
// Body: { email, password }
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = result.rows[0];
    if (!user || !(await bcrypt.compare(password, user.password)))
      return res.status(400).json({ message: 'Invalid credentials' });

    const tenantResult = await db.query('SELECT name FROM tenants WHERE id = $1', [user.tenant_id]);
    const shopName = tenantResult.rows[0]?.name;

    const token = jwt.sign(
      { userId: user.id, tenantId: user.tenant_id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    res.json({ token, shopName });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;