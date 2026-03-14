const {v4: uuidv4} = require('uuid');

const User = require('../models/user');
const { setUser } = require('../service/auth');

async function handleUserSignup(req, res) {
    const { name, email, password } = req.body;
    await User.create({
        name,
        email,
        password
    });  
    return res.redirect("/");
}

async function handleUserLogin(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({
        email,
        password
    });
    if(!user){
        return res.render("login", { error: "Invalid email or password" });
    }



    const token = setUser(user); //this will create a new session for the user and return a token that we can use to identify the user in subsequent requests. 
    // We will store this token in a cookie and send it back to the client.
    res.cookie("uid", token);

    return res.redirect("/");
}


module.exports = {
    handleUserSignup,
    handleUserLogin,
};