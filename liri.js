var keys = require("./keys.js");
var request = require("request");
var fs = require("fs");
// console.log("You have four choices: my-tweets', 'spotify-this-song', 'movie-this', & 'do-what-it-says'. Please choose one.");
var action = process.argv[2];
var object = process.argv[3];
var currentTweet;
var twitterArray = [];
var x = [];
switch (action) {
  case "my-tweets":
    tweets();
    break;

  case "spotify-this-song":
    spotify();
    break;

  case "movie-this":
    movie();
    break;

  case "do-what-it-says":
    doIt();
    break;
}

function tweets() {
var queryUrl = "https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=LiriNobody&count=20";

$.ajax({
  url: queryUrl,
  method: "GET"
}).done(function(response){

keys( queryUrl, function(error, response, body) {
  if (!error && response.statusCode === 200) {
    var results = response.hits;
    console.log(response);
    //Ingredient Matching Algorithm
    for(var i = 0; i < results.length; i++){
      currentTweet = results[i].tweet;
      twitterArray.push(currentTweet);
      console.log(twitterArray);
    }
  }
});
})
}

function spotify() {
  //tried to create an array, fill that array with the object, which is the input from process.argv3
  //then take that array of each of the words of the supplied song (if longer than one word) & join it together
  //with % in the variable songName so that it can be properly searched in the queryUrl
  x.push(object);
  // var songName = x.join(%);
  var songName = object;
  console.log(songName);
  var queryUrl = "https://api.spotify.com/v1/search?q=track:" + songName + "&type=track&offset=0&limit=1&r=json";
  request( queryUrl, function(error, response, body) {
    if (!error && response.statusCode === 200) {
//unsure how to get the specific items from the JSON object. I think I have the right path as I've
//looked over the object online through the query url but it still doesn't work.
console.log("The artist's name is: " + JSON.parse(body).tracks.items.album.artists.name);
console.log("The song's name is: " + JSON.parse(body).tracks.items.album.name);
console.log("Preview link of the song from Spofity: " + JSON.parse(body).tracks.items.href.preview_url);
console.log("The album that the song is from is: " + JSON.parse(body).tracks.items.album.name);
    }
  });
}

function movie() {
  //So this function works but only with movies with one word titles.
  //Lines 47 & 48 were directed towards a different way of trying to get the query search with movies
  //being more than one word  As I couldn't get it working the first way I tried with the spotify function I
  //wanted to replace the spaces in the argv3 input with "%" when queried but I still couldn't get it to work
  console.log(object);
  var movieName = object.replace(/ /g,"%");
  console.log(movieName);
  var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&i&=&tomatoes=true&y=&plot=short&r=json";

  // request require used here
  request( queryUrl, function(error, response, body) {

  	if (!error && response.statusCode === 200) {
      console.log("The movie's title is: " + JSON.parse(body).Title);
      console.log("The movie's release date is: " + JSON.parse(body).Released);
      console.log("The movie's IMDB rating is: " + JSON.parse(body).imdbRating);
      console.log("The country where this movie was produced is: " + JSON.parse(body).Country);
      console.log("The language of the movie is: " + JSON.parse(body).Language);
      console.log("The plot of the movie is: " + JSON.parse(body).Plot);
      console.log("The movie's actors are: " + JSON.parse(body).Actors);
      console.log("The rotten tomatoes rating is: " + JSON.parse(body).tomatoRating);
      console.log("The rotten tomatoes url is: " + JSON.parse(body).tomatoURL);
  	}
    //couldn't find how to set this else if scenario where argv3, or movieName, is empty
    else if (movieName.empty) {
      movieName = "Mr. Nobody";
      console.log("The movie's title is: " + JSON.parse(body).Title);
      console.log("The movie's release date is: " + JSON.parse(body).Released);
      console.log("The movie's IMDB rating is: " + JSON.parse(body).imdbRating);
      console.log("The country where this movie was produced is: " + JSON.parse(body).Country);
      console.log("The language of the movie is: " + JSON.parse(body).Language);
      console.log("The plot of the movie is: " + JSON.parse(body).Plot);
      console.log("The movie's actors are: " + JSON.parse(body).Actors);
      console.log("The rotten tomatoes rating is: " + JSON.parse(body).tomatoRating);
      console.log("The rotten tomatoes url is: " + JSON.parse(body).tomatoURL);
    }
  });
}

function doIt() {
  //fs require used here
  fs.readFile("random.txt", "utf8", function(err, data) {
    var data = data;
    console.log(data);

    console.log("The artist's name is: " + JSON.parse(body).tracks.items.album.artists.name);
    console.log("The song's name is: " + JSON.parse(body).tracks.items.album.name);
    console.log("Preview link of the song from Spofity: " + JSON.parse(body).tracks.items.href.preview_url);
    console.log("The album that the song is from is: " + JSON.parse(body).tracks.items.album.name);
  })
};
