const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;


app.use(cors());
app.use(express.json());

app.listen(port, () => {
    console.log(`Servidor corriendo a la velocidad de la luz en http://localhost:${port}`);
});

const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'likeme',
    password: '020310',
    port: 5432,
});

pool.connect()
    .then(() => console.log("✅ Conectado a PostgreSQL"))
    .catch(err => console.error("❌ Error conectando a PostgreSQL", err));

    app.get('/posts', async (req, res) => {
        try {
            const result = await pool.query('SELECT * FROM posts');
            res.json(result.rows);
        } catch (error) {
            res.status(500).json({ error: 'Error obteniendo posts' });
        }
    });


    app.get('/posts', async (req, res) => {
        try {
            const result = await pool.query('SELECT * FROM posts');
            res.json(result.rows);
        } catch (error) {
            res.status(500).json({ error: 'Error obteniendo posts' });
        }
    });
    

    app.post('/posts', async (req, res) => {
        const { titulo, img, descripcion } = req.body;
        try {
            const result = await pool.query(
                'INSERT INTO posts (titulo, img, descripcion, likes) VALUES ($1, $2, $3, 0) RETURNING *',
                [titulo, img, descripcion]
            );
            res.status(201).json(result.rows[0]);
        } catch (error) {
            res.status(500).json({ error: 'Error agregando el post' });
        }
    });
    