const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const port = 3000;
const rutas = require('./src/rutas/rutas');
const urlAxel = 'mongodb+srv://admin:admin@cluster0.dwmdwry.mongodb.net/Cluster0';

// Middleware to serve static files
app.use(express.static('public'));
app.use(cors());
app.use('', rutas);

// Routes
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/dashboard', (req, res) => {
  res.sendFile(__dirname + '/public/dashboard.html');
});

app.get('/manage', (req, res) => {
  res.sendFile(__dirname + '/public/manage.html');
});

app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/public/login.html');
});

app.get('/new_account', (req, res) => {
  res.sendFile(__dirname + '/public/signup.html');
});

// Start the server after MongoDB connects
mongoose
  .connect(urlAxel)
  .then(() => {
    console.log('VBDB ONLINE');
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log('VBDB DISABLED', err);
  });
