const {Schema, model}=require("mongoose");
const reviews = require("./reviews");
const User = require("./user")

const listingSchema = new Schema({
    title:{
        type:String,
        
    },
    description:{
        type:String,
    },
    image: {
        url:String,
        filename:String,
    },
    price:{
        type:Number,
    },
    location:{
        type:String,
    },
    country:{
          type:String,
    },
    reviews:[
        {
            type:Schema.Types.ObjectId,
            ref:"Review"
        },
    ],
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User",
    },
    geometry: {
        type: {
          type: String, // Don't do `{ location: { type: String } }`
          enum: ['Point'], // 'location.type' must be 'Point'
          required: true
        },
        coordinates: {
          type: [Number],
          required: true
        }
      },
      category:{
        type:String,
        enum:["Trending","Rooms","Amazing pools","Farms","Beachfront","Treehouse","Cabins","Luxe","New","Mountain"],
      }
    
});

listingSchema.post("findOneAndDelete", async(listing)=>{
   if(listing){
    await reviews.deleteMany({_id: {$in: listing.reviews}});
   }
   
});

const Listing = model("Listing",listingSchema);

module.exports= Listing;