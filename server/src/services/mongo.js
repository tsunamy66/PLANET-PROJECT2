// require('dotenv').config();
const  mongoose  = require("mongoose");
const MONGO_URL = process.env.MONGO_URL
mongoose.connection.on('open', () => {
    console.log('mongoDB connection ready!');
})
mongoose.connection.on('error', (err) => {
    console.group('mongoDB connection error')
    console.log(err);
    console.groupEnd();
})

async function mongoConnect() {
    await mongoose.connect(MONGO_URL)  
}

async function mongoDisconnect() {
    await mongoose.connection.close();
    await mongoose.disconnect();
}

module.exports = {
    mongoDisconnect,
    mongoConnect
}