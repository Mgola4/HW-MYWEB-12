import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WeatherComponent = () => {
  const [temperature, setTemperature] = useState(null);
  const [city, setCity] = useState('London'); // Default city
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/columbus%2C%20oh?unitGroup=us&key=R4V2JZ6CG7X3XN3PA7CXZBDJW&contentType=json`;

  // Fetch weather data using async/await inside useEffect
  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        setLoading(true); // Set loading state to true before API call
        const response = await axios.get(apiUrl);
        const temp = response.data.main.temp; // Temperature is in the 'main' object
        setTemperature(temp); // Set temperature state
        setLoading(false); // Set loading state to false after the API call
      } catch (err) {
        setError('Failed to fetch weather data');
        setLoading(false); // Handle errors and stop loading
      }
    };

    fetchWeatherData();
  }, [city]); // Dependency array includes 'city' to re-fetch on city change

  const handleCityChange = (e) => {
    setCity(e.target.value); // Update city based on user input
  };

  if (loading) {
    return <div>Loading weather data...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Weather Information</h1>
      <div>
        <label htmlFor="city">Enter City:</label>
        <input
          id="city"
          type="text"
          value={city}
          onChange={handleCityChange}
        />
      </div>
      {temperature && (
        <div>
          <h2>{city}</h2>
          <p>Temperature: {temperature}°C</p>
        </div>
      )}
    </div>
  );
};

export default WeatherComponent;