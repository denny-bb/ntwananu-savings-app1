const jwt = require('jsonwebtoken');
const { Pool } = require('pg');
const pool = new Pool({ connectionString: process.env.DB_URL });

module.exports = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ erro: 'Token requerido' });

  jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
    if (err) return res.status(403).json({ erro: 'Token inválido' });
    try {
      const usuario = await pool.query('SELECT * FROM usuarios WHERE id = $1', [user.id]);
      req.user = usuario.rows[0];
      next();
    } catch (err) {
      res.status(500).json({ erro: err.message });
    }
  });
};
