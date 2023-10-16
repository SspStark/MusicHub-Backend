const express = require('express')
const mongoose = require('mongoose');
const cors=require('cors')
require('dotenv').config()

const app=express()
app.use(express.json())
app.use(cors())

const dbURI = process.env.MONGODB_URI;
const port = process.env.PORT || 3005;

const userRoutes=require('./routes/userRoutes');
app.use('/',userRoutes)

const initializeDBandServer = async () => {
    try {
      await mongoose.connect(dbURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
  
      app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
      });
    } catch (error) {
      console.log(`DB Error: ${error.message}`);
      process.exit(1);
    }
  };

initializeDBandServer();



  

  
  
  
  
  