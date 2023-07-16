const crypto = require('../../utils/Crypto');
exports.register = async (req, res) => {
    try {
        const body = req.body;
        const {name, email, password} = body;
        return res.status(200).json({status: true, request: {name, email, password}})
    } catch (error) {
        return res.status(500).json({status: false, error: "ExceptionError", errorMessage: error.message, errorName: error.name})    
    }
}