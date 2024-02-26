const express=require("express");
const router=express.Router();
const WrapAsync = require("../utils/WrapAsync.js");
const Listing=require("../models/listing.js");
const {isLoggedIn,isOwner,validateListing}=require("../middleware.js");
const ListingController=require("../controllers/listing.js");
const multer  = require('multer');
const {storage}=require("../cloudConfig.js");
const upload = multer({ storage });

router.route("/")
.get(WrapAsync(ListingController.index))
.post(isLoggedIn,upload.single("listing[image]"),validateListing,WrapAsync(ListingController.createListing));
 
 
  
  //New Route
  router.get("/new", isLoggedIn,ListingController.renderNewForm);

router.route("/:id")
.get( WrapAsync(ListingController.showListing))
.put(isLoggedIn,isOwner,upload.single("listing[image]"),validateListing,WrapAsync( ListingController.updateListing))
.delete(isLoggedIn,isOwner, WrapAsync(ListingController.destroyListing));
  
  //Edit Route
  router.get("/:id/edit",isLoggedIn,isOwner,WrapAsync( ListingController.renderEditForm));
  
  
  module.exports=router;