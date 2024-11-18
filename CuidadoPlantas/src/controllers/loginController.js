const User = require('../Models/userModel'); 
const bcrypt = require('bcrypt'); // For password hashing
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'your_secret_key';

// User Signup
const signup = async (req, res) => {
  const { name, email, password, token } = req.body;


  console.log("Received signup data:", req.body);
  if (!name || !email || !password || !token) {
    return res.status(400).send("<h1>All fields are required</h1>");
  }

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send("<h1>User already exists</h1>");
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save the new user to the database
    const newUser = new User({
      name,
      email,
      password: hashedPassword, 
      role: "cliente",         
      token,
      status: "active",         
    });

    await newUser.save();

    res.redirect("/login");
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).send("<h1>Internal Server Error</h1>");
  }
};



// User Login
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Verify the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send('<h1>User not found</h1>');
    }

    // Check the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send('<h1>Invalid credentials</h1>');
    }

    // Successful login
    res.redirect('/dashboard'); // Redirect to the dashboard or another page
  } catch (error) {
    console.error(error);
    res.status(500).send('<h1>Internal Server Error</h1>');
  }
};


module.exports = {
  signup,
  login,
};
