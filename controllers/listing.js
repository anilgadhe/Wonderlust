const mongoose =require("mongoose");
const Listing = require("../models/listing");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken});
if(process.env.NODE_ENV !='production'){
    require('dotenv').config()
}


const Indexlistings = async(req,res)=>{
    const allListings= await Listing.find({});    
     res.render("listings/index.ejs",{allListings})
     
};

const newlisting = (req,res)=>{
   
    res.render("listings/new.ejs");
}

const listingGetById = (async (req, res) => {
    const { id } = req.params;

    // Validate if `id` is a valid ObjectId before querying
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send("Invalid Listing ID");
    }
        const listing = await Listing.findById(id).populate({ 
            path: "reviews",
            populate:{
                path:"author",
            },
        })
        .populate("owner");
        if (!listing) {
            req.flash("error"," requisted listing is not exist! ");
            res.redirect("/listings")
        }
       
        res.render("listings/show", { listing ,MAP_TOKEN: process.env.MAP_TOKEN});
    
});

const getEditPage =(async(req,res)=>{
   
    const { id } = req.params;
    const listing = await Listing.findById(id);

    if (!listing) {
        req.flash("error"," requisted listing is not exist! ");
        res.redirect("/listings")
    }
   let originalimage =listing.image.url
    const originalUrl = originalimage.replace("/upload","/upload/h_300,w_250")
    res.render("Listings/edit.ejs",{listing , originalUrl})
});

const addNewPost =(async (req, res,next) => {
     let response = await geocodingClient.forwardGeocode({
        query: req.body.listing.location,
        limit: 1
      })
        .send()
    

    let url = req.file.path;
    let filename =req.file.filename;

    const newListing = new Listing(req.body.listing);
        newListing.owner = req.user._id;
        newListing.geometry = response.body.features[0].geometry;
        newListing.image ={url ,filename}
      const savedListing =await newListing.save();
           
      
        req.flash("success","New listing Created");
        res.redirect("/listings");
    });

  const updatedListing =  (async (req, res) => {
            const { id } = req.params;
    
           let listing = await Listing.findByIdAndUpdate(id, {...req.body.listing});
           
           if (typeof req.file !== "undefined") {
            
           let filename =req.file.filename;
           let url = req.file.path;

            listing.image ={filename ,url};

            await listing.save();
           }

              req.flash("success"," listing updated");
           res.redirect(`/listings/${id}`) 
            
        });

  const deleteListingById = (async(req,res)=>{
        
            const { id } = req.params;
        
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).send("Invalid Listing ID");
            }
                let deleteId = await Listing.findByIdAndDelete(id);
                const deletedName = deleteId.title;
                req.flash("success",`${deletedName} is deleted`);
                res.redirect(`/Listings`);
           
        })


module.exports ={
    Indexlistings,
    newlisting ,
    listingGetById,
    getEditPage,
    addNewPost,
    updatedListing,
    deleteListingById,
}