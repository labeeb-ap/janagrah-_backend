
const express = require('express');
const mongoose = require('mongoose');
const mongodb= require('./app')
const app = express();
const port = 2000;

// Middleware to parse JSON bodies
app.use(express.json());


//for checking 
  app.get('/',async(req,res)=>{
    res.json("hello")
  })

// Route to check username and password
app.post('/wardmemberlogin', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the user exists in the database
    const user = await wardmembers.findOne({ username, password });

    if (user) {
      res.json({ success: true, message: 'Login successful' });
    } else {
      res.status(401).json({ success: false, message: 'Invalid username or password' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

app.listen(port, () => console.log(`Server running on port ${port}`));


