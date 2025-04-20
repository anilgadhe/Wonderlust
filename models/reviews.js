const { types, ref } = require("joi");
const {Schema, model}=require("mongoose");
const user = require("../models/user")

const reveiwSchema = new Schema({

    comment:String,
    rating:{
        type:Number,
        min:1,
        max:5,
    },
    createdAt:{
        type:Date,
        default:Date.now(),
    },

    author:{
        type:Schema.Types.ObjectId,
        ref:"User",

    }

});

module.exports = model("Review",reveiwSchema)