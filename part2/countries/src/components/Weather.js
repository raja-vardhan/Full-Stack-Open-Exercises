import { useState, useEffect } from "react";
import axios from 'axios';

const Weather = ({location}) => {
  const [weather, setWeather] = useState(undefined);

  useEffect(() => {
    const api_key = process.env.REACT_APP_API_KEY;
    axios
    .get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${api_key}&units=metric`)
    .then(response => {
      setWeather(response.data);
    })
  }, [location]);

  if(weather === undefined){
    return (
      <div>
        <h2>Weather in {location}</h2>
      </div>
    )
  }

  return (
    <div>
      <h2>Weather in {location}</h2>
      <p>Temperature {weather.main.temp} Celsius</p>
      <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt='Weather icon'/>
      <p>Wind {weather.wind.speed} m/s</p>
    </div>
  );
}

export default Weather;