const express = require('express');
const ejs = require('ejs');
const router = require('./routes');

const app = express();

const PORT = 3000;

// Middleware
app.set('view engine', 'ejs');
app.use(express.static('public'));

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/', router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
