const express=require("express");
const router=express.Router({ mergeParams:true});
const WrapAsync=require("../utils/WrapAsync.js");
const ExpressError=require("../utils/ExpressError.js");

const Review=require("../models/review.js");
const Listing=require("../models/listing.js");
const {ValidateReview,isLoggedIn,isReviewAuthor}=require("../middleware.js");
const reviewController=require("../controllers/reviews.js");

  
  

  //review
  //post Review route

  router.post("/",isLoggedIn,ValidateReview,WrapAsync(reviewController.createReview));

  //delete Review route
  
router.delete("/:reviewId",isLoggedIn,isReviewAuthor,WrapAsync(reviewController.destroyReview)
);

module.exports=router;
