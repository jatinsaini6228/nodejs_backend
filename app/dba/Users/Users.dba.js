const { startSession } = require('mongoose')
const model = require('../../models/Users.model');
const tokensSchema = require('../../models/Tokens.model');

exports.create = async (data) =>  
{ 
    try {
      const {req} = data;
       if(req.rid) return await model.create(data);  
       else   return {message: "DB Error: Request Id Not Set.", error: true} 
    } 
    catch (err) 
    {
      return {message: err.message, error: err }  // Database error
    }
}

exports.findOneById = async (requestId, id) =>  
{ 
    try {
      if(requestId) return await model.findOne({_id: id}).select(['_id', 'email', 'isEmailVerified', 'status'])
    } 
    catch (err) 
    {
      return {message: err.message, error: err }  // Database error
    }
}

exports.deleteOne = async (data, user_id) =>  
{ 
    try {
      const {req} = data;
      return model.deleteOne({_id: user_id})
    } 
    catch (err) 
    {
      return {message: err.message, error: err }  // Database error
    }
}


exports.findOneById = async (requestId, id) =>  
{ 
    try {
      if(requestId) return await model.findOne({_id: id })
    } 
    catch (err) 
    {
      return {message: err.message, error: err }  // Database error
    }
}