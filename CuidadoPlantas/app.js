const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const rutas =  require('./src/rutas/rutas.js');
const port = 3000;
const url = 'mongodb+srv://VulpesBlack:36944757Ara@vbdb.7dcjohk.mongodb.net/VBCompany?retryWrites=true&w=majority';

// Middleware to serve static files
app.use(express.static('public'));
app.use(cors());
app.use('',rutas);

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

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

app.use(cors({
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']
}));

mongoose.connect(url).then(client=>{
  app.listen(3001,()=>{
      console.log('VBDB ONLINE');
  })
}).catch(err=>{
  console.log('VBDB DISSABLE', err);
});