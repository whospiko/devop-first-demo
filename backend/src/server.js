require('dotenv').config()
const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to Node 1
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

app.get("/", (req, res) => {
    res.status(200).send("Welcome");
})

// API Endpoint
app.get('/api/health', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');

    res.status(200).json({
      success: true,
      message: 'Database connected successfully',
      time: result.rows[0].now,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: 'Database connection failed',
      error: err.message,
    });
  }
});

app.get('/api/capybaras', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM capybaras');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database connection failed' });
  }
});

const PORT = 8888;

app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));