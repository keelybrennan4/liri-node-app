//read and set the environment variables with the dotenev package: 
require("dotenv").config();

var keys = require("./keys.js");
var fs = require("fs");
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');


//variable to feed to randomTxtFunc
var randomtxt;

//variable to store user input from command line
var userInput = process.argv[2];

//switch case for 4 command line arguments
switch (userInput) {
  case "my-tweets":
    twitterFunc();
    break;
  case "spotify-this-song":
    spotifyFunc();
    break;
  case "movie-this":
    movieFunc();
    break;
  case "do-what-it-says":
    randomTxtFunc();
    break;
}

//function for my-tweets
//function twitterFunc(){
  //var client = new Twitter(keys.twitter);

//}


//function for spotify-this-song
//function spotifyFunc(){
  //var spotify = new Spotify(keys.spotify);
//}



//function for movie-this
function movieFunc(){
  var request = require("request");
  var movie = randomtxt;

  if (movie == null){
    movie = process.argv[3];

    //if movie name is more than one word 
    for (var i = 4; i < process.argv.length; i++) {
      if (i > 4 && i < process.argv.length) {
        movie = movie + " " + process.argv[i];
      }else {
        movie = process.argv[3];
      }
    }
      if (movie == null){
        console.log("Not sure what to watch? How about Mr. Nobody!")
        movie = "Mr. Nobody";
      }

  // run a request to the OMDB API with the movie specified
  var queryUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";
    console.log(queryUrl);

    request(queryUrl, function(error, response, body){

      //if request is successful 
      if (!error && response.statusCode === 200) {
        console.log("");
        //parse body of the site and return information
        console.log("Title: " + JSON.parse(body).Title);
        console.log("Release Year: " + JSON.parse(body).Year);
        console.log("IMDB Rating of the movie: " + JSON.parse(body).Ratings[0].Value);
        console.log("Rotten Tomatoes Rating of the movie: " + JSON.parse(body).Ratings[1].Value);
        console.log("Country where movie was produced: " + JSON.parse(body).Production);
        console.log("Language: " + JSON.parse(body).Language);
        console.log("Plot: " + JSON.parse(body).Plot);
        console.log("Actors: " + JSON.parse(body).Actors);
      }else {
        console.log(error);
      }
      
    });
    
  }

  //function for do-what-it-says 
//function randomTxtFunc(){
//}
};