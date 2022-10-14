var userInputEL1 = document.getElementById("searchIngredient");
var userInputEL2 = document.getElementById("searchRecipe");
var userFormEl1 = document.getElementById("form1");
var userFormEl2 = document.getElementById("form2");
var searchBtn1 = document.getElementById("searchBtn1");
var searchBtn2 = document.getElementById("searchBtn2");
var app_ID = "a4759254";
var app_Key1 = "8b51efe3abe8a26556f2211b458b449e";
var alertModal1 = document.getElementsByClassName("modal")[0];
var alertSpan1 = document.getElementsByClassName("close")[0];
var alertModal2 = document.getElementsByClassName("modal")[3];
var alertSpan2 = document.getElementsByClassName("close")[3];
var alertModalFoodName1 = document.getElementsByClassName("modal")[1];
var alertSpanFoodName1 = document.getElementsByClassName("close")[1];
var alertModalFoodName2 = document.getElementsByClassName("modal")[2];
var alertSpanFoodName2 = document.getElementsByClassName("close")[2];
var minKCALEl1 = document.getElementById("minKCAL1");
var maxKCALEl1 = document.getElementById("maxKCAL1");


function formSubmitHandler1(event) {
    event.preventDefault();
    var foodName = userInputEL1.value;
    var minKCAL = minKCALEl1.value;
    var maxKCAL = maxKCALEl1.value;
   
    if (!foodName) {
       alertModal1.style.display = "block";
       return;
    }
    else {
        localStorage.setItem("name", foodName);
    } 
    
    if (minKCAL && maxKCAL) {
        localStorage.setItem("minKCAL", minKCAL);
        localStorage.setItem("maxKCAL", maxKCAL);
        getFoodInfoMinMax(foodName,minKCAL,maxKCAL);
    }
    else {
        getFoodInfo(foodName);
    }
}

function getFoodInfoMinMax(foodName,minKCAL,maxKCAL) {
    var app_URL = "https://api.edamam.com/api/food-database/v2/parser?app_id=" + app_ID + "&app_key=" + app_Key1 + "&ingr=" + foodName + "&calories=" + minKCAL + "-" + maxKCAL;
    
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

function getFoodInfo(foodName) {
    var app_URL = "https://api.edamam.com/api/food-database/v2/parser?app_id=" + app_ID + "&app_key=" + app_Key1 + "&ingr=" + foodName;
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

function formSubmitHandler2(event) {
    event.preventDefault();
    var recipeName = userInputEL2.value;

    if (!recipeName) {
        alertModal2.style.display = "block";
        return;
    }
    else {
        localStorage.setItem("recipeName", recipeName);
        getRecipeInfo(recipeName);
    }
}

function getRecipeInfo(recipeName) {
    var app_URL = "https://www.themealdb.com/api/json/v1/1/search.php?s=" + recipeName;
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

alertSpan1.onclick = function() {
    alertModal1.style.display = "none";
}

alertSpan2.onclick = function() {
    alertModal2.style.display = "none";
}

alertSpanFoodName1.onclick = function() {
    alertModalFoodName1.style.display = "none";
}

alertSpanFoodName2.onclick = function() {
    alertModalFoodName2.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == alertModal1) {
        alertModal.style.display = "none";
    }

    if (event.target == alertModal2) {
        alertModal.style.display = "none";
    }

    if (event.target == alertModalFoodName1) {
        alertModalFoodName1.style.display = "none";
    }

    if (event.target == alertModalFoodName2) {
        alertModalFoodName2.style.display = "none";
    }
}




userFormEl1.addEventListener("submit", formSubmitHandler1);
userFormEl2.addEventListener("submit", formSubmitHandler2);

