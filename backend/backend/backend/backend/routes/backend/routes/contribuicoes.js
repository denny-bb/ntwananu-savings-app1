const express = require('express');
const { Pool } = require('pg');
const authenticateToken = require('../middleware/authenticateToken');
const calcularMulta = require('../utils/calcularMulta');
const router = express.Router();
const pool = new Pool({ connectionString: process.env.DB_URL });

router.post('/', authenticateToken, async (req, res) => {
  const { mes_ano, valor } = req.body;
  const usuario_id = req.user.id;
  const { multa, valor_liquido } = calcularMulta(valor); // Usa util do estatuto

  try {
    const result = await pool.query(
      'INSERT INTO contribuicoes (usuario_id, mes_ano, valor_contribuido, multa, data_pagamento) VALUES ($1, $2, $3, $4, CURRENT_DATE) RETURNING *',
      [usuario_id, mes_ano, valor_liquido, multa]
    );
    res.json({ sucesso: true, contribuicao: result.rows[0], mensagem: 'Contribuição registrada conforme estatuto.' });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

// Listar contribuições do usuário
router.get('/minhas', authenticateToken, async (req, res) => {
  const usuario_id = req.user.id;
  try {
    const result = await pool.query('SELECT * FROM contribuicoes WHERE usuario_id = $1 ORDER BY data_pagamento DESC', [usuario_id]);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

module.exports = router;
