const crypto = require('crypto');
const {dotenv, path } = require('./RequiredPackages'); 

// Config
dotenv.config({path: path.join(__dirname, '../../.env')});
const ALGO = process.env.ALGO; // 'aes-256-cbc';
const HMAC_ALGO = process.env.HMAC_ALGO;
const HMAC_SECRET = process.env.HMAC_SECRET;



// AES-256-CBC
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

exports.encrypt = async (text) => {
    let cipher = crypto.createCipheriv(ALGO, Buffer.from(key), iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return { iv: iv.toString('hex'),
    encryptedData: encrypted.toString('hex') };
}

exports.decrypt = async (text) =>  {
    let iv = Buffer.from(text.iv, 'hex');
    let encryptedText = Buffer.from(text.encryptedData, 'hex');
    let decipher = crypto.createDecipheriv(ALGO, Buffer.from(key), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
}
 
// Hmac
exports.encryptHmac = async (text) => {
    /* //  HMAC is a MAC/keyed hash, not a cipher. It's not designed to be decrypted. If you want to encrypt something, use a cipher, like AES, preferably in an authenticated mode like AES-GCM. */

    const hash = crypto.createHmac(HMAC_ALGO, HMAC_SECRET).update(text).digest('hex');
    return hash
}

exports.matchHmac = async (hash, string) => {
    if (hash === crypto.createHmac(HMAC_ALGO, HMAC_SECRET).update(string).digest('hex')) {
        return true;
    } else {
        return false;
    }
}

// Base 64
exports.base64enc = async (string) => {
   return Buffer.from(string).toString('base64')
}

exports.base64dec = async (base64EncString) => {
    return Buffer.from(base64EncString, 'base64').toString('ascii')
 }


 



/*

HOW TO USE CRYPTO IN THIS APP 

const crypto = require('../../utils/Crypto');

exports.test_crypto = async (req, res) => {
    try {
        const body = req.body;
        const {name, email, password} = body;
        
        const encrypted_password =  crypto.encrypt(password);
        const decrypt_password =  crypto.decrypt(encrypted_password);

        const encrypted_name =  crypto.encryptHmac(name);

        let nameCheck = null;
        if(crypto.matchHmac(encrypted_name, name) == true) nameCheck = "Name is verified.";

        const enc_email = crypto.base64enc(email);
        const dec_email = crypto.base64dec(enc_email);

        return res.status(200).json({status: true, request: {name, email, password}, email: {encType: "Base64", enc: enc_email, dec: dec_email}, name: {encType: "Hmac-sha256", enc:encrypted_name, nameCheck}, password: {encType: "aes-256-cbc", enc_password: encrypted_password, dyc: decrypt_password}})
    } catch (error) {
        return res.status(500).json({status: false, error: "ExceptionError", errorMessage: error.message, errorName: error.name})    
    }
}


*/