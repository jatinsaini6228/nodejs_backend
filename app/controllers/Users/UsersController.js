const crypto = require('../../utils/Crypto');
const winston = require('../../utils/Winston');
const {express} = require('../../utils/RequiredPackages');



exports.register = async (req, res) => {
    try {
        const body = req.body;
        const {name, email, password} = body;
        await winston.loggerInfo((message = "Registering User.", service = "UserController@register"));
        await winston.loggerError((message = "Error", service = "UserController@register"));
        return res.status(200).json({status: true, request: {name, email, password}})
    } 
    catch (error) {
        return res.status(500).json({status: false, error: "ExceptionError", errorMessage: error.message, errorName: error.name})    
    }
}