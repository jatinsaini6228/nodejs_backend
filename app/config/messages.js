module.exports  = async (key) => {
    let message = {
        "ERR_000001" : "Bad request, Name is required",
        "ERR_000002" : "Bad request, Email is required",
        "ERR_000003" : "Bad request, Password is required", 
        "ERR_000004" : "Bad Request, Invalid Email.",
        "ERR_000005" : "Bad Request, Password and Confirm Password must be same.",
        "ERR_000006" : "",
        "ERR_000007" : "Bad request, Password must be strong. Password Requirement : { Minimum Length : 6, Minimum Lowercase Letter: 1, Minimum Uppercase: 1, Minimum Number: 1, Minimum Symbols: 1} ",
        "ERR_000008" : "User can't be create at the moment due to token genration failure.",
        "ERR_000009" : "Invalid token or Token Expired.",
        "ERR_000010" : "Invalid token type."
    }
    
    if(!message[key]) return key 
    else return  message[key] // Return Message
}