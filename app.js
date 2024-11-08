const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing");
const path = require("path");
app.set("view engine","ejs");
app.set("views", path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
const methodOverride=require("method-override");
app.use(methodOverride("_method"));



const MONGO_URL = "mongodb://127.0.0.1:27017/festiva";


main().then(() => {
    console.log("connectd to db");
}).catch((err) => {
    console.log(err);
})

async function main() {
    await mongoose.connect(MONGO_URL);
}

app.get("/listings",async(req,res)=>{
    let allListing=await Listing.find({});
    res.render("listings/home.ejs",{allListing});
});

app.get("/listings/new",(req,res)=>{
    res.render("listings/new.ejs");
})

app.post("/listings",async(req,res)=>{
//   let {title,date,time,image,venue,price}=req.body;
//   let listing =req.body.listing;
//   console.log(listing);
  const newListing=new Listing(req.body.listing);
  await newListing.save();
  res.redirect("/listings");
})

app.delete("/listings/:id",async(req,res)=>{
    let {id}=req.params;
    let deletelisting=await Listing.findByIdAndDelete(id);
    console.log(deletelisting);
    res.redirect("/listings");
})

app.get("/listings/:id/edit",async(req,res)=>{
    let {id}=req.params;
    const listing= await Listing.findById(id);
    res.render("listings/edit.ejs",{listing});

})

app.put("/listings/:id",async(req,res)=>{
    let {id}=req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.listing});
    res.redirect("/listings");
})


app.get("/listings/:id",async(req,res)=>{
    let {id}=req.params;
    let listing=  await Listing.findById(id);
    res.render("listings/show.ejs",{listing});
})



// app.get("/testListing", async (req, res) => {
//     let samplelisting = new Listing(
//         [
//             {
//                 title: "Concert Night",
//                 date: new Date(2024 - 11),
//                 time: "7:00PM",
//                 Venue: "City Hall",
//                 Price: 50
//             },
//             {
//                 title: "Tech Conference",
//                 date: new Date(2024 - 12),
//                 time: "10:00 AM",
//                 Venue: "Convention Center",
//                 Price: 100
//             },
//             {
//                 title: "Art Exhibition",
//                 date: new Date(2024 - 10 - 20),
//                 time: "2:00 PM",
//                 Venue: "Art Gallery",
//                 Price: 0
//             }
//         ])
//     await samplelisting.save();
//     console.log("sample was saved");
//     res.send("succesful testing");
// });




app.listen(8080, () => {
    console.log("server is listening to port 8080");
})
