
const winston = require('../../utils/Winston');
const service = require('../../services/Users/users.service');


// Signup / Register Users
exports.register = async (req, res) => {
    try 
    {  
        const services = await service.register(req, res);
        return res.status(services.status).json(services);
    } 
    catch (error) 
    {
        const er = {status: false, error: "ExceptionError", errorMessage: error.message, errorName: error.name};
        await winston.loggerError( "Error", "UserController@register", er);
        return res.status(500).json(er);    
    }
}

// Verify Email by OTP
exports.verifyEmailOTP = async (req, res) => {
    try 
    {  
        const services = await service.verifyEmail(req, res);
        console.log(services)
        return res.status(services.status).json(services);
    } 
    catch (error) 
    {
        const er = {status: false, error: "ExceptionError", errorMessage: error.message, errorName: error.name};
        await winston.loggerError( "Error", "UserController@verifyEmail", er);
        return res.status(500).json(er);    
    }
}