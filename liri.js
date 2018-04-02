// read and set any environment variables with the dotenv package
require("dotenv").config();

//import the keys.js file and store it in a variable 
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

//request npm package
var request = require("request");

//store all arguments in an array
var nodeArgs = process.argv;
var movieName = "";

//for movie names that are greater than one word
for (var i=2; i < nodeArgs.length; i++) {
    if i>2 && i < nodeArgs.length) {
        moveiName = movieName + "+" + nodeArgs[i];
    }
    else {
        movieName += nodeArgs[i];
    }
}
//run request to OMDB
var queryURL = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

//debug 
console.log(queryURL);

request(queryURL, function(error, response, body) {

  // if request is successful
  if (!error && response.statusCode === 200) {
    console.log("Title: " + JSON.parse(body).Title);
    console.log("Release Year: " + JSON.parse(body).Year);
}


//10. Make it so liri.js can take in one of the following commands:
//if process.argv[2]

//my-tweets
//spotify-this-song
//movie-this
//do-what-it-says