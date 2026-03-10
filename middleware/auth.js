const { getUser } = require('../service/auth');

async function restrictToLoggedInUsersOnly(req, res, next) {
    const userUid = req.cookies?.uid;

    if(!userUid) return res.redirect("/login");

    const user = getUser(userUid);

    if(!user) return res.redirect("/login");

    req.user = user; //attach the user object to the request object, so that we can access the user in subsequent middleware or route handlers.

    next();
}

async function checkAuth(req, res, next) {
    const userUid = req.cookies?.uid;

    const user = getUser(userUid);

    req.user = user; //attach the user object to the request object, so that we can access the user in subsequent middleware or route handlers.

    next();
}

module.exports = {
    restrictToLoggedInUsersOnly,
    checkAuth,
};