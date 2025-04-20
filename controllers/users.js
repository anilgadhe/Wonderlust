
const User = require("../models/user");

const renderSignup =(req,res)=>{
    res.render("users/signup.ejs")

};


const registerNewIUserByPOstONSignup = (async(req,res)=>{
  
  try {
    const {username , email , password} = req.body

    const newUser =new User({
      username,
      email,
   
    })

   const registeredUser = await User.register( newUser , password);
   

   req.login(registeredUser,(err)=>{
    if(err){
      return next(err);
    }
    req.flash("success","Welcom on wonderlust!");

    res.redirect("/listings");
   })

  } catch (error) {
   
    req.flash("error", error.message);
    res.redirect("/signup");
  }
                   
   
});

const renderLogin = (req,res)=>{
    res.render("users/login.ejs")
}

const authenticateUser = async (req,res)=>{
    req.flash("success" , "Welcom back to Wonderlust");
    let redirectUrl = res.locals.redirectUrl;
    res.redirect("/listings");
  };

  const getLogout = (req,res,next) =>{
    req.logout((err) =>{
      if(err){
        return next(err);
      }
      req.flash("success", "you are logged out!");
      res.redirect("/listings");
    })
  }





module.exports ={
    renderSignup,
    registerNewIUserByPOstONSignup,
    renderLogin,
    authenticateUser,
    getLogout,
}