
// App.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import TimeRightNow from './TimeRightNow.js';

function App() {
  const [data, setData] = useState({});
  const [province, setProvince] = useState('');
  const [city, setCity] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());

  const url = `https://cuaca-gempa-rest-api.vercel.app/weather/${province}/${city}`;

  const searchProvince = (event) => {
    if (event.key === 'Enter') {
      fetchData();
      setProvince('');
    }
  };

  const searchCity = (event) => {
    if (event.key === 'Enter') {
      if (province !== '') {
        fetchData();
        setCity('');
      } else {
        console.log('Enter Province beforehand!');
      }
    }
  };

  const fetchData = () => {
    axios.get(url)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  useEffect(() => {
    const timerID = setInterval(() => tick(), 1000);

    return () => clearInterval(timerID);
  }, []);

  const tick = () => {
    setCurrentTime(new Date());
  };

  const currentHour = (() => {
    const hour = currentTime.getHours();
    if (hour >= 0 && hour < 6) return 0;
    if (hour >= 6 && hour < 12) return 1;
    if (hour >= 12 && hour < 18) return 2;
    if (hour >= 18 && hour <= 23) return 3;
    return null;
  })();

  const temperatureData = data.data ? data.data.params[5].times[currentHour].celcius : null;
  const weatherData = data.data ? data.data.params[6].times[currentHour].name : null;

  return (
    <div className="app">
      <div className="header">
        <h1>Weather Forecast</h1>
        <TimeRightNow />
      </div>
      <div className="search-container">
        <input
          value={province}
          onChange={(event) => setProvince(event.target.value)}
          onKeyPress={searchProvince}
          placeholder="Enter province"
          type="text"
        />
        <input
          value={city}
          onChange={(event) => setCity(event.target.value)}
          onKeyPress={searchCity}
          placeholder="Enter city"
          type="text"
        />
      </div>
      <div className="weather-container">
        {data.data &&
          <div className="weather-card">
            <p>Province: {data.data.domain}</p>
            <p>City: {data.data.description}</p>
            <p className="temp">{temperatureData}</p>
            <p className="weather">{weatherData}</p>
          </div>
        }
      </div>
      <div className="footer">
        <p>Data provided by BMKG</p>
      </div>
    </div>
  );
}

export default App;
