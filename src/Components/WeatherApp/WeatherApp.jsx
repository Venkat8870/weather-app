// WeatherApp.jsx

import React, { useState } from "react";
import "./WeatherApp.css";

import search_icon from "../Assets/search.png";
import cloud_icon from "../Assets/cloud.png";
import wind_icon from "../Assets/wind.png";
import humidity_icon from "../Assets/humidity.png";
import drizzle_icon from "../Assets/drizzle.png";
import rain_icon from "../Assets/rain.png";
import snow_icon from "../Assets/snow.png";
import clear_icon from "../Assets/clear.png";

const WeatherApp = () => {
    let api_key = "e5cda988177f96574acdadfc809a1a6e";
    const [wicon, setWicon] = useState(cloud_icon);

    const search = async () => {
        const element = document.getElementsByClassName("cityInput");
        if (element[0].value === "") {
            return 0;
        }
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`;

        try {
            let response = await fetch(url);
            let data = await response.json();

            const humidity = document.getElementsByClassName("humidity-percent");
            const wind = document.getElementsByClassName("wind-rate");
            const temperature = document.getElementsByClassName("weather-temp");
            const location = document.getElementsByClassName("weather-location");

            humidity[0].innerHTML = `${data.main.humidity}%`;
            wind[0].innerHTML = `${data.wind.speed} km/hr`;
            temperature[0].innerHTML = `${data.main.temp}°C`;
            location[0].innerHTML = data.name;

            const weatherIconCode = data.weather[0].icon;

            if (weatherIconCode === "01d" || weatherIconCode === "01n") {
                setWicon(clear_icon);
            } else if (weatherIconCode === "02d" || weatherIconCode === "02n") {
                setWicon(cloud_icon);
            } else if (weatherIconCode === "03d" || weatherIconCode === "03n") {
                setWicon(drizzle_icon);
            } else if (weatherIconCode === "04d" || weatherIconCode === "04n") {
                setWicon(drizzle_icon);
            } else if (weatherIconCode === "09d" || weatherIconCode === "09n") {
                setWicon(rain_icon);
            } else if (weatherIconCode === "10d" || weatherIconCode === "10n") {
                setWicon(rain_icon);
            } else if (weatherIconCode === "13d" || weatherIconCode === "13n") {
                setWicon(snow_icon);
            } else {
                setWicon(clear_icon);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    return (
        <div className='container'>
            <div className="top-bar">
                <input type="text" className="cityInput" placeholder="Search" />
                <div className="search_icon" onClick={search}>
                    <img src={search_icon} alt="" />
                </div>
            </div>
            <div className="weather-image">
                <img src={wicon} alt="" />
            </div>
            <div className="weather-temp">
                -°C
            </div>
            <div className="weather-location"></div>
            <div className="data-container">
                <div className="element">
                    <img src={humidity_icon} alt="" className="icon" />
                    <div className="data">
                        <div className="humidity-percent">-</div>
                        <div className="text">Humidity</div>
                    </div>
                </div>
                <div className="element">
                    <img src={wind_icon} alt="" className="icon" />
                    <div className="data">
                        <div className="wind-rate">-</div>
                        <div className="text">Wind Direction</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WeatherApp;
