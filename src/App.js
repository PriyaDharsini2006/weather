import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const apiKey = 'dce28f19eab4785a6a3ddbc50b57de57'; // Replace with your OpenWeatherMap API key

  const getWeather = async (e) => {
    e.preventDefault();
    setError(null);
    setWeather(null);

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      setWeather(response.data);
    } catch (err) {
      setError('City not found');
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Weather App</h1>
        <form onSubmit={getWeather}>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city name"
          />
          <button type="submit">check</button>
        </form>
        {error && <p>{error}</p>}
        {weather && (
          <div>
            <h2>{weather.name}</h2>
            <p>{weather.weather[0].description}</p>
            <p>{weather.main.temp}°C</p>
            <p>Humidity: {weather.main.humidity}%</p>
            <p>Wind: {weather.wind.speed} m/s</p>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
