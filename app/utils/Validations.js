const validator = require('validator');


exports.isValidEmail = async (email) => {
    return  validator.isEmail(email); 
}

exports.isEmpty = async (string) => {
    return  validator.isEmpty(string); 
}

exports.isJSON = async (email) => {
    return  validator.isJSON(isJSON); 
}

exports.isStrongPassword = async (password) => {
    /*
    check if the string can be considered a strong password or not. Allows for custom requirements or scoring rules. If returnScore is true, then the function returns an integer score for the password rather than a boolean.
    Default options:
    { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1, returnScore: false, pointsPerUnique: 1, pointsPerRepeat: 0.5, pointsForContainingLower: 10, pointsForContainingUpper: 10, pointsForContainingNumber: 10, pointsForContainingSymbol: 10 }
    */
    return  validator.isStrongPassword(password); 
}
