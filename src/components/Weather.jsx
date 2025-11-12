import React, { useEffect, useState } from 'react'
import './Weather.css'
import search_icon from '../assets/search.png'
import cloudy_icon from '../assets/cloudy.png'
import drizzle_icon from '../assets/drizzle.png'
import humidity_icon from '../assets/humidity.png'
import rainy_icon from '../assets/rainy.png'
import snowy_icon from '../assets/snowy.png'
import sunny_icon from '../assets/sunny.png'
import wind_icon from '../assets/wind.png'

const Weather = () => {

    const [weatherData, setWeatherData] = useState(false);

    const search = async (city)=> {
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`

            const response = await fetch(url);

            const data = await response.json();

            console.log(data);
            setWeatherData({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temperature: data.main.temp,

            })

        } catch (error) {
            
        }
    }

    useEffect(()=> {
        search("lagos");
    },[])

    return (
        <div className='weather'>
            <div className="search-bar">
                <input type="text" placeholder='Search' />
                <img src={search_icon} alt="" />
            </div>
            <img className='weather_icon' src={sunny_icon} alt="" />
            <p className='temperature'>29°c</p>
            <p className='location'>Lagos</p>
            <div className='weather-data'>
                <div className="col">
                    <img className='mini-icon' src={humidity_icon} alt="" />
                    <div>
                        <p>91%</p>
                        <span>Humidity</span>
                    </div>
                </div>
                <div className="col">
                    <img className='mini-icon' src={wind_icon} alt="" />
                    <div>
                        <p>3.6 km/h</p>
                        <span>Wind</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Weather
