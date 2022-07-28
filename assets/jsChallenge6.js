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
var tempLowEl = $("#temp-low");
var nextWindEl = $("#next-wind");
var nextHumidity = $("#next-humidity");
var prevCityBtn = document.querySelectorAll(".prev-city");

// w-100 bg-info border border-dark rounded p-1 created buttons class to add  

for(i = 0;i < tempHighEl.length;i++){
    console.log(tempHighEl[i]);
} 

function nextFiveWeather(user){
    var weatherURL = 'https://api.openweathermap.org/data/2.5/forecast?q='+user+'&units=imperial&appid=ec5c7380ad1c206f8903e05d34e299ad';
    $.ajax({
        url: weatherURL,
        method: 'GET',
    }).then(function (response){
        console.log(response.list);
        for(i = 3; i < response.list.length;i += 8){
            
            
        }
    })
}
nextFiveWeather("phoenix");

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

function searchCall(){
    getTodayWeather(cityNameInput.val());
    
    
    currentDay.text(moment().format("MM/DD"));   
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
}

function creatButtons(cityName){
    var previousCities = [];

    previousCities.push(cityName);
    for(i = 0;i < previousCities.length;i++){
        var newBtn = $("<button>");
        newBtn.addClass("w-100 bg-info border border-dark rounded p-1 my-1 prev-city");
        newBtn.text(previousCities[i]);
        btnList.append(newBtn); 
    }

}


searchBtn.on("click", searchCall)
btnList.on("click", prevSearchCall)





    
