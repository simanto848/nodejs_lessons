const express = require('express');
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
router.post('/create', (req, res) => {
  const { full_name, age, email, password } = req.body;

  if (!full_name || !age || !email || !password) {
    return res.json({ message: 'All fields are required!' });
  }

  const uniqueId = new Date().getTime();
  console.log('Unique Id: ', uniqueId);

  // sql query, data, callback(err, result)
  db.query(
    'INSERT INTO users (id, full_name, age, email, password) VALUES (?, ?, ?, ?, ?)',
    [uniqueId, full_name, age, email, password],
    (err, result) => {
      if (err) {
        console.log('Something went wrong in the sql: ', err);
      } else {
        console.log('Data inserted successfully');
      }
    }
  );
});

module.exports = router;
