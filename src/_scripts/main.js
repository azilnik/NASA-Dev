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

// var $ = require('jquery');
var Link = require('../_modules/link/link');
var apiurl = 'https://images-api.nasa.gov';
var apikey = 'CM9veZyv8UZ0Qv90ZeZoPmKfynfaqX7ASIZITYea';
var apod = 'https://api.nasa.gov/planetary/apod?api_key='+apikey;

function get(u){
  //Fetch the info from the API
  fetch(u)
  .then(function(r){
    console.log(`The request for ${r} is coming back with ${r.status}.`)
    return r.json(); //Return the JSON object
  })
  .then(function(j){ //Whatever gets returned from the previous becomes the var in the next then.
    for(var i=0, max = j.collection.items.length;i<max;i++){
      var check = j.collection.items[i].data[0].media_type;
      if(check == "image"){
        var pic = j.collection.items[i].links[0].href;
        var picDiv = document.createElement('div');
        picDiv.style.backgroundImage=`url(${pic})`;
        picDiv.className="spacePic";
        document.getElementById('images').appendChild(picDiv);
      } else {
        console.log(`${j.collection.items[i].data[0]} is not an image.`);
      }
    }
  }
)};



function search(){
  document.getElementById('images').innerHTML=' ';
  var search = document.getElementById('search').value;
  var query = `${apiurl}/search?q=${search}`;
  console.log(query);
  get(query);
};

window.onload=function(){
  document.getElementById('submit').addEventListener('click',search);
  search();
};
