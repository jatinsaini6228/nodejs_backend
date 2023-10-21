const otpGenerator = require('otp-generator')

module.exports = async (digits, options = {digits : true, upperCaseAlphabets: false, lowerCaseAlphabets :false, specialChars: false } ) => 
{
  return  otpGenerator.generate(digits, options);
}