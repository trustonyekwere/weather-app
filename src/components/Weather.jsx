import React, { useEffect, useRef, useState } from 'react'
import './Weather.css'
// importing assets from assets folder
import search_icon from '../assets/search.png'
import cloudy_icon from '../assets/cloudy.png'
import drizzle_icon from '../assets/drizzle.png'
import humidity_icon from '../assets/humidity.png'
import rainy_icon from '../assets/rainy.png'
import snowy_icon from '../assets/snowy.png'
import sunny_icon from '../assets/sunny.png'
import night_icon from '../assets/night.png'
import wind_icon from '../assets/wind.png'

// creating weather component
const Weather = () => {

    // 
    const inputRef = useRef()

    // state to hold weather data
    const [weatherData, setWeatherData] = useState(false);

    // mapping weather icons to openweathermap icons
    const allIcons = {
        "01d": sunny_icon,
        "01n": night_icon,
        "02d": cloudy_icon,
        "02n": night_icon,
        "03d": cloudy_icon,
        "03n": night_icon,
        "04d": cloudy_icon,
        "04n": night_icon,
        "09d": drizzle_icon,
        "09n": drizzle_icon,
        "10d": rainy_icon,
        "10n": rainy_icon,
        "11d": rainy_icon,
        "11n": rainy_icon,
        "13d": snowy_icon,
        "13n": snowy_icon,
        "50d": wind_icon,
        "50n": wind_icon,
    }

    //  function to fetch weather data from openweathermap api 
    const search = async (city)=> {

        if (city === "") {
            alert("Enter City Name");
            return;
        }

        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`

            const response = await fetch(url);

            const data = await response.json();

            // alert if wrong city name is typed
            if (!response.ok) {
                alert(data.message);
                return;
            }

            console.log(data);

            const icon = allIcons[data.weather[0].icon] || sunny_icon; // default icon as sunny icon if no icon is available

            setWeatherData({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                location: data.name,
                icon: icon

            })

        } catch (error) {
            setWeatherData(false);
            console.error("Error in fetching weather data")
        }
    }

    // testing search logic / default city
    useEffect(()=> {
        search("lagos");
    },[])

    return (
        <div className='weather'>

            <div className="search-bar">
                <input ref={inputRef} type="text" placeholder='Search' />
                <img src={search_icon} onClick={()=>search(inputRef.current.value)} alt="search" />
            </div>

            {/* display nothing if api isn't being fetched */}
            {weatherData?<>
                <img className='weather_icon' src={weatherData.icon} alt="" />
                <p className='temperature'>{weatherData.temperature}°c</p>
                <p className='location'>{weatherData.location}</p>

                <div className='weather-data'>

                    <div className="col">
                        <img className='mini-icon' src={humidity_icon} alt="" />
                        <div>
                            <p>{weatherData.humidity} %</p>
                            <span>Humidity</span>
                        </div>
                    </div>

                    <div className="col2">
                        <img className='mini-icon' src={wind_icon} alt="" />
                        <div>
                            <p>{weatherData.windSpeed} km/h</p>
                            <span>Wind</span>
                        </div>
                    </div>

                </div>
            </>:<></>}

        </div>
    )
}

export default Weather
