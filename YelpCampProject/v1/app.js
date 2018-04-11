var express = require("express");
var application = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp");

application.use(bodyParser.urlencoded({extended:true}));
application.set("view engine", "ejs")


var campgroundSchema = new mongoose.Schema({
    
    name: String,
    image: String,
    description: String
    
});


var Campground = mongoose.model("Campground", campgroundSchema);

Campground.create(
    {
        name: "Halabala asdb",
        image: "http://i21.photobucket.com/albums/b290/djfred/Jeep-YJ/sig200.jpg"
        
    },function(error,campground){
        if(error){
            console.log(error);
        }else{
            console.log("Campground has been succesfully created: ");
            console.log(campground);
        }
 
    }
    );




// var campgrounds = [
        
//         {name: "Halabala asdb", image: "http://i21.photobucket.com/albums/b290/djfred/Jeep-YJ/sig200.jpg"},
//         {name: "Grzegorz Brzeczyszczykiewicz", image: "http://i21.photobucket.com/albums/b290/djfred/Jeep-YJ/sig200.jpg"},
//         {name: "Lucjusz Malfoj", image: "http://i21.photobucket.com/albums/b290/djfred/Jeep-YJ/sig200.jpg"},
//         {name: "Halabala asdb", image: "http://i21.photobucket.com/albums/b290/djfred/Jeep-YJ/sig200.jpg"},
//         {name: "Grzegorz Brzeczyszczykiewicz", image: "http://i21.photobucket.com/albums/b290/djfred/Jeep-YJ/sig200.jpg"},
//         {name: "Lucjusz Malfoj", image: "http://i21.photobucket.com/albums/b290/djfred/Jeep-YJ/sig200.jpg"}
        
//         ];

application.get("/", function(reuest, response){
    response.render("landing");
});

application.get("/campgrounds", function(request, response){
    Campground.find({},function(error, allCampgrounds){
        
        if(error){
            console.log(error);
        }else{
            response.render("index", {campgrounds:allCampgrounds});
        }
    });
        
});
application.post("/campgrounds", function(request, response) {
   var name =  request.body.name;
   var image =  request.body.image;
   var description = request.body.description;
   var newCampground = {name: name, image: image, description: description}
   //campgrounds.push(newCampground);
   Campground.create(newCampground,function(error,newlyCreated){
       if(error){
           console.log(error);
       }else{
           response.redirect("/campgrounds");
       }
   })
   
});

application.get("/campgrounds/new", function(request, response) {
    response.render("new.ejs");
});

application.post("/campgrounds", function(request, response){
    application.send("You hit the post route!");
});

application.get("/campgrounds/:id", function(request, response) {
    Campground.findByID(request.params.id,function(error,foundCampground){
        if(error){
            console.log(error)
        }else{
            response.render("show",{campground: foundCampground});
        }
    })
   
    
});

application.listen(process.env.PORT, process.env.IP, function(){
    console.log("YelpCamp is RUNNING");
});
