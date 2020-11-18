import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

console.log('procces.env', process.env);

function App() {
  const [weatherInfo, setWeatherInfo] = useState(null);
  const [input, setInput] = useState("Barcelona");
  useEffect(() => {
    getWeatherInfo(input);
  }, [input]);

  const getWeatherInfo = async (query) => {
    const location = await axios.get(
      `http://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_WEATHER_API}&q=${query}`
    );
    setWeatherInfo(location.data);
  };

  return (
    <div>
      {weatherInfo && (
        <div>
          <div className="search">
            <input onChange={(e) => setInput(e.target.value)} type="text" />
            <button onClick={() => getWeatherInfo(input)}>Search</button>
          </div>
          <div className="weather-info">
            <h1>Country: {weatherInfo.location.country}</h1>
            <h2>Region: {weatherInfo.location.region}</h2>
            <h3>City: {weatherInfo.location.name}</h3>
            <div className="condition">
              <h3>{weatherInfo.current.condition.text}</h3>
              <img
                src={weatherInfo.current.condition.icon}
                alt="Weather icon"
              />
              <h3>{weatherInfo.current.temp_c}ºC</h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
