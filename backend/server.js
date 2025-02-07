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
    

    app.post('/posts', async (req, res) => {
        const { titulo, img, descripcion } = req.body;
        try {
            const result = await pool.query(
                'INSERT INTO posts (titulo, img, descripcion, likes) VALUES ($1, $2, $3, 0) RETURNING *',
                [titulo, img, descripcion]
            );
            res.status(201).json(result.rows[0]);
        } catch (error) {
            res.status(500).json({ error: 'Error agregando en el post' });
        }
    });
    
    app.delete('/posts/:id', async (req, res) => {
        const { id } = req.params;
    
        try {
            const result = await pool.query('DELETE FROM posts WHERE id = $1', [id]);
    
            if (result.rowCount === 0) {
                return res.status(404).json({ message: 'Post no encontrado' });
            }
    
            res.json({ message: 'Post eliminado correctamente' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error en el servidor' });
        }
    });
    app.use(express.json());

    
app.patch("/posts/:id/like", (req, res) => {
    const { id } = req.params;
    const posts = posts.find(p => p.id === parseInt(id));

    if (!posts) {
        return res.status(404).json({ error: "Post no encontrado" });
    }

    posts.likes += 1;
    res.json(posts);
});

// nota, me medio perdi en la parte II de like me, cualquier cosa quedo atento a correcion.