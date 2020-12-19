import React, { useState } from "react";
import "./card-grid.css";
import appIcon from "./appIcon.png";

function WeatherInfo() {
  const [inputText, setinputText] = useState("");
  const [isDataFetched, setisDataFetched] = useState(false);
  const [cityWeatherData, setcityWeatherData] = useState({});
  const [errorFetching, seterrorFetching] = useState(false);

  const getWeatherDataFromApi = async () => {
    const apiKey = "Enter your openWeatherMap Api key here";
    const city = inputText;
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
    );
    if (response.ok) {
      const responseData = await response.json();
      splitWeatherData(responseData);
      seterrorFetching(false);
    } else {
      seterrorFetching(true);
      setisDataFetched(false);
      setinputText("");
    }
  };

  const splitWeatherData = (e) => {
    let weatherDataCollected = {};
    weatherDataCollected.icon = e.weather
      .map((wh) => {
        return `https://openweathermap.org/img/wn/${wh.icon}@2x.png`;
      })
      .toString();

    weatherDataCollected.weather = e.weather
      .map((wh) => {
        return wh.main;
      })
      .toString();

    weatherDataCollected.temp = (e.main.temp - 273.15).toFixed();

    weatherDataCollected.cityName = e.name;

    setcityWeatherData(weatherDataCollected);
    setisDataFetched(true);
  };

  const handleInputText = (e) => {
    setinputText(e.target.value);
  };
  return (
    <div>
      <div className="row">
        <div className="col">
          <h2>Weather App</h2>
        </div>
        <div className="col">
          <img src={appIcon} alt="" />
        </div>
      </div>
      <div className="row">
        <div className="col s12">
          <div className="col xl2 s8">
            <input
              type="text"
              value={inputText}
              onChange={handleInputText}
              placeholder="Enter City"
            />
          </div>
          <div className="col ">
            <button
              disabled={!inputText}
              className="submit"
              onClick={getWeatherDataFromApi}
            >
              Search
            </button>
          </div>
        </div>
      </div>

      {isDataFetched && (
        <div className="row ">
          <div className="col xl2 l3 m6 s11 ">
            <div className="card grey ">
              <div className="card-content white-text ">
                <span className="card-title">
                  <h5>{cityWeatherData.cityName}</h5>
                </span>
                <div className="row col-height">
                  <div className="col">
                    <h3>{cityWeatherData.temp} °C</h3>
                  </div>
                  <div className="col right">
                    <img src={cityWeatherData.icon} alt="" />
                  </div>
                </div>
                <div className="row col-height">
                  <div className="col">
                    <h5>{cityWeatherData.weather}</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {errorFetching && (
        <div className="row">
          <div className="col">
            <h3>Errr...Enter city name correctly</h3>
          </div>
        </div>
      )}
    </div>
  );
}

export default WeatherInfo;
