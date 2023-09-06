const crypto = require('../../utils/Crypto');
const winston = require('../../utils/Winston');
const {express, db} = require('../../utils/RequiredPackages');



exports.register = async (req, res) => {
    try {
        const connec = await db.dbConn();
        console.log("Database connection: ", connec);

        const body = req.body;
        const {name, email, password} = body;
        await winston.loggerInfo("Registering User.",  "UserController@register", body);
        await winston.loggerError( "Error", "UserController@register", body);
        return res.status(200).json({status: true, request: {name, email, password}})
    } 
    catch (error) {
        return res.status(500).json({status: false, error: "ExceptionError", errorMessage: error.message, errorName: error.name})    
    }
}