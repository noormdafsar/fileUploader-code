const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        if(!process.env.MONGO_URL) {
            throw new Error('MONGO_URL is not defined in the environment variables');
        }
        await mongoose.connect(process.env.MONGO_URL, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
        })
        // console.log('Database connected successfully...!');
    } catch(err) {
        console.log('Error while connecting to the database', err);
    }
}

module.exports = connectDB;