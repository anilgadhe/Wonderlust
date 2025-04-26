const Listing = require("../models/listing");
const Review = require("../models/reviews");
const {reviewSchema} = require("../schema");

const addReview = (async(req,res)=>{
    let listing =await Listing.findById(req.params.id);
    
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;

    listing.reviews.push(newReview);
   
    
    await newReview.save();
    await listing.save();
    let author = newReview.author;
    req.flash("success","New review Created");
    res.redirect(`/listings/${listing._id}`)
});


const deleteReviewById =(async(req,res)=>{

 let {id,reviewId}= req.params;   
 await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
 req.flash("success"," review deleted");
await Review.findByIdAndDelete(reviewId);


res.redirect(`/listings/${id}`);

})

module.exports ={
    addReview,
    deleteReviewById,
}