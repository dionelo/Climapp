var fetchWeather = "/weather"

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

const weatherIcon = document.querySelector('.weatherIcon img')
const weatherCondition = document.querySelector('.weatherCondition')

const tempElement = document.querySelector('.temperature span')
const locationElement = document.querySelector('.place')
const dateElement = document.querySelector('.date')

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

dateElement.textContent = new Date().getDate() + ", " + monthNames[new Date().getMonth()].substring(0, 3)


weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()
    locationElement.textContent = "Loading..."
    tempElement.textContent = ""
    weatherCondition.textContent = ""
    const locationApi = fetchWeather + "?address=" + search.value
    fetch(locationApi).then(response => {
        response.json().then(data => {
            if (data.error) {
                locationElement.textContent = data.error
                tempElement.textContent = ""
                weatherCondition.textContent = ""
            } else {
                if (data.icon === "04d" || data.icon === "03d" || data.icon === "02d") {
                    weatherIcon.src = "../images/nublado.png"
                }
                if (data.icon === "04n" || data.icon === "03n" || data.icon === "02n") {
                    weatherIcon.src = "../images/nublado_n.png"
                }
                if (data.icon === "01d") {
                    weatherIcon.src = "../images/sol.png"
                }
                if (data.icon === "01n") {
                    weatherIcon.src = "../images/noche.png"
                }
                if (data.icon === "09d" || data.icon === "10d") {
                    weatherIcon.src = "../images/lluvioso_d.png"
                }
                if (data.icon === "09n" || data.icon === "10n") {
                    weatherIcon.src = "../images/lluvioso.png"
                }
                if (data.icon === "11d") {
                    weatherIcon.src = "../images/tormenta.png"
                }
                if (data.icon === "11n") {
                    weatherIcon.src = "../images/tormenta_n.png"
                }
                
                locationElement.textContent = data.cityName + " / " + data.countryName
                tempElement.textContent = (data.temperature - 273.5).toFixed(2) + String.fromCharCode(176)
                weatherCondition.textContent = data.description.toUpperCase()
            }
        }) 
    })
})