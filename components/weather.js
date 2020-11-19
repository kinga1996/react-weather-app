import React from 'react';
import './weather.css';

const Weather = (props) => {
    let iconURL;
    { props.icon ? iconURL = "https://openweathermap.org/img/wn/" + props.icon + "@2x.png" : iconURL = null}

    return(
        <div id="weatherInfo">
            <h1 id="city">{props.city}</h1>

            { props.icon ? <img src={iconURL} alt="Weather icon" id="icon"/> : null}

            { props.temp ? <h1 id="temp">{props.temp}&deg;</h1> : null }

            { props.sunrise && props.sunset ? <h5 id="sun"><span>
                <img src="https://www.flaticon.com/svg/static/icons/svg/2294/2294976.svg" alt="sunrise" /> {props.sunrise}</span>
                <span><img src="https://www.flaticon.com/svg/static/icons/svg/2294/2294979.svg" alt="sunrise" /> {props.sunset}</span></h5> 
            : null}

            <h2 id="desc">{props.description}</h2>

            { props.humidity && props.pressure ? <div id="addInfo"><p>Humadity: {props.humidity}%</p><p>Pressure: {props.pressure} hPa</p></div> : null}

        </div>
    )
}

export default Weather;

//ikony sunset i sunrise