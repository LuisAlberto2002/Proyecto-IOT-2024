const express = require('express');
const app = express();
const cors = require('cors');
const port = 3000;
const url = 'mongodb+srv://VulpesBlack:36944757Ara@vbdb.7dcjohk.mongodb.net/VBCompany?retryWrites=true&w=majority';

// Middleware to serve static files
app.use(express.static('public'));
app.use(cors());

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