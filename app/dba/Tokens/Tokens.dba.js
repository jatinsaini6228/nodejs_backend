
const model = require('../../models/Tokens.model');
const expiryDate = new Date();
expiryDate.setDate(expiryDate.getDate() + 7); // Defualt Token Expiry : 7 days 
const jwt = require('../../utils/JwtTokens');


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

exports.getOtpToken = async (requestId, token, otp) =>  
{ 
    try {
       if(requestId) return await model.findOne({_id: token, value: otp});  
       else   return {message: "DB Error: Request Id Not Set.", error: true} 
    } 
    catch (err) 
    {
      return {message: err.message, error: err }  // Database error
    }
}


exports.deleteOneToken = async (requestId, id, token) =>  
{ 
    try {
      if(requestId) return await model.deleteOne({_id: id, token: token});  
      else return {message: "DB Error: Request Id Not Set.", error: true};
    } 
    catch (err) 
    {
      return {message: err.message, error: err }  // Database error
    }
}


exports.createAppLoginToken = async (requestId, data) =>  
{ 
  try {
    const user_id = data.user_id;
    const user_email = data.user_email;
    const user_type = data.user_type;
    const token = await jwt.sign({user: user_id, email: user_email, type: user_type, key: "login", value: "users", expireIn: "30d"})
     if(requestId) return await model.create({
      user_id : user_id,
      token: token,
      key: "login",
      value: "users",
      type: user_type,
      willExpire: true,
      isExpired: false,
      expireAt: expiryDate,
      status: true
     });  
     else return {message: "DB Error: Request Id Not Set.", error: true};
  } 
  catch (err) 
  {
    return {message: err.message, error: err }  // Database error
  }
}