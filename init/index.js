const mongoose = require("mongoose");
const initData = require("./data");
const Listing= require("../models/listing");


async function main(url){
    return   await mongoose.connect(url)
 };
 
 main( "mongodb://127.0.0.1:27017/wonderlust").then(()=>{
     console.log("Dartabase is connected");
     
 });


 const initDB = async ()=>{
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({...obj, owner: "67f4954e9e8eb00394238349"}));
    await Listing.insertMany(initData.data);
    console.log("data is initialized");
 }
 
 initDB();