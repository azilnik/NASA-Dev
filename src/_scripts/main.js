// Main javascript entry point
// Should handle bootstrapping/starting application

//To do
// Pull data from the NASA image API using AJAX
// Handle 200, 400, and 500 response errors using promises
// Parse a JSON response using destructuring
// Save previous searches using DOM Localstorage
// Use mouseover for captions
// Use a default value when a user doesn't input anythign
// Use template strings to display all the text on the page

'use strict';

var $ = require('jquery');
var Link = require('../_modules/link/link');
var apiurl = 'https://images-api.nasa.gov/';
var apikey = 'CM9veZyv8UZ0Qv90ZeZoPmKfynfaqX7ASIZITYea';
var apod = 'https://api.nasa.gov/planetary/apod?api_key='+apikey;
function getNasaImage(url){
  let imageurl =[]
  //Fetch the User Profile from the API
  fetch(url)
  .then(function(r){
    return r.json(); //Return the JSON object of the user profile
  })
  .then(function(j){
    let image = j.hdurl;
     let imagestructure =`<img src="${image}">`;
     return imagestructure;
  });
  return fetch(url);
};

let test = getNasaImage(apod);
console.log(test);


//document.getElementById

// $(function() {
//   new Link(); // Activate Link modules logic
//
//
// });
