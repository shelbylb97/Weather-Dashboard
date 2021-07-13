$(document).ready(function () {
    var flag = true;


    var APIKey = "6a6d81762f7d9ffba1f57aa4ff8d7ab1"

    //  local storage 
    function initSearched() {
        if (localStorage.length == 0) {
            console.log("empty")
            return
        }
        else {
            console.log(localStorage.length)

            for (var i = 0; i < localStorage.length; i++) {
                var index = localStorage.key(i)
                var city = localStorage.getItem(index)
                console.log(localStorage.key(i), localStorage.getItem(index), city)
                var card = $("<div>").attr("class", "card")
                var cityEl = $("<div>").text(city).attr("class", "card-body text-capitalize searched")
                card.append(cityEl)
                $("#searched").prepend(card)
            }

            searched()
        }
    }

    initSearched()

    // Event Listener for the searched button

    $('#search').click(function (event) {

        event.preventDefault()
        event.stopPropagation()
        var city = $('#city').val().trim()

        if (city) {

            $('#dashBoard').empty()
            $('#foreCast').empty()

            if (city) {
                var card = $("<div>").attr("class", "card")
                var cityEl = $("<div>").text(city).attr("class", "card-body text-capitalize searched")
                card.append(cityEl)
                $("#searched").prepend(card)
            }
            getWeather(city)
            getForecast(city)
            console.log(city)
            localStorage.setItem(city, city)


            $('#city').val("")
            $('#five').empty()

        }

        $( ".searched" ).unbind();

        searched()

    })


// Get weather for the dashboard
    function getWeather(city) {

        // city = "Kansas City"
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + APIKey;
        var forcastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=" + APIKey;

        var lat, lon, uvi

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response)

            lon = response.coord.lon
            lat = response.coord.lat

            console.log(lon, lat)

            var dashboard = $("<div>").attr("class", "border pl-4 pb-4")

            var c = $("<h3>").text(response.name + " " + moment().format("L")).attr("class", "")

            var temp = $("<div>").text("Temperature: " + response.main.temp + " F")
            var hum = $("<div>").text("Humidity: " + response.main.humidity + "%").attr("class", "mt-3")
            var wind = $("<div>").text("Wind Speed: " + response.wind.speed + " MPH").attr("class", "mt-3")



            var img = $("<img>").attr("src", "http://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png")
            c.append(img)


            uvi = getUV(lat, lon)
            console.log(uvi)


            dashboard.append(c, temp, hum, wind)


            $("#dashBoard").append(dashboard)

            // getUV(lat,lon) 



        })


    }

    // Gets 5 day forecast

    function getForecast(city) {

        // city = "Kansas City"
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + APIKey;
        var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=" + APIKey;

        $.ajax({
            url: forecastURL,
            method: "GET"
        }).then(function (response) {
            console.log(response)

            var header = $("<h4>").attr("class", "card-header p-2 mt-4 shadow").text("5-Day Forecast:")

            $("#five").prepend(header)

                // Five day forecast

            $.each(response.list, function (i, day) {


                var time = moment(day.dt_txt).hour()

                console.log(i, day.dt_txt, time)
                if (time == 15) {
                    var card = $("<div>").attr("class", "card text-white bg-primary m-2 shadow")

                    var date = $("<div>").text(moment(day.dt_txt).format("ddd, Do")).attr("class", "card-header")
                    var body = $("<div>").attr("class", "card-body")
                    var img = $("<img>").attr("src", "http://openweathermap.org/img/wn/" + day.weather[0].icon + "@2x.png")
                    // c.append(img)
                    var temp = $("<div>").text("Temp: " + day.main.temp + " F").attr("class", "card-text ")
                    var hum = $("<div>").text("Humidity: " + day.main.humidity + "%").attr("class", "card-text ")

                    body.append(img, temp, hum)
                    card.append(date, body)
                    $("#foreCast").append(card)


                }


            })



        })


    }

    // Gets UV index

   

   // Event Listener for the searched cities 

    function searched() {

        $(".searched").click(function (event) {
            console.log($(this).text())
            // event.stopPropagation()
            // event.preventDefault()
            var city = $(this).text()
            getWeather(city)
            getForecast(city)
            console.log(city)
            $('#dashBoard').empty()
            $('#foreCast').empty()
            $('#city').val("")
            $('#five').empty()
        })

    }



});

