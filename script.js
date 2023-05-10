// script.js
var restaurants = JSON.parse(localStorage.getItem('restaurants')) || [];

window.onload = function() {
  var nominatedDiv = document.getElementById("nominated");
  restaurants.forEach(restaurant => {
    nominatedDiv.innerHTML += "<p>" + restaurant + "</p>";
  });
};

function addRestaurant() {
  var restaurantInput = document.getElementById("restaurantInput");
  var restaurantName = restaurantInput.value.trim();

  if (restaurantName) {
    restaurants.push(restaurantName);
    var nominatedDiv = document.getElementById("nominated");
    nominatedDiv.innerHTML += "<p>" + restaurantName + "</p>";
    restaurantInput.value = "";
    localStorage.setItem('restaurants', JSON.stringify(restaurants));
  }
}

function randomize() {
  var randomCountInput = document.getElementById("randomCount");
  var randomCount = parseInt(randomCountInput.value);
  var resultDiv = document.getElementById("result");
  resultDiv.innerHTML = "";

  if (randomCount > 0 && randomCount <= restaurants.length) {
    var randomRestaurants = [];
    var copyOfRestaurants = [...restaurants];

    for (var i = 0; i < randomCount; i++) {
      var randomIndex = Math.floor(Math.random() * copyOfRestaurants.length);
      randomRestaurants.push(copyOfRestaurants[randomIndex]);
      copyOfRestaurants.splice(randomIndex, 1);
    }

    var i = 0;
    var intervalTime = 100;
    var interval = setInterval(spin, intervalTime);
  
    function spin() {
      resultDiv.innerHTML = "<p>" + "Randomizing... "+restaurants[i % restaurants.length] + "</p>";
      i++;
      intervalTime += 10; // increase interval time to create deceleration effect
      if (i > restaurants.length * 3) {
        clearInterval(interval);
        resultDiv.innerHTML = "<p class='final'>" + randomRestaurants.join(", ") + "</p>";
      } else {
        clearInterval(interval);
        interval = setInterval(spin, intervalTime);
      }
    }
  }
}

