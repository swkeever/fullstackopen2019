import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WeatherReport = ({ city }) => {
  const [cityWeather, setCityWeather] = useState({});

  useEffect(() => {
    const baseUrl = 'https://api.apixu.com/v1/current.json'
    const apiKey = '4d3aa6d7747c498ba18170641192906';
    const requestUrl = `${baseUrl}?key=${apiKey}&q=${city}`;

    axios
      .get(requestUrl)
      .then(res => {
        setCityWeather(res.data.current);
      });
  }, [city]);
  
  if (!Object.keys(cityWeather).length) {
    return <p>Weather report loading...</p>
  }

  return (
    <div>
      <h2>
        Weather in {city}
      </h2>
      <div>
        <strong>temperature: </strong> 
        {cityWeather.temp_c} Celsius
        <div>
          <img src={cityWeather.condition.icon} alt={cityWeather.condition.text} />
        </div>  
      </div>
      <div>
        <strong>wind: </strong>
        {cityWeather.wind_kph} kph direction {cityWeather.wind_dir}
      </div>
    </div>
  );
};

export default WeatherReport;