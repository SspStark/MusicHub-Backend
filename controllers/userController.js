const User=require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken')
require('dotenv').config()

const isPasswordStrong=(password)=>{
    // Using regular expressions(regex) to validate password
    const length=/.{8,}/;            // At least 8 characters
    const capital=/[A-Z]/;           // At least one uppercase letter
    const lowerCase=/[a-z]/;         // At least one lowercase letter
    const specialCharacter=/[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/;  // At least one special character
    const number=/[0-9]/;            // At least one number

    const isLengthValid = length.test(password);
    const hasCapital = capital.test(password);
    const hasLowerCase = lowerCase.test(password);
    const hasSpecialChar = specialCharacter.test(password);
    const hasNumber = number.test(password);

    return(isLengthValid && hasCapital && hasLowerCase && hasSpecialChar && hasNumber);
  }

  const signUp= async (request, response) => {
    const { email, username, password } = request.body;
  
    // Check for empty details
    if (email==='' || username===''){
        return response.status(400).json({error:"Details shouldn't be empty"});
    }

    // Check for valid email
    if (!email.includes('@gmail.com')){
        return response.status(400).json({error:"Invalid email"});
    }

    const userEmail=email.trim().toLowerCase()

    // try {
    //   const response = await zeroBounce.validateEmail(userEmail);
    //   console.log('email verified success')
    // } catch (error) {
    //   console.error(error);
    // }

    // Check for password strength
    if (!isPasswordStrong(password)){
        return response.status(400).json({error:'password must be at least 8 characters and one capital,lower,special character & number'});
    }
  
    try {
      const existingUser = await User.findOne({ username });
  
      if (!existingUser) {
        const hashedPassword = await bcrypt.hash(password, 10);
  
        const newUser = new User({
          email:userEmail,
          username,
          password: hashedPassword,
        });
  
        await newUser.save();
        response.status(201).json({ msg: 'Signed up successfully' });
      } else {
        response.status(400).json({ error: 'Username already exists' });
      }
    } catch (error) {
      console.error('Error during sign-up', error);
      return response.status(500).json({ error: 'Internal server error' });
    }
  };

  const login=async (request, response) => {
    const { username, password } = request.body;
  
    try {
      const user = await User.findOne({ username });
  
      if (user) {
        const isPasswordMatched = await bcrypt.compare(password, user.password);
        if (isPasswordMatched) {
          const payload={username:username};
          const secretKey=process.env.JWT_SECRET;
          const jwtToken=jwt.sign(payload,secretKey);
          response.status(200).json({ jwt_token:jwtToken });
        } else {
          response.status(400).json({ error: "Username and password did't match" });
        }
      } else {
        response.status(404).json({ error: 'Username not found' });
      }
    } catch (error) {
      console.error('Error during login', error);
      return response.status(500).json({ error: 'Internal server error' });
    }
  };

  const changePassword=async (request, response) => {
    const { username, oldPassword, newPassword } = request.body;
  
    try {
      // Check if the user exists
      const user = await User.findOne({ username });
  
      if (!user) {
        return response.status(404).json({ error: 'Username not found' });
      }
  
      // Check if the old password matches the password in the database
      const isPasswordMatched = await bcrypt.compare(oldPassword, user.password);
  
      if (isPasswordMatched) {
        if (isPasswordStrong(newPassword)) {
          // Hash the new password
          const hashedPassword = await bcrypt.hash(newPassword, 10);
  
          // Update the password in the database
          await User.updateOne({ username }, { $set: { password: hashedPassword } });
  
          response.status(202).json({ msg: 'Password updated successfully' });
        } else {
          response.status(400).json({ error: 'Password must be at least 8 characters and contain one capital letter, one lowercase letter, one special character, and one number' });
        }
      } else {
        response.status(400).json({ error: "Username and password didn't match" });
      }
    } catch (error) {
      console.error('Error during password update', error);
      return response.status(500).json({ error: 'Internal server error' });
    }
  };

  const getUsers = async (request, response) => {
    try {
      const users = await User.find();
      response.json(users);
    } catch (error) {
      console.error('Error fetching users:', error);
      response.status(500).json({ error: 'Internal server error' });
    }
  };

  module.exports = {
    signUp,
    login,
    changePassword,getUsers
  };