const express = require('express');
const bcrypt = require('bcrypt');
const db = require('./dbConfig');
const router = express.Router();

// Target -> CRUD

// home page view route
router.get('/', (req, res) => {
  res.render('home');
});

// Get method to show create route template
router.get('/create', (req, res) => {
  res.render('create');
});

// Store some data in the database
router.post('/create', async (req, res) => {
  const { full_name, age, email, password } = req.body;

  if (!full_name || !age || !email || !password) {
    return res.json({ message: 'All fields are required!' });
  }

  const uniqueId = new Date().getTime();
  const hashPassword = await bcrypt.hash(password, 10);

  // sql query, data, callback(err, result)
  db.query(
    'INSERT INTO users (id, full_name, age, email, password) VALUES (?, ?, ?, ?, ?)',
    [uniqueId, full_name, age, email, hashPassword],
    (err, result) => {
      if (err) {
        return res.json({ message: 'Something went wrong!' });
      } else {
        return res.json({ message: 'User created successfully!' });
      }
    }
  );
});

// Get method show login route template
router.get('/login', (req, res) => {
  res.render('login');
});

// Login route
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({ message: 'All fields are required!' });
  }

  try {
    db.query(
      'SELECT * FROM users WHERE email = ?',
      [email],
      async (err, result) => {
        if (err) {
          return res.json({ message: 'Something went wrong!' });
        } else {
          if (result.length === 0) {
            return res.json({ message: 'Invalid credentials!' });
          } else {
            const comparePassword = await bcrypt.compare(
              password,
              result[0].password
            );

            if (comparePassword) {
              return res.json({ message: 'User logged in successfully!' });
            } else {
              return res.json({ message: 'Invalid credentials!' });
            }
          }
        }
      }
    );
  } catch (error) {
    return res.json({ message: 'Something went wrong!' });
  }
});

module.exports = router;
