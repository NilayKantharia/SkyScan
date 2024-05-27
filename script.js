const btn = document.getElementById("search-button")
const input = document.getElementById("city-input")
const cityName = document.getElementById("city-name")
const cityTime = document.getElementById("city-time")
const cityTemp = document.getElementById("city-temp")
const container = document.getElementById('container')
const status = document.getElementById('statusInfo')
const todayDate = new Date()
const loc = navigator.geolocation.getCurrentPosition(updateData)
const moon = document.getElementById('moon')
var is_day = 0

async function getData(cityName){
    const promise = await fetch(`http://api.weatherapi.com/v1/current.json?key=fbe112a20eef437b8fc162220242002&q=${cityName}&aqi=yes`)
    return await promise.json()
}
async function getData(lat, long){
    const promise = await fetch(`http://api.weatherapi.com/v1/current.json?key=fbe112a20eef437b8fc162220242002&q=${lat},${long}&aqi=yes`)
    return await promise.json()
}
btn.addEventListener("click",async () => {
    // const val = input.value;
    updateData(input.val)

})

async function updateData(position){
  // if (position){
  //   const result = await getData(position)
  // }
  // else{
  const result = await getData(position.coords.latitude, position.coords.longitude)
  // }
  console.log(result)
  console.log(result.current.cloud)
  console.log(result.current.condition.text)
  console.log(result.current.is_day)
  console.log(result.current.wind_kph)
  is_day = result.current.is_day
  if (result.current.is_day){
    document.body.style.background = "radial-gradient(farthest-corner at 50% -10%, #8ab9c8 0%, #649aaf 100%)"; 
  }
  else{
    document.body.style.background = "linear-gradient(45deg, #451c76, #4650a3)"; 
    generateStars()
  }
  wind = result.current.wind_kph
  let currentClouds = result.current.cloud / 5
  if (currentClouds <= 3){
    currentClouds = 2
  }
  if (currentClouds >= 20){
    currentClouds = 10
  }

  createRandomElements(1/currentClouds)
  cityName.innerText = `${result.location.name}, ${result.location.region} - ${result.location.country}`
  cityTime.innerText=`${result.location.localtime}`
  cityTemp.innerText=`${result.current.temp_c}°C`
  statusInfo.innerText = `${result.current.condition.text}`
}



function createRandomElements(currentClouds) {
    container.replaceChildren()
    generate()
    setInterval(generate,currentClouds * 100000)
  }

function generate(){
  var element = document.createElement('div');
      element.className = 'element';
      if (!is_day){
        element.style.filter = "hue-rotate(100deg)"
        element.style.filter = "brightness(65%)"
      }
      element.style.left = Math.random() * (container.offsetWidth - 100) + 'px';
      element.style.top = Math.random() * (container.offsetHeight - 100) + 'px';
      if(wind <= 30){
        windSpeed = 200
      }
      else if(wind <= 30 && wind > 60){
        windSpeed = 100
      }
      else{
        windSpeed = 50
      }
      element.style.animationDuration = `${windSpeed + Math.floor(Math.random() * 1)}s`

      container.appendChild(element);
}

// generate()
// function generateCloudsRandomly() {
//   var interval = Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000;
//   for (i = 0; i < 2; i++){
//   // generate();
//   setTimeout(generate, 5000);
// }
// }
  //#3D3772 #1D1D43


  function random(min, max) {
    return min + Math.random() * (max + 1 - min);
  }
  
  function generateStars(){
    const body = document.querySelector('body');
    const canvasSize = body.offsetWidth * body.offsetHeight;
    const starsFraction = canvasSize / 2000;
    for(let i = 0; i < starsFraction; i++) {
      let xPos = random(0, 100);
      let yPos = random(0, 100);
      let alpha = random(0.5, 1);
      let size = random(1, 2);
      let colour = '#ffffff';
      const star = document.createElement('div');
      star.className = "star";
      star.style.position = 'absolute';
      star.style.left = xPos + '%';
      star.style.top = yPos + '%';
      star.style.opacity = alpha;
      star.style.width = size + 'px';
      star.style.height = size + 'px';
      star.style.backgroundColor = colour;
      star.style.zIndex = '-10';
      document.body.appendChild(star);
    }
  }

cityName.addEventListener('click',()=>{
  var hide = document.getElementById('hide')
  hide.style.display = 'block'
  cityName.style.display = 'none'
})