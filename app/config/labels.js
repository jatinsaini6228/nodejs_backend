exports.labels = async (key) => 
{
    let label =  { 
        "email": "Email", 
        "name": "Name", 
        "password": "Password",
        "confirm_password":  "Confirm Password",
    };
    
    return  label[key];
}