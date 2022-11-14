
const input = document.querySelector('.input')
const submit = document.querySelector('.submit')
const weatherForm = document.querySelector('#cityName')
const weatherPart = document.querySelector('.weatherPart')
const date_weather_container = document.querySelector('.date_weather_container')
const div_input = document.querySelector ('.input-part')
const arrowBack = document.querySelector ('header i')

const weatherByDay =[[],[],[],[],[]]

const getWeather = (cityName)  =>{
  fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=664a518d9319df269c0e0c0cbfe52fc0`)
  .then(resp => resp.json())
  .then(data => {
    //console.log(data[0].lat,data[0].lon)
    //console.log(data[0])

    fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${data[0].lat}&lon=${data[0].lon}&appid=664a518d9319df269c0e0c0cbfe52fc0`)
    .then(response => response.json())
    .then(data => {
     
      //console.log(data.list)
      let i = 0;
      let c =0;
      data.list.forEach((weatherEntry)=>{
        
        if (i < 8){

          weatherByDay[c].push(weatherEntry)

         
        }else {
          c++
          weatherByDay[c].push(weatherEntry)
          i=0
        }
        i++

      })

      console.log(weatherByDay)

      weatherByDay.forEach((day)=>{ 
        let container_weather = document.createElement('div')
        container_weather.classList.add('weather_item')
        let title = document.createElement('h3')// show the date of the day
        title.innerHTML = day[0].dt_txt
        title.classList.add('title-date')
        weatherPart.append(container_weather)
        container_weather.append(title)

        day.forEach((temp) =>{
        let img = document.createElement('img')// show the img of weather
        img.classList.add('img')
        container_weather.append (img)

        const {id} = temp.weather[0];
        if (id === 800) {
          img.src = 'img/sun.png'
  
        } else if (id>=200 && id<= 232){
          img.src = 'img/raining.png'
  
        }else if (id>=600 && id<= 622){
          img.src = 'img/snow.jpg'
  
        }else if (id>=701 && id<= 781){
          img.src = 'img/light.png'

        }else if (id>=801 && id<= 804){
          img.src = 'img/cloudy.png'

        }else if (id>=301 && id< 321 || id >=500 && id <=531){
          img.src = 'img/raining_sun.png'
        }
        let temp_weather = document.createElement ('p') // show the temp of weather
        temp_weather.innerHTML = Math.round(temp.main.temp - 273) + "&deg";
        container_weather.append(temp_weather) 

        let description_weather = document.createElement('h4') // show description of weather
        description_weather.innerHTML = temp.weather[0].description
        container_weather.append (description_weather);
        })
      })
    })
  })

}

weatherForm.addEventListener ('submit', (event)=>{
  event.preventDefault()
  let formData = Object.fromEntries(new FormData(weatherForm))
  //console.log(formData)
  div_input.classList.add ('active')
  weatherPart.classList.remove('active')
  input.value = '';
  getWeather(formData.city)
})

arrowBack.addEventListener('click', ()=>{
  div_input.classList.remove ('active')
  weatherPart.classList.add ('active')
})