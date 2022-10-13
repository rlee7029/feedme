var app_ID = "a4759254";
var app_Key = "8b51efe3abe8a26556f2211b458b449e";
var alertModal = document.getElementsByClassName("modal")[0];
var alertSpan = document.getElementsByClassName("close")[0];
var alertModalFoodName1 = document.getElementsByClassName("modal")[1];
var alertSpanFoodName1 = document.getElementsByClassName("close")[1];
var alertModalFoodName2 = document.getElementsByClassName("modal")[2];
var alertSpanFoodName2 = document.getElementsByClassName("close")[2];
var resultsEl = document.getElementById("resultsContainer");

function getFoodName() {
    var foodName = localStorage.getItem("input");
    console.log(foodName);
    var app_URL = "https://api.edamam.com/api/food-database/v2/parser?app_id=" + app_ID + "&app_key=" + app_Key + "&ingr=" + foodName;
    fetch (app_URL)
        .then (function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    console.log(data);
                    displayFoodInfo(data);
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

function displayFoodInfo(data) {
    for (i = 0; i < data.hints.length; i++) {
        var name = data.hints[i].food.label;
        var calories = data.hints[i].food.nutrients.ENERC_KCAL;
        var fat = data.hints[i].food.nutrients.FAT;
        var img_URL = data.hints[i].food.image;

        var cardEl = document.createElement("card");
        var cardTitle = document.createElement("h2");
        cardTitle.textContent = name;
        var cardContent1 = document.createElement("h3");
        cardContent1.textContent = "Calories: " + calories + "kcal";
        var cardContent2 = document.createElement("h3");
        cardContent2.textContent = "Fat: " + fat + "g";
        var imgEl = document.createElement("img");
        imgEl.setAttribute("src", img_URL);

        resultsEl.appendChild(cardEl);
        cardEl.appendChild(imgEl);
        cardEl.appendChild(cardTitle);
        cardEl.appendChild(cardContent1);
        cardEl.appendChild(cardContent2);
    }
}


window.addEventListener("load", getFoodName);