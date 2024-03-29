const express = require('express')
const mongoose = require('mongoose');
const cors=require('cors')
const path=require('path')
require('dotenv').config()

const app=express()
app.use(express.json())
app.use(cors())

const audioFolderPath = path.join(__dirname, 'audios');
app.use('/audio', express.static(audioFolderPath));

const dbURL = process.env.MONGODB_URL;
const port = process.env.PORT || 3005;

const userRoutes=require('./routes/userRoutes');
app.use('/',userRoutes)

const audioRoutes = require('./routes/audioRoutes');
app.use('/', audioRoutes);


const initializeDBandServer = async () => {
    try {
      await mongoose.connect(dbURL, {
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






  

  
  
  
  
  