const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport")
const{saveRedirectUrl} =require("../middleware");
const{renderSignup,registerNewIUserByPOstONSignup,renderLogin,authenticateUser,getLogout}= require("../controllers/users");

router
.route("/signup")
.get(renderSignup)
.post(wrapAsync(registerNewIUserByPOstONSignup));

router
.route("/login")
.get(renderLogin)
.post(saveRedirectUrl,passport.authenticate("local",{failureRedirect:"/login",failureFlash:true,}),authenticateUser);

router.get("/logout",getLogout)


module.exports= router;