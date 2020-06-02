console.log('Client side JS file is loaded');

const weatherForm =  document.querySelector('#weatherForm');
const weatherResult =  document.querySelector('#weatherResult');
const tempResult = document.querySelector('#tempResult');
const weatherError =  document.querySelector('#weatherError');
let inputLoc = document.querySelector('[name="inputLocation"]');
weatherForm.addEventListener('submit', ev => {
  weatherError.textContent ='';
  tempResult.textContent ='';
  weatherResult.textContent ='';
  ev.preventDefault();
  
  // const result = fetch("http://localhost:3000/weather?address=" + inputLoc.value)
  const result = fetch("/weather?address=" + inputLoc.value)
    .then(res => {
      if (!res.ok) {
        throw Error('error while requesting')
      }
      return res.json();
    })
    .then(res =>{
      console.log(res)
      if (res.error) {
        weatherError.textContent = res.error
      } else {
        weatherResult.textContent = res.location;
        const temps = res.forecast.temp.feels_like;
        tempResult.innerText = res.forecast.daily +'\r\n' + 'Denna teplota '+ res.forecast.temp.feels_like.day+' °C'+'\r\n'+'Nocna teplota '+ res.forecast.temp.feels_like.night+' °C' +'\r\n' +'Rychlost vetra '+ res.forecast.temp.wind_speed+' m/s'
      }
    } )
    .catch(err => {
      weatherError.textContent = err;
    });
})

