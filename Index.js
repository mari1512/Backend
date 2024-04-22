const express = require('express')
const connectDB = require('./Db');
const mongoDB = require("mongodb");
const MongoClient = require("mongodb").MongoClient;
const config = require("config");
const excelToJson = require("convert-excel-to-json");
const mongoose = require("mongoose");
const fs = require("fs");


const app = express();
const port = 3000;

const db = 'mongodb+srv://mari:Karthi1512@demo.tthnwo8.mongodb.net/Users'

mongoose.connect(db);

const excel = require("./Excel");

const init = async()=>{
    mongoose.connection.once('open',()=>{
        excel.importData();
    });

    app.listen(port, () => console.log(`Example app listening on port ${port}!`))
}

init();
