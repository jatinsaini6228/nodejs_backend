const { connect } = require('mongoose');
var db = require('./db');



exports.dbConn = async () => {
    try {
        const database_driver = process.env.DATABASE_DRIVER;
        const isSequelizeActive = process.env.USE_SEQUELIZE
        let conn;
        if (isSequelizeActive == 'n') {
            if (database_driver == 'mongodb') {
                conn = await db.mongoConnection();
            } else if (database_driver == 'mysql') {
                conn = await db.mysqlConnection();
            } else {
                conn = "";
                console.error("Database driver is not supported. Only mysql, mongodb is valid.");
            }
        }
        else
        {
            conn = await db.sequelize();
        }
        return conn;
    }
    catch (error) {
        return console.error({ status: false, error: "ExceptionError", errorMessage: error.message, errorName: error.name })
    }
}