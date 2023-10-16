const express = require('express')
const mongoose = require('mongoose');
const cors=require('cors')
require('dotenv').config()

const corsOptions = {
  origin: 'https://sspmusichub.netlify.app/home',
  optionsSuccessStatus: 200,  // Some legacy browsers choke on 204
};

const app=express()
app.use(express.json())
app.use(cors(corsOptions))

const dbURI = process.env.MONGODB_URI;
const port = process.env.PORT || 3005;

app.use('/audio', express.static('audios'));

const userRoutes=require('./routes/userRoutes');
app.use('/',userRoutes)

const audioRoutes = require('./routes/audioRoutes');
app.use('/', audioRoutes);


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






  

  
  
  
  
  