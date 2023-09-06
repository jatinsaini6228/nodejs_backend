const mongoose = require('mongoose');
const mysql = require('mysql2/promise');
const { Sequelize } = require('sequelize');
const dotenv = require("dotenv");
const path = require("path");



exports.mongoConnection = async () => {
    try {
        const db = await mongoose.connect(process.env.MONGOURL);
        if(db) console.log("MongoDb Connected vai Mongoose Connect...");
        return db;
    } 
    catch (error) {
        console.error({status: false, error: "ExceptionError", errorMessage: error.message, errorName: error.name})    
    }
}


exports.mysqlConnection = async () => {
    try {
        // create the connection
        const db = await mysql.createConnection({host:process.env.MYSQL_HOST, user: process.env.MYSQL_USERNAME, password: process.env.MYSQL_PASSWORD});
        if(db) console.log("MySQL2 Connected..");
        return db;
    } 
    catch (error) {
        console.error({status: false, error: "ExceptionError", errorMessage: error.message, errorName: error.name})    
    }
}


exports.sequelize = async () => {
    try {
        const db = new Sequelize(process.env.MYSQL_DBNAME, process.env.MYSQL_USERNAME, process.env.MYSQL_PASSWORD, {
            host: process.env.MYSQL_HOST,
            dialect: 'mysql'
        });

        await db.authenticate();
        console.log('Connection has been established successfully.');
        return db;
    } 
    catch (error) 
    {
        console.error('Unable to connect to the database using sequelize:', error);
        console.error({status: false, error: "ExceptionError", errorMessage: error.message, errorName: error.name})    
    }
}





