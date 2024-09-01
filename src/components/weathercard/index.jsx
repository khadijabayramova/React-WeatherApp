import windy from "./imgs/weather-windy.svg";
import humidity from "./imgs/humidity-11.svg";
import searchIcon from "./imgs/search-search-6.svg";
import clearWeather from "./imgs/weather-icon-sunny-day.svg";
import clearNight from "./imgs/moon-and-stars.png";
import fewClouds from "./imgs/day-cloudy-icon.svg";
import scatteredClouds from "./imgs/cloudy-icon.svg";
import brokenClouds from "./imgs/cloudy-icon.svg";
import showerRain from "./imgs/weather-icon-light-rain.svg";
import rain from "./imgs/weather-icon-light-rain.svg";
import thunderstorm from "./imgs/weather-icon-lightning.svg";
import snow from "./imgs/weather-icon-light-snow.svg";
import mist from "./imgs/mist-svgrepo-com.svg";
import axios from "axios";
import { useState, useEffect, useRef } from "react";

function WeatherCard() {
  const [weatherData, setWeatherData] = useState([]);
  const inputRef = useRef();
  const [error, setError] = useState(false);

  const allWeatherIcons = {
    "01d": clearWeather,
    "01n": clearNight,
    // ..
    "02d": fewClouds,
    "02n": fewClouds,
    // ..
    "03d": scatteredClouds,
    "03n": scatteredClouds,
    // ..
    "04d": brokenClouds,
    "04n": brokenClouds,
    //..
    "09d": showerRain,
    "09n": showerRain,
    //..
    "10d": rain,
    "10n": rain,
    //..
    "11d": thunderstorm,
    "11n": thunderstorm,
    //..
    "13d": snow,
    "13n": snow,
    //..
    "50d": mist,
    "50n": mist,
  };
  const search = async (city) => {
    const key = "de0f7a5bef0494065e520ed26fcdd9be";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${key}`;

    try {
      const response = await axios.get(url);
      const data = await response.data;
      const icon = allWeatherIcons[data.weather[0].icon] || clearWeather;
      setWeatherData({
        location: response.data.name,
        temp: Math.round(response.data.main.temp),
        humidity: response.data.main.humidity,
        wind: response.data.wind.speed,
        icon,
      });
      setError(null);
    } catch (error) {
      setError("City not found");
      setWeatherData(null);
    }
  };

  useEffect(() => {
    search("Baku");
  }, []);

  const handleSearch = () => {
    const city = inputRef.current.value.trim();
    if (!city) {
      alert("Please enter a city name");
    } else {
      search(city);
    }
  };
  return (
    <div className="flex flex-col  w-1/3 p-10 shadow-[0_8px_30px_rgb(0,0,0,0.12)] gap-y-6 my-20 ms-20 border border-black-300">
      {/* search container */}
      <div className="flex justify-center gap-x-2 items-center">
        <input
          ref={inputRef}
          className=" pl-5 h-9  border border-black rounded-full"
          type="search"
          required
        />
        <img
          className="w-9 h-8 border border-black hover:cursor-pointer rounded-full"
          src={searchIcon}
          onClick={handleSearch}
          alt="search icon"
        />
      </div>

      {weatherData ? (
        <>
          {" "}
          {/* weather container */}
          <div className="flex flex-col gap-y-6 justify-center items-center">
            {/* weather img */}
            <img className="w-20 hover:scale-110 hover:cursor-pointer " src={weatherData.icon} alt="weather icon" />
            {/* city and degree */}
            <div className="flex justify-center text-center flex-col gap-y-2">
              <h1 className="text-3xl font-bold">{weatherData.location}</h1>
              <h2 className="text-3xl font-bold">{weatherData.temp} &deg; C</h2>
            </div>
            {/* wind and humidity */}
            <div className="flex gap-x-20 justify-between my-6">
              {/*  humidity */}
              <div className="flex gap-x-2">
                <img className="w-9" src={humidity} alt="humidity icon" />
                <div>
                  <p>{weatherData.humidity}%</p>
                  <p className="text-gray-500">Humidity</p>
                </div>
              </div>

              {/* wind */}
              <div className="flex gap-x-2">
                <img className="w-9" src={windy} alt="windy" />
                <div className="">
                  <p>{weatherData.wind} km/h</p>
                  <p className="text-gray-500">Wind Speed</p>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <h1 className="text-xl font-bold flex justify-center">{error}</h1>
        </>
      )}
    </div>
  );
}

export default WeatherCard;
