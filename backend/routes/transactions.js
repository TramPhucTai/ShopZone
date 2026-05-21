const router = require('express').Router();
const auth = require('../middleware/auth');
const db = require('../config/db');

// GET /api/transactions — lấy transactions của tenant
router.get('/', auth, async (req, res) => {
  const result = await db.query(
    'SELECT * FROM transactions WHERE tenant_id = $1 ORDER BY created_at DESC',
    [req.user.tenantId]
  );
  res.json(result.rows);
});

module.exports = router;