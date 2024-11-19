const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const rutas = require('./src/rutas/rutas');
const mongoUrl = 'mongodb+srv://VulpesBlack:36944757Ara@vbdb.7dcjohk.mongodb.net/VBCompany?retryWrites=true&w=majority';
const port = 3000;

// MongoDB connection string
const urlAxel = 'mongodb+srv://admin:admin@cluster0.dwmdwry.mongodb.net/Cluster0';

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Middleware to enable CORS
app.use(cors());

// Middleware to serve static files
app.use(express.static('public'));

// Routes (defined after bodyParser)
app.use('', rutas);

// Routes for static HTML pages
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

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

app.use(cors({
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']
}));


mongoose.connect(urlAxel).then(client=>{
  app.listen(3001,()=>{
      console.log('VBDB ONLINE');
  })})
  .catch((err) => {
    console.log('VBDB DISABLED', err);
  });
