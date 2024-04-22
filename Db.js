const mongoose = require('mongoose');
const db = 'mongodb+srv://mari:Karthi1512@demo.tthnwo8.mongodb.net/Users'

const connectdb = async()=>{
    try{
        await mongoose.connect(db);

        console.log('Connected to MongoDB');

    }
    catch(err){
        console.log("mongo eroor:", err.message);
        process.exit(1);
    }
};

module.exports = connectdb;