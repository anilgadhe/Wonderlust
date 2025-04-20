const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync =require("../utils/wrapAsync");
const {validateReview,isLoggedIn,isReviewAuthor} =require("../middleware")
const{addReview,deleteReviewById,} = require("../controllers/review")




router.post("/",isLoggedIn, validateReview,wrapAsync(addReview));


router.delete("/:reviewId",isLoggedIn,isReviewAuthor,wrapAsync(deleteReviewById));

module.exports = router;