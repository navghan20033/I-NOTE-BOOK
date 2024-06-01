const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Joi = require('joi');
const bcrypt = require('bcryptjs'); 



const schema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().required()

});

// cheking validations 
router.post('/createuser', async (req, res, next) => {

  try  {
    const { error } = schema.validate(req.body);
  
    if (error) {
  
      return res.status(400).json({ error: error.details[0].message });
    }
    
  } catch (error) {
    console.log(error.message)
  }
  
  next();

 

})

// creating user is all validations are not having any problem
router.post('/createuser', async (req, res) => {

  const salt = await bcrypt.genSalt(5);
  secPass = await bcrypt.hash(req.body.password, salt)

  const user = await User.create({

    name: req.body.name,
    password: secPass,
    email: req.body.email,
  })
  // await user.save();
  console.log(req.body,user);
  // console.log(user.password);
  res.status(201).json({ message: 'User created successfully', user });

})


//Getting User Requires Login
router.post('/getuser', async (req, res) => {

  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    const comparePassword = await bcrypt.compare(password, user.password);
    if (comparePassword) {
      user = await User.findOne({ email }).select('-password')
      res.json(user)

    } else {
      res.json("User Not Authorized")
    }


  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: "Internal server Error" });
  }

})




router.post('/login', async (req, res) => { // Use an asynchronous function since you're using asynchronous operations

  const { email, password } = req.body; // Destructure the req.body object

  try {
    let user = await User.findOne({ email }); // Use await to wait for the database query

    if (!user) {
      
      // window.location.reload()
      return res.status(400).json("User not found......");
    }

    const comparePassword = await bcrypt.compare(password, user.password); // Compare the password using bcrypt

    if (!comparePassword) {
      return res.status(400).json("Login With Correct credentials......");
    } else {
      res.json("Login Successful");
    }

  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: "Internal server Error" });
  }
});

module.exports = router 