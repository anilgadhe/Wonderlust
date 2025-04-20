const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync =require("../utils/wrapAsync");
const multer  = require('multer');
const {storage} = require("../cloudConfig")
const upload = multer({ storage });
const{isLoggedIn,isOwner,validateListing} = require("../middleware");
const{Indexlistings,newlisting,listingGetById,getEditPage,
    addNewPost ,updatedListing ,deleteListingById
 } = require("../controllers/listing")



router
.route("/")
.get(wrapAsync(Indexlistings))
.post(isLoggedIn,  upload.single('listing[image]'),validateListing, wrapAsync(addNewPost));

router.get("/new",isLoggedIn,newlisting )

router
.route("/:id")   
.get(wrapAsync(listingGetById))
.put(isLoggedIn,isOwner,upload.single('listing[image]'), validateListing,wrapAsync(updatedListing))
.delete(isLoggedIn,isOwner, wrapAsync(deleteListingById) );


router.get("/:id/edit",isLoggedIn,isOwner, wrapAsync (getEditPage));


module.exports = router;