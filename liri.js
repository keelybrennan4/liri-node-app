require("dotenv").config();


//8. At the top of the `liri.js` file, add code to read and set any environment variables with the dotenv package:
//9. Add the code required to import the `keys.js` file and store it in a variable.


var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);


//10. Make it so liri.js can take in one of the following commands:
if process.argv[2]
    my-tweets
    spotify-this-song
    movie-this
    do-what-it-says