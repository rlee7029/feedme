var app_ID = "a4759254";
var app_Key = "8b51efe3abe8a26556f2211b458b449e";
var listEl = document.getElementById("list");
var alertModal = document.getElementsByClassName("modal")[0];
var alertSpan = document.getElementsByClassName("close")[0];
var alertModalFoodName1 = document.getElementsByClassName("modal")[1];
var alertSpanFoodName1 = document.getElementsByClassName("close")[1];
var alertModalFoodName2 = document.getElementsByClassName("modal")[2];
var alertSpanFoodName2 = document.getElementsByClassName("close")[2];

function getFoodName() {
    var foodName = localStorage.getItem("input");
    var app_URL = "https://api.edamam.com/api/food-database/v2/parser?app_id=" + app_ID + "&app_key=" + app_Key + "&ingr=" + foodName;
    fetch (app_URL)
        .then (function (response) {
            if (response.ok) {
                console.log(data);
                displayFoodInfor(data);
            }
            else {
                alertModalFoodName1.style.display = "block";
            }
        })
        .catch (function (error) {
            alertModalFoodName2.style.display = "block";
        });
}


window.addEventListener("load", getFoodName);