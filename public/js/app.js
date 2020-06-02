console.log('Client side JS file is loaded');

const weatherForm =  document.querySelector('#weatherForm');
const weatherResult =  document.querySelector('#weatherResult');
const weatherError =  document.querySelector('#weatherError');
let inputLoc = document.querySelector('[name="inputLocation"]');
weatherForm.addEventListener('submit', ev => {
  weatherError.textContent ='';
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
      res.error ? weatherError.textContent = res.error : weatherResult.textContent = res.location +'\n'+ res.forecast;
    } )
    .catch(err => {
      weatherError.textContent = err;
    });
})

