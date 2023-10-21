
// const {express, db} = require('../../utils/RequiredPackages');

const validator = require('../../utils/Validations');   // Validator Utils
const otpGenerator = require('../../utils/OtpGenerator');   // Validator Utils
const winston = require('../../utils/Winston');
const crypto = require('../../utils/crypto');
const errRes = require('../../utils/Responses');
const dba = require('../../dba/Users/Users.dba');       // Data access layer 
const tokenDBA = require('../../dba/Tokens/Tokens.dba');       // Data access layer 
var jwt = require('../../utils/JwtTokens');
const { express, app, dotenv, path } = require('../../utils/RequiredPackages');

// Config
dotenv.config({ path: path.join(__dirname, '../../.env') });


exports.register = async (req, res) => {
    const body = req.body;
    try {

        await winston.loggerInfo("Req_id: " + req.rid, "UserController@register", body);
        const { name, email, password, confirm_password } = body;

        // Validation Checks
        if (name == undefined || await validator.isEmpty(name)) return await errRes.errorResponse(req.rid, 400, "ERR_000001");
        if (email == undefined || await validator.isEmpty(email)) return await errRes.errorResponse(req.rid, 400, "ERR_000002");
        if (password == undefined || await validator.isEmpty(password)) return await errRes.errorResponse(req.rid, 400, "ERR_000003");
        if (await validator.isValidEmail(email) == false)  return await errRes.errorResponse(req.rid, 400, "ERR_000004");
        if (password !== confirm_password) return await errRes.errorResponse(req.rid, 400, "ERR_000005");
        if (await validator.isStrongPassword(password) == false)  return await errRes.errorResponse(req.rid, 400, "ERR_000007");

        // Hasing Password
        const encPassword = await crypto.encryptHmac(password)

        // Genrate OTP
        const emailVerifyOtp = await otpGenerator(6, { digits: true, upperCaseAlphabets: false, lowerCaseAlphabets: false, specialChars: false }); // OTP to Verify Email

        // Finalizing Object
        let data = {};
        data.req = req;
        data.first_name = name;
        data.email = email;
        data.password = encPassword;
        data.status = true;
        data.isEmailVerified = false;
        data.isMobileVerified = false;
        data.email_otp = emailVerifyOtp;
        data.profile_picture = null;
        data.role = 'admin';
        data.type = 'admin';
        data.parent_id = 0;
        save = await dba.create(data); // Saving to the database

        if (save._id) {
            // Adding the token to the OTP
            let resToken;

            var jwtSign = await jwt.sign({ key: "otp", user_id: save._id, type: "otp", expireIn: "7d" });
            let token = await tokenDBA.create({ req, token: jwtSign, user_id: save._id, key: "otp", value: emailVerifyOtp, type: "otp" })
            if (token._id) {
                resToken = { token_id: token._id, message: "Token created successfully" }
            }
            else {
                // Delete created user if token added failed.
                const del = await dba.deleteOne(data, save._id);
                return await errRes.errorResponse(req.rid, 500, "ERR_000008", {User: del});
            }

            // Add the otp to user and tokens,
            return await errRes.successResponse(req.rid, { id: save._id, email: save.email, token: resToken }, "Success");
        }
        else {
            return await errRes.errorResponse(req.rid, 500, "Database Error: " + save.message);
        }

    }
    catch (err) {

        await winston.loggerError("Error: " + err.message, "UserController@register: " + req.rid);
        return { status: 400, message: err.message, request_id: req.rid }
    }
}

// Verify the user's email by OTP Token
exports.verifyEmail = async (req, res) => {
    try {
        let findUser;
        const body = req.body;
        await winston.loggerInfo("Req_id: " + req.rid, "UserController@verifyEmail", body);
        const { token, email, otp } = body;
        const otpToken = await tokenDBA.getOtpToken(req.rid, token, otp); // Find Token & OTP in Token

        if (otpToken) 
        {
            // Verify token
            let verifyToken = await jwt.verify(otpToken.token);
            if(!verifyToken)  return await errRes.errorResponse(req.rid, 400, "ERR_000009"); 
            if (verifyToken.type == "otp") 
            {
                let findUser = await dba.findOneById(req.rid, verifyToken.user_id);
                if(findUser.isEmailVerified === true) return  {  status: 406, request_id: req.rid, message: "Email is already verified." }
                if (findUser && findUser.email == email) {
                    // Update Email Verification
                    findUser.isEmailVerified = true;
                    let updateEmailVerification = findUser.save();
                    if(updateEmailVerification) {
                        await tokenDBA.deleteOneToken(req.rid, otpToken._id, otpToken.token) // Delete Token because token is used already to update the email verification.
                        // Add User Login Token 
                        let login = await tokenDBA.createAppLoginToken(req.rid, {user_id: verifyToken.user_id, user_email : findUser.email, user_type : findUser.type});
                        return {  status: 200, request_id: req.rid, message: "Email verified successfully.", access_token: login.token, user: login.user_id} 
                    }
                }
                else {
                    return { status: 404, request_id: req.rid, error: true, errorMessage: "User not found." }
                }
            }
            else {
                return await errRes.errorResponse(req.rid, 400, "ERR_000010"); 
            }
        }
        else {
            return await errRes.errorResponse(req.rid, 400, "ERR_000009"); 
        }

    }
    catch (err) {
        await winston.loggerError("Error", "UserController@VerifyEmailOtp");
        if (err.message == "jwt expired") return { status: 400, errorMessage: "Invalid token or Token Expired.", request_id: req.rid }
        return { status: 400, errorMessage: err.message, request_id: req.rid }
    }
}





