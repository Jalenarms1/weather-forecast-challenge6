var searchBtn = $("#search-btn");
var todayTempEl = $("#temp");
var todayWindEL = $("#wind");
var todayHumidityEl = $("#humidity");
var todayFeelsLikeEL = $("#feelsLike");
var cityNameInput = $("#city-name");
var currentDay = $("#currentDay")
var btnList = $("#btn-list");
var listBtn = $(".btn-list")
var tempHighEl = $(".temp-high");
var tempLowEl = $(".temp-low");
var nextWindEl = $(".next-wind");
var nextHumidity = $(".next-humidity");
var prevCityBtn = document.querySelectorAll(".prev-city");
var storeCities = [];

// w-100 bg-info border border-dark rounded p-1 created buttons class to add  

function nextFiveWeather(user){
    var weatherURL = 'https://api.openweathermap.org/data/2.5/forecast?q='+user+'&units=imperial&appid=ec5c7380ad1c206f8903e05d34e299ad';
    $.ajax({
        url: weatherURL,
        method: 'GET',
    }).then(function (response){
        console.log(response.list);
        var fiveDayHigh = [];
        var fiveDayLow = [];
        var fiveDayWind = [];
        var fiveDayHumidity = [];
        for(i = 2; i < response.list.length;i += 8){
            console.log(response.list[i]);
            fiveDayHigh.push(response.list[i].main.temp_max); 
            fiveDayLow.push(response.list[i].main.temp_min);
            fiveDayWind.push(response.list[i].wind.speed);
            fiveDayHumidity.push(response.list[i].main.humidity);
        }
        for(i = 0;i < tempHighEl.length;i++){
            console.log(tempHighEl[i]);
            $(tempHighEl[i]).text(fiveDayHigh[i]);
        } 
        for(i = 0;i < tempLowEl.length;i++){
            $(tempLowEl[i]).text(fiveDayLow[i]);
        }
        for(i = 0;i < nextWindEl.length;i++){
            $(nextWindEl[i]).text(fiveDayWind[i]);
        }
        for(i = 0;i < nextHumidity.length;i++){
            $(nextHumidity[i]).text(fiveDayHumidity[i]);
        }
        
    })
}


function getTodayWeather (user){    
    var currentWeather = "https://api.openweathermap.org/data/2.5/weather?q="+user+"&units=imperial&appid=ec5c7380ad1c206f8903e05d34e299ad";
    $.ajax({
        url: currentWeather,
        method: 'GET'
    }).then(function(response){
        todayTempEl.text(response.main.temp);
        todayWindEL.text(response.wind.speed);
        todayHumidityEl.text(response.main.humidity);
        todayFeelsLikeEL.text(response.main.feels_like);
        if(response.status !== 404){
            creatButtons(user)
            
        } 
    }).catch(function (response){
        alert("enter a valid city name")
    })
    
    

}

function dateDisplay(){
    currentDay.text(moment().format("MM/DD"));
    $("#dayOne").text(moment().add(1, "days").format("MM/DD"));
    $("#dayTwo").text(moment().add(2, "days").format("MM/DD"));
    $("#dayThree").text(moment().add(3, "days").format("MM/DD"));
    $("#dayFour").text(moment().add(4, "days").format("MM/DD"));
    $("#dayFive").text(moment().add(5, "days").format("MM/DD"));
    
}
dateDisplay();

function searchCall(){
    getTodayWeather(cityNameInput.val());
    nextFiveWeather(cityNameInput.val());   
    cityNameInput.val(''); 
}

function prevSearchCall(event){
    var event = event.target;
    var currentWeather = "https://api.openweathermap.org/data/2.5/weather?q="+event.textContent+"&units=imperial&appid=ec5c7380ad1c206f8903e05d34e299ad";
    $.ajax({
        url: currentWeather,
        method: 'GET'
    }).then(function(response){
        todayTempEl.text(response.main.temp);
        todayWindEL.text(response.wind.speed);
        todayHumidityEl.text(response.main.humidity);
        todayFeelsLikeEL.text(response.main.feels_like);      
})
    nextFiveWeather(event.textContent)

}

function creatButtons(cityName){
    var previousCities = [];

    previousCities.push(cityName);
    for(i = 0;i < previousCities.length;i++){
        var newBtn = $("<button>");
        newBtn.addClass("w-100 bg-info border border-dark rounded p-1 my-1 prev-city");
        newBtn.text(previousCities[i]);
        btnList.append(newBtn); 
        storeCities.push(previousCities);
        saveCities();
    } return storeCities
    
} 

if(storeCities != null){
    var gotDown = JSON.parse(localStorage.getItem("previous"));
}

console.log(gotDown);
function displaySavedCities(){
    console.log(gotDown);
    if(gotDown != null){
        for(i = 0;i < gotDown.length;i++){
            var newBtnEl = $("<button>");
            newBtnEl.addClass("w-100 bg-info border border-dark rounded p-1 my-1 prev-city");
            newBtnEl.text(gotDown[i]);
            btnList.append(newBtnEl);
        }
    }
   
    
}
displaySavedCities();

function saveCities(){
    localStorage.setItem("previous", JSON.stringify(storeCities));

    console.log(storeCities);
}




searchBtn.on("click", searchCall)
btnList.on("click", prevSearchCall)





    
