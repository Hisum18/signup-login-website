require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const cors = require('cors'); // Import cors
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001; // Changed port to 3001
const saltRounds = 10;

// Middleware
app.use(cors()); // Enable CORS
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// MySQL Database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Hisumshash12',
    database: 'my_database'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL database');
});

app.post('/signup', (req, res) => {
    console.log("Received request at /signup");
    const { username, password } = req.body;
    console.log('Data received:', { username, password });

    if (!username || !password) {
        return res.status(400).send('Username and password are required');
    }

    bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
        if (err) {
            console.error('Error hashing password:', err);
            return res.status(500).send('Error processing password');
        }

        const query = 'INSERT INTO users (username, password_hash) VALUES (?, ?)';
        db.query(query, [username, hashedPassword], (err, result) => {
            if (err) {
                console.error('Error inserting user:', err);
                return res.status(500).send('Error registering user');
            }
            res.send('User registered successfully');
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
