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
let Link = require('../_modules/link/link');
let apiurl = 'https://images-api.nasa.gov';
let apikey = 'CM9veZyv8UZ0Qv90ZeZoPmKfynfaqX7ASIZITYea';
let apod = 'https://api.nasa.gov/planetary/apod?api_key=' + apikey;
let searchHistory = [];

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
        var description = j.collection.items[i].data[0].description;
        picDiv.style.backgroundImage=`url(${pic})`;
        picDiv.className="spacePic";
        picDiv.title =`${description}`;
        document.getElementById('images').appendChild(picDiv);

      }
    }
  }
)};

function updateHistory(q){
  for(var i=0,max=searchHistory.length;i<=max;i++){

    if(searchHistory.includes(q)){
      console.log(`${q} shouldn't be added to the list again.`);
    }
    else {
      searchHistory.push(`${q}`);
      addToPreviousSearchList();
      pushToLocalStorage('searchHistory',searchHistory);
      console.log(`The current list in memory is ${searchHistory}.`);
      console.log(`The current list in localStorage is ${localStorage.getItem("searchHistory")}.`);
    };
    // if (searchHistory[i] == q) {
    //   isInArray = true;
    //   break;
    //   console.log(`${q} shouldn't be added to the list again.`);
    // };
    // if(isInArray == false){
    //   // myList.setItem(localStorage.length,query);
    //   // console.log(localStorage[i].);
    //   console.log(`${q} isn't in the list yet and should be added.`);
    //   searchHistory.push(`${q}`);
    //   pushToLocalStorage('searchHistory',searchHistory);
    //   addToPreviousSearchList();
    // };
  };
};

function addToPreviousSearchList(){
  //Reset the list to nothing
  document.getElementById('search-list').innerHTML='';
  //Loop through the list of items in the searchHistory to add to list
  for(var i=0,max=searchHistory.length;i<max;i++){
    let history = document.createElement('a');
    history.className="previous-search";
    history.id = `${searchHistory[i]}`;
    history.innerHTML =`${searchHistory[i]}`;
    document.getElementById('search-list').appendChild(history);
  }
};
function pushToLocalStorage(l,i){
  //l is the list key I want to add to
  //i is the value(s) within that key I want to store, as a JSON object
  var newData = JSON.stringify(i);
  localStorage.setItem(l, newData);

};

function pullFromLocalStorage(l){
  var recievedData = localStorage.getItem(l)
  var JSONData = JSON.parse(recievedData);
  console.log(`Hey boss, got some data from localStorage. It's ${JSONData}. I'll add that to our global searchHistory variable.`);
  searchHistory = JSONData;
}

function search(){
  document.getElementById('images').innerHTML=' ';
  var search = document.getElementById('search').value;
  var query = `${apiurl}/search?q=${search}`;
  console.log(query);
  get(query);
  updateHistory(search);
};

window.onload=function(){
  pullFromLocalStorage('searchHistory');
  addToPreviousSearchList();
  document.getElementById('submit').addEventListener('click',function(){
    search();
  });
  document.getElementById('search').addEventListener('keydown',function(e){
    if(e.keyCode === 13){
      e.preventDefault();
      search();
    };
  });
  search();
};
