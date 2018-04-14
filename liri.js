//read and set the environment variables with the dotenev package: 
require("dotenv").config();

var keys = require("./keys.js");
var fs = require("fs");
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require("request");

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

  default: 
  console.log("Invalid entry. Please type any of the following commands: my-tweets, spotify-this-song, movie-this, or do-what-it-says");
}

//-------------------function for my-tweets----------------// 
function twitterFunc(){
  var client = new Twitter(keys.twitter);

  var params = {screen_name: "keelybrennan333"};
    client.get('statuses/user_timeline', params, function(err, tweets, response) {
      if (!err) {
        console.log("here are my recent tweets");
        console.log("------------------------------");

        for(i = 0; i < 20; i++){
          console.log(tweets[i].text);
          console.log("Created at: " + tweets[i].created_at);
          console.log("------------------------------");
        }

      }else {
        console.log(err);
      }
  });

}

//---------------function for spotify-this-song-------------// 
function spotifyFunc(){
  var spotify = new Spotify(keys.spotify);
  var song = randomtxt;
  
    if (song == null){
      song = process.argv[3];
    
      //if song name is more than one word 
      for (var i = 4; i < process.argv.length; i++) {
        song = song + " " + process.argv[i];
        }
    }
    
    if (song == null){
      console.log("Here's a good song!");
      song = "The Sign";
    }
    
    spotify.search({ type: "track", query: song }, function(err, data) {
      if (err) {
          console.log(err);
          return;
      }
        console.log("-----------------------");
        console.log("Artist: " + data.tracks.items[0].artists[0].name);
        console.log("Song Name: " + data.tracks.items[0].name);
        console.log("Preview Link: " + data.tracks.items[0].preview_url);
        console.log("Album: " + data.tracks.items[0].album.name);
      });
  }

//--------------function for movie-this-------------------// 
function movieFunc(){
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

//----------------function for do-what-it-says---------------//
function randomTxtFunc(){

  fs.readFile("random.txt", "utf8", function (err, data) {
    var dataArr = data.split(", ");
    
    userInput = dataArr[0];

    if (dataArr.length > 0) {
      randomtxt = dataArr[1];
    }

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
      }
  });
}

}