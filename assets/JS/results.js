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
var resultsEl = document.getElementById("resultsField");
var resultsForm = document.getElementById("resultsForm");
var savedEl = document.getElementById("savedContainer");

function getFoodName() {
    var foodName = localStorage.getItem("name");

    if (localStorage.minKCAL && localStorage.maxKCAL && foodName) {
        var minKCAL = localStorage.getItem("minKCAL");
        var maxKCAL = localStorage.getItem("maxKCAL");
        getFoodInfoMinMax(foodName, minKCAL, maxKCAL);
    }
    
    if (foodName) {
        console.log(foodName);
        getFoodInfo(foodName);
    }
    
    if (localStorage.recipeName) {
        var recipeName = localStorage.getItem("recipeName");
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
                displayRecipeInfo(data);
            });
        }
        else {
            alertModalFoodName1.style.display = "block";
        }
    })
    .catch (function (error) {
        alertModalFoodName2.style.display = "block";
    });
    
    localStorage.removeItem("recipeName");
}

function getFoodInfo(foodName) {
    var app_URL = "https://api.edamam.com/api/food-database/v2/parser?app_id=" + app_ID + "&app_key=" + app_Key1 + "&ingr=" + foodName;
        
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

    localStorage.removeItem("name");
}

function getFoodInfoMinMax(foodName, minKCAL, maxKCAL) {
    var app_URL = "https://api.edamam.com/api/food-database/v2/parser?app_id=" + app_ID + "&app_key=" + app_Key1 + "&ingr=" + foodName + "&calories=" + minKCAL + "-" + maxKCAL;
    
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
    
    localStorage.removeItem("name");
    localStorage.removeItem("minKCAL");
    localStorage.removeItem("maxKCAL");
}

function displayFoodInfo(data) {
    for (i = 0; i < data.hints.length; i++) {
        var name = data.hints[i].food.label;
        var calories = data.hints[i].food.nutrients.ENERC_KCAL;
        var fat = data.hints[i].food.nutrients.FAT;
        var img_URL = data.hints[i].food.image;

        var cardEl = document.createElement("div");
        var cardTitle = document.createElement("h2");
        cardTitle.textContent = name;
        var checkbox = document.createElement("input");
        checkbox.setAttribute("type", "checkbox");
        checkbox.classList = "checkBox";
        checkbox.setAttribute("name", "Ingredient Name");
        checkbox.setAttribute("value", name + "+" + calories + "+" + fat);
        var cardContent1 = document.createElement("h3");
        cardContent1.textContent = "Calories: " + calories + "kcal";
        var cardContent2 = document.createElement("h3");
        cardContent2.textContent = "Fat: " + fat + "g";
        var imgEl = document.createElement("img");
        imgEl.setAttribute("src", img_URL);

        resultsEl.appendChild(cardEl);
        cardEl.appendChild(imgEl);
        cardEl.appendChild(cardTitle);
        cardEl.appendChild(checkbox);
        cardEl.appendChild(cardContent1);
        cardEl.appendChild(cardContent2);
    }
    var saveDiv = document.createElement("div");
    var saveBtn = document.createElement("button");
    saveBtn.setAttribute("type", "submit");
    saveBtn.textContent = "Save";
    
    saveDiv.appendChild(saveBtn);
    resultsEl.appendChild(saveDiv);
}

function displayRecipeInfo(data) {
    for (i = 0; i < data.meals.length; i++) {
        var name = data.meals[i].strMeal;
        var img_URL = data.meals[i].strMealThumb;
        var instructions = data.meals[i].strInstructions;
        
        var cardEl = document.createElement("card");
        var cardTitle = document.createElement("h2");
        var cardContent1 = document.createElement("h3");
        var imgEl = document.createElement("img");
        imgEl.setAttribute("src", img_URL);

        cardTitle.textContent = name;
        cardContent1.textContent = instructions;

        resultsEl.appendChild(cardEl);
        cardEl.appendChild(imgEl);
        cardEl.appendChild(cardTitle);
        cardEl.appendChild(cardContent1);

        //(for (var j = 1; j < 20; j++) {
            //var ingredientStr = "strIngredient" + j;
            //var measurementStr = "strMeasurement" + j;
            
            //var ingredients = data.meals[i]
            //var measurements = data.meals[i].measurementStr;
            
            //var cardContent2 = document.createElement("h3");
            //cardContent2.textContent = "Ingredients: " + ingredients + "     " + measurements; 
            
            //cardEl.appendChild(cardContent2);
        //}
    }
}

function saveFoodInfo(event) {
    event.preventDefault();
    var checkBox = document.getElementsByClassName("checkBox");
    
    for (i = 0; i < checkBox.length; i++) {
        if (checkBox[i].checked == true) {
            var foodInfo = checkBox[i].value;
            
            var infoArr = foodInfo.split("+");
            
            var name = infoArr[0];
            var calories = infoArr[1];
            var fat = infoArr[2];

            localStorage.setItem("name" + i, name);
            localStorage.setItem("calories" + i, calories);
            localStorage.setItem("fat" + i, fat);
        }       
    }

    displaySavedFood();
}

function displaySavedFood() {
    for (i = 0; i < 30; i++) {
        if (localStorage.getItem("name" + i)) {
            var name = localStorage.getItem("name" + i);
            var calories = localStorage.getItem("calories" + i);
            var fat = localStorage.getItem("fat" + i);

            var cardContainer = document.createElement("div");
            var cardTitle = document.createElement("h2");
            cardTitle.textContent = name;
            var cardContent1 = document.createElement("h3");
            cardContent1.textContent = calories + " Kcal";
            var cardContent2 = document.createElement("h3");
            cardContent2.textContent = fat + " g";

            savedEl.appendChild(cardContainer);
            cardContainer.appendChild(cardTitle);
            cardContainer.appendChild(cardContent1);
            cardContainer.appendChild(cardContent2);
        }
    }    
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
        alertModal1.style.display = "none";
    }

    if (event.target == alertModal2) {
        alertModal2.style.display = "none";
    }

    if (event.target == alertModalFoodName1) {
        alertModalFoodName1.style.display = "none";
    }

    if (event.target == alertModalFoodName2) {
        alertModalFoodName2.style.display = "none";
    }
}

window.addEventListener("load", getFoodName);
resultsForm.addEventListener("submit", saveFoodInfo);
