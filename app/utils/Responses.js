const message = require('../config/messages');          // Labels / Message Utils

// Error response
exports.errorResponse = async (request_id = null, statusCode, errorCode, data) => {
    
    // Error Code length must be less than 10 characters.
    return { status: statusCode, error: true, errorCode: (errorCode.length > 10) ? null : errorCode, errorMessage: await message(errorCode), request_id, data }
}

// Success response
exports.successResponse = async (request_id = null, data = null, message = null) => {
    return { status: 200, error: false, request_id, data, message}
}