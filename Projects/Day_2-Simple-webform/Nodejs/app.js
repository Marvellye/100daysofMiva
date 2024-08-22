const express = require('express');
const mysql = require('mysql');

const app = express();

// Database connection parameters
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'links'
});

// Connect to the database
db.connect((err) => {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to the database.');
});

// Set up /getlinks route
app.get('/getlinks', (req, res) => {
    const sql = 'SELECT github, linkedin, devto, portfolio FROM links';

    db.query(sql, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(result);
    });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on <http://localhost>:${PORT}`);
});