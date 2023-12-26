import { API_KEY, BASE_URL } from "../constants";
import { capitalizeFirstLetter } from "../utils";
import WeatherSummary from "./WeatherSummary";
import Highlights from "./Highlights";
import Coords from "./Coords";
import Humidity from "./Humidity";
import { useState } from "react";

export default function Main({ initialWeather }) {
  const [weatherInfo, setWeatherInfo] = useState(initialWeather);
  const isError = weatherInfo?.cod !== 200;

  const getCityWeather = (e) => {
    if (e.keyCode === 13) {
      fetch(`${BASE_URL}?q=${e.target.value}&units=metric&appid=${API_KEY}`)
        .then((response) => response.json())
        .then((data) => setWeatherInfo(data));
    }
  };

  return (
    <div className="laptop">
      <div className="sections">
        <section
          className={`section section-left ${isError ? "section-error" : ""}`}
        >
          <div className="info">
            <div className="city-inner">
              <input
                defaultValue="Paris"
                id="search"
                type="text"
                className="search"
                onKeyUp={getCityWeather}
              />
            </div>
            {!isError ? (
              <WeatherSummary weatherInfo={weatherInfo} />
            ) : (
              <div className="error">
                <div className="error-title">Oooops! Something went wrong</div>
                {weatherInfo?.message && (
                  <div className="error-message">
                    {capitalizeFirstLetter(weatherInfo?.message)}
                  </div>
                )}
              </div>
            )}
          </div>
        </section>
        {!isError && (
          <section className="section section-right">
            <Highlights weatherInfo={weatherInfo} />
          </section>
        )}
      </div>
      {!isError && (
        <div className="sections">
          <Coords coord={weatherInfo.coord} />
          <Humidity humidity={weatherInfo.main.humidity} />
        </div>
      )}
    </div>
  );
}
