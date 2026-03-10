const jwt = require('jsonwebtoken');
const secret = "Nikki$2516@$";

function setUser(user){
    return jwt.sign({
        _id: user._id,
        email: user.email,
    },secret); //generate a jwt token with the user object as the payload and the secret key as the secret,
    //  so that we can identify the user in subsequent requests using this token.

}

function getUser(token){
    if(!token) return null; //if there is no token, return null, which means the user is not logged in.
    try{
        return jwt.verify(token, secret); //verify the token using the secret key and return the user object if the token is valid, otherwise return null.
    } catch (error) {
        return null;
    }
}

module.exports = {
    setUser,
    getUser,
};