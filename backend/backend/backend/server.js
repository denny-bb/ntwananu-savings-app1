const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const contribuicoesRoutes = require('./routes/contribuicoes');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/contribuicoes', contribuicoesRoutes);

// Endpoint para saldo (com query real)
app.get('/api/saldo', async (req, res) => {
  const { Pool } = require('pg');
  const pool = new Pool({ connectionString: process.env.DB_URL });
  try {
    const result = await pool.query('SELECT SUM(valor_contribuido - multa) AS saldo_total FROM contribuicoes WHERE mes_ano = $1', [new Date().toISOString().slice(0,7)]);
    res.json({ saldo_total: result.rows[0].saldo_total || 0 });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

// Endpoint para rotação (exemplo simples: sorteia um membro aleatório)
app.get('/api/rotacao', async (req, res) => {
  const { Pool } = require('pg');
  const pool = new Pool({ connectionString: process.env.DB_URL });
  try {
    const membros = await pool.query('SELECT id, nome FROM usuarios WHERE status_membro = $1', ['ativo']);
    const beneficiario = membros.rows[Math.floor(Math.random() * membros.rows.length)];
    res.json({ beneficiario });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
