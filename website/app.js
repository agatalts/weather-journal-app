/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+ 1 + ' / '+ d.getDate()+' / '+ d.getFullYear();
console.log(newDate);
console.log(d);

let baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip='
let apiKey = '&appid=791caf474f5e47b0c7a34593ae174a7e';

document.getElementById('generate').addEventListener('click', performAction);

function performAction(e){
const newZipcode =  document.getElementById('zip').value;
const feelings = document.getElementById('feelings').value;
getWeather(baseURL,newZipcode, apiKey)

.then(function(data) {
  console.log(data);
  postData('/add', {temperature: Math.floor(data.main.temp - 273), date: newDate, feelings: feelings}, )
  updateUI()
})

}
const getWeather = async (baseURL, zipcode, key)=>{

  const res = await fetch(baseURL+zipcode+key)
  try {

    const data = await res.json();

    console.log(data)
    return data;
  }  catch(error) {
    console.log("error", error);
  }
}

const postData = async (url='', data = {}) => {
  console.log(data);
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-type': 'application/json'
     },
     body: JSON.stringify(data),
  });
  try {
    const newData = await response.json();
    console.log(newData);
    return newData;
    } catch(error) {
      console.log("error", error);
    }
  }

  // GET request and UI update

const updateUI = async () => { 
  const request = await fetch('/return');
  try {
  const allData = await request.json();
  document.getElementById('date').innerHTML = allData.date;
  document.getElementById('temp').innerHTML = allData.temperature;
  document.getElementById('content').innerHTML = allData.feelings;
  }
  catch(error) {
    console.log("error", error);
  }
}


