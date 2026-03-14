const express = require('express');
const {restrictTo} = require("../middleware/auth");
const router = express.Router();
const URL = require('../models/url');

router.get('/admin/urls', restrictTo(['ADMIN']), async (req, res) => {

    const allurls = await URL.find({});
    return res.render('home', { urls: allurls, });
});

router.get("/", restrictTo(["NORMAL", "ADMIN"]), async (req, res) => {
    const allurls = await URL.find({createdBy: req.user._id });
    return res.render("home",{
        urls: allurls,
    });
});

router.get("/login", (req, res) => {
    return res.render("login");
});

router.get("/signup", (req, res) => {
    return res.render("signup");
});


module.exports = router;