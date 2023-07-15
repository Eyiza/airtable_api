const mongoose = require('mongoose');
require('dotenv').config()

async function connect() {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log('MongoDB Atlas Connection Successful');
    } catch (error) {
        console.log('MongoDB Atlas Connection Failed');
        console.log(`Error connecting to Mongo DB:`, error.message);
    }
}
    
module.exports = connect;
