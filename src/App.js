import './App.css';
import axios from 'axios';

import React, { useState, useEffect } from 'react';
import TimeRightNow from './TimeRightNow.js';

function App(){
  const [data, setData] = useState({})
  const [province, setProvince] = useState('')
  const [city, setCity] = useState('') 
  const [currentTime, setCurrentTime] = useState(new Date());

  const url = `https://cuaca-gempa-rest-api.vercel.app/weather/${province}/${city}`

  const searchProvince = (event) => {
    if (event.key === 'Enter'){

    axios.get(url).then((response) =>{
    setData(response.data)
    console.log(response.data)
    })
    setProvince('') 

    }
  }

  const searchCity = (event) => {

    if (event.key === 'Enter'){
      if(province !== ''){
        axios.get(url).then((response) =>{
        setData(response.data)
        console.log(response.data)
       })
      setCity('')
      }
      else if(province == ''){
        return (
        <p>Enter province first</p>

        );
        console.log('Enter Province beforehand!')
      }
    }
  }

  useEffect(() => {
    const timerID = setInterval(() => tick(), 1000);
    
    return () => clearInterval(timerID);
    
    },
  []);
  
  const tick = () => {
    setCurrentTime(new Date());
  }

  const currentHour = (() => {
    const hour = currentTime.getHours();
    if (hour >= 0 && hour < 6) return 0;
    if (hour >= 6 && hour < 12) return 1;
    if (hour >= 12 && hour < 18) return 2;
    if (hour >= 18 && hour <= 23) return 3;
    return null;
  })();


 
  let currentTemperature = null;

  const temperatureData = data.data ? data.data.params[5].times[currentHour].celcius: null

  const weatherData = data.data ? data.data.params[6].times[currentHour].name: null

  return(
    <div className="app">
      <div className="tiempo">
        <TimeRightNow />
      </div>
      <div className="searchprovince">
        <input
          value={province}
          onChange={event => setProvince(event.target.value)}
          onKeyPress={searchProvince}
          placeholder="Enter province"
          type="text" />
        </div> 
      <div className="searchcity">
        <input 
            value={city}
            onChange={event => setCity(event.target.value)}
            onKeyPress={searchCity}
            placeholder="Enter city"
            type="text" /> 
          </div> 
      <div className="container">
        <div className="top">
          <div className="province">
           {<p>{data.data ? data.data.domain: null}</p>}
          </div>
          <div className="city">
           {<p>{data.data ? data.data.description : null}</p>}
        </div>
        <div className="temp">
           <p>{temperatureData}</p>
        </div>
        <div className="weather">
          <p>{weatherData}</p>
        </div>
      </div>
    </div>
   </div>



  );



}

 
export default App;
