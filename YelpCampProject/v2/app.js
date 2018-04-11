var express = require("express");
var application = express();
var bodyParser = require("body-parser");

application.use(bodyParser.urlencoded({extended:true}));
application.set("view engine", "ejs")

var campgrounds = [
        
        {name: "Halabala asdb", image: "http://i21.photobucket.com/albums/b290/djfred/Jeep-YJ/sig200.jpg"},
        {name: "Grzegorz Brzeczyszczykiewicz", image: "http://i21.photobucket.com/albums/b290/djfred/Jeep-YJ/sig200.jpg"},
        {name: "Lucjusz Malfoj", image: "http://i21.photobucket.com/albums/b290/djfred/Jeep-YJ/sig200.jpg"},
        {name: "Halabala asdb", image: "http://i21.photobucket.com/albums/b290/djfred/Jeep-YJ/sig200.jpg"},
        {name: "Grzegorz Brzeczyszczykiewicz", image: "http://i21.photobucket.com/albums/b290/djfred/Jeep-YJ/sig200.jpg"},
        {name: "Lucjusz Malfoj", image: "http://i21.photobucket.com/albums/b290/djfred/Jeep-YJ/sig200.jpg"}
        
        ];

application.get("/", function(request, response){
    response.render("landing");
});

application.get("/campgrounds", function(request, response){
    
        response.render("campgrounds", {campgrounds:campgrounds});
});
application.post("/campgrounds", function(request, response) {
   var name =  request.body.name;
   var image =  request.body.image;
   var newCampground = {name: name, image: image}
   campgrounds.push(newCampground);
   response.redirect("/campgrounds");
});

application.get("/campgrounds/new", function(request, response) {
    response.render("new.ejs");
});

//application.post("/campgrounds", function(request, response){
  //  application.send("You hit the post route!");
//});


application.listen(process.env.PORT, process.env.IP, function(){
    console.log("YelpCamp is RUNNING");
});
