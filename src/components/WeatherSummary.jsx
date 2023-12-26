import { capitalizeFirstLetter } from "../utils";

export default function WeatherSummary({ weatherInfo }) {
  const today = new Date().toLocaleString("en-EN", {
    weekday: "short",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="summary">
      <div
        style={{
          backgroundImage: `url("https://openweathermap.org/img/wn/${weatherInfo?.weather[0].icon}@4x.png")`,
        }}
        className="pic-main"
      ></div>
      <div className="weather">
        <div className="temp">{Math.round(weatherInfo?.main?.temp)} °C</div>
        <div className="weather-desc text-block">
          {capitalizeFirstLetter(weatherInfo?.weather[0].description)}
        </div>
      </div>
      <div className="city text-block">
        {weatherInfo?.name},{weatherInfo?.sys?.country}
      </div>
      <div className="date text-block">{today}</div>
    </div>
  );
}
