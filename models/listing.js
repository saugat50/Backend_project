const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new  Schema({
    title: String,
    date: {
        type: Date,
    },
    time: {
        type:String,
    },
    image: {
        type:String,
        set :(v)=> v=== "" ? "default link" : v,
    },
    venue: String,
    price: Number,
})


const Listing = mongoose.model("Listing", listingSchema);

module.exports= Listing;