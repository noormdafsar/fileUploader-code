const express = require('express');
const app = express();
require('dotenv').config();
const connectDB = require('./config/database');
const cloudinary = require('./config/cloudinary');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const Upload = require('./routes/FileUpload');


app.use(cors({
    origin: '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

const PORT = process.env.PORT || 4000;

app.use(express.json());

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));

// connection to cloudinary
cloudinary.cloudinaryConnect();

// routes mount 
app.use('/api/v1/upload', Upload);

app.post('/', (req, res) => {
    res.send('File Upload learning...!');
});


// Connect Database
connectDB()
  .then(() => {
    console.log('Database connected successfully...!');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}...!`);
    });
  })
  .catch((err) => {
    console.log('Error while connecting to the database', err);
  });