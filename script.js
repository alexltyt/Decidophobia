// script.js
var restaurants = JSON.parse(localStorage.getItem('restaurants')) || [];

window.onload = function() {
  var nominatedDiv = document.getElementById("nominated");
  restaurants.forEach(restaurant => {
    nominatedDiv.innerHTML += `<div><input type="checkbox" value="${restaurant}"><label>${restaurant}</label></div>`;
  });
};

function addRestaurant() {
  var restaurantInput = document.getElementById("restaurantInput");
  var restaurantName = restaurantInput.value.trim();

  if (restaurantName) {
    restaurants.push(restaurantName);
    var nominatedDiv = document.getElementById("nominated");
    nominatedDiv.innerHTML += `<div><input type="checkbox" value="${restaurantName}"><label>${restaurantName}</label></div>`;
    restaurantInput.value = "";
    localStorage.setItem('restaurants', JSON.stringify(restaurants));
  }
}

function randomize() {
    var randomCountInput = document.getElementById("randomCount");
    var randomCount = parseInt(randomCountInput.value);
    var resultDiv = document.getElementById("result");
    resultDiv.innerHTML = "";
  
    var selectedRestaurants = Array.from(document.querySelectorAll("#nominated input[type='checkbox']:checked:not(#selectAll)")).map(input => input.value);

  if (randomCount > 0 && randomCount <= selectedRestaurants.length) {
    var randomRestaurants = [];
    var copyOfRestaurants = [...selectedRestaurants];

    for (var i = 0; i < randomCount; i++) {
      var randomIndex = Math.floor(Math.random() * copyOfRestaurants.length);
      randomRestaurants.push(copyOfRestaurants[randomIndex]);
      copyOfRestaurants.splice(randomIndex, 1);
    }

    // Create a "spin" animation with linear deceleration
    var i = 0;
    var intervalTime = 100;
    var interval = setInterval(spin, intervalTime);

    function spin() {
      resultDiv.innerHTML = "<p>" + "Randomizing... "+selectedRestaurants[i % selectedRestaurants.length] + "</p>";
      i++;
      intervalTime += 10; // increase interval time to create deceleration effect
      if (i > selectedRestaurants.length * 3) {
        clearInterval(interval);
        resultDiv.innerHTML = "<p class='final'>" + randomRestaurants.join(", ") + "</p>";
      } else {
        clearInterval(interval);
        interval = setInterval(spin, intervalTime);
      }
    }
  }
}

function clearAll() {
    var confirmation = confirm("Are you sure you want to clear all restaurants? This action cannot be undone.");
    if (confirmation) {
      localStorage.removeItem('restaurants');
      restaurants = [];
      document.getElementById("nominated").innerHTML = "";
    }
  }
  
  function selectAll() {
    var isSelected = document.getElementById("selectAll").checked;
    var checkboxes = document.querySelectorAll("#nominated input[type='checkbox']");
    checkboxes.forEach(checkbox => {
      checkbox.checked = isSelected;
    });
  }
