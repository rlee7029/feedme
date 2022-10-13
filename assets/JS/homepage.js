var userInputEL = document.getElementById("searchBar");
var userFormEl = document.getElementById("form");
var searchBtn = document.getElementById("searchBtn");
var app_ID = "a4759254";
var app_Key = "8b51efe3abe8a26556f2211b458b449e";
var alertModal = document.getElementsByClassName("modal")[0];
var alertSpan = document.getElementsByClassName("close")[0];
var alertModalFoodName1 = document.getElementsByClassName("modal")[1];
var alertSpanFoodName1 = document.getElementsByClassName("close")[1];
var alertModalFoodName2 = document.getElementsByClassName("modal")[2];
var alertSpanFoodName2 = document.getElementsByClassName("close")[2];

function formSubmitHandler(event) {
    event.preventDefault();
    var foodName = userInputEL.value;
    localStorage.setItem("input", foodName);

    if (!foodName) {
       alertModal.style.display = "block";
       return;
    }
    else {
        getFoodInfo(foodName);
    }
}

function getFoodInfo(foodName) {
    var app_URL = "https://api.edamam.com/api/food-database/v2/parser?app_id=" + app_ID + "&app_key=" + app_Key + "&ingr=" + foodName;
    fetch (app_URL)
        .then (function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    console.log(data);
                    window.location.assign("./results.html");
                });
            }
            else {
                alertModalFoodName1.style.display = "block";
            }
        })
        .catch (function (error) {
            alertModalFoodName2.style.display = "block";
        });
}

alertSpan.onclick = function() {
    alertModal.style.display = "none";
}

alertSpanFoodName1.onclick = function() {
    alertModalFoodName1.style.display = "none";
}

alertSpanFoodName2.onclick = function() {
    alertModalFoodName2.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == alertModal) {
        alertModal.style.display = "none";
    }

    if (event.target == alertModalFoodName1) {
        alertModalFoodName1.style.display = "none";
    }

    if (event.target == alertModalFoodName2) {
        alertModalFoodName2.style.display = "none";
    }
}




userFormEl.addEventListener("submit", formSubmitHandler);

