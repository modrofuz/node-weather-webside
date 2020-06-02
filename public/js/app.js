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
        weatherResult.textContent = 'Miesto: '+res.location;
        const temps = res.forecast.temp.feels_like;
        tempResult.innerText = res.forecast.daily +'\r\n' +
        'Aktualna teplota '+ res.forecast.current.temp+' °C'+'\r\n'+
        'Pocitova teplota '+ res.forecast.current.feels_like+' °C'+'\r\n'+'\r\n'+
        'Max denna teplota '+ res.forecast.temp.temp.day+' °C'+'\r\n'+
        'Min nocna teplota '+ res.forecast.temp.temp.night+' °C' +'\r\n'+
        'Rychlost vetra '+ res.forecast.temp.wind_speed+' m/s';
      }
    } )
    .catch(err => {
      weatherError.textContent = err;
    });
})

