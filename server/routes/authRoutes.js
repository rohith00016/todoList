const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); 
const User = require('../models/User');

const router = express.Router();
const saltRounds = 10;


router.post('/signup', async (req, res) => {
  const { username, password } = req.body;

  try {
    
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      console.error('Username already exists:', username);
      return res.status(400).json({ error: 'Username already exists' });
    }

    // If the user does not exist, proceed with user registration
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const user = new User({ username, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error registering user' });
  }
});


router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      console.error('User not found:', username);
      return res.status(404).json({ error: 'User not found' });
    }

    const match = await bcrypt.compare(password, user.password);
    if (match) {
   
      const token = jwt.sign({ userId: user._id }, 'yourSecretKey', { expiresIn: '1h' });
      console.log(token);

      console.log('Login successful:', username);
      return res.status(200).json({ message: 'Login successful', token, userId: user._id });
    } else {
      console.error('Incorrect password for user:', username);
      return res.status(401).json({ error: 'Incorrect password' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ error: 'Error during login' });
  }
});


router.post('/logout', (req, res) => {
  
  req.session.destroy();
  res.json({ message: 'Logout successful' });
});


module.exports = router;