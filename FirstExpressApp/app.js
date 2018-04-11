const express = require("express");
const app = express();

app.get("/", function(request, response){
    response.send("Hi there");
});
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server has started");
});
