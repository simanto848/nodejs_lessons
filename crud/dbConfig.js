const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'crud',
});

db.connect((err) => {
  if (err) {
    console.log('Error connecting database', err);
  }
  console.log('Database connected');
});

module.exports = db;
