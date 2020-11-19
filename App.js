import React from 'react';
import './App.css';

import Weather from './components/weather';
import Form from './components/form';

const APIKey = "2471a6c18182a8fd20a37d0455499cb7";

class App extends React.Component{
  constructor(){
    super();
    this.state = {
      city: undefined,
      temp: undefined,
      description: undefined,
      humidity: undefined,
      pressure: undefined,
      sunrise: undefined,
      sunset: undefined,
      icon: undefined,
      weather: undefined,
      error: false
    };
  }

  calculateCel(temp){
    let cel = Math.round(temp - 273.15);
    return cel;
  }

  calculateTime(time){
    const datetime = new Date(time*1000);
    let hour = datetime.getHours();
    let min = datetime.getMinutes();
    if (min <10) return `${hour}:0${min}`;
    else return `${hour}:${min}`
  }

  getWeather = async(e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;

    if (city && country){
    const API_call = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${APIKey}`);
    const response = await API_call.json();
    console.log(response);

    if (response.name && response.sys.country){
    this.setState ({
      city: `${response.name}, ${response.sys.country}`,
      temp: this.calculateCel(response.main.temp),
      description: response.weather[0].main,
      humidity: response.main.humidity,
      pressure: response.main.pressure,
      sunrise: this.calculateTime(response.sys.sunrise),
      sunset: this.calculateTime(response.sys.sunset),
      icon: response.weather[0].icon,
      weather: response.weather[0].id
    })}
    else{
      alert("Wrong city or country - try again :)")
    }
  } else{
    this.setState({error: true})
  }
  }

  render(){
    return(
      <div className={
        (typeof weather != undefined ?
        (this.state.weather>=200 && this.state.weather<300 ? 'thunderstorm':
        (this.state.weather>=300 && this.state.weather<400 ? 'drizzle':
        (this.state.weather>=500 && this.state.weather<600 ? 'rain' :
        (this.state.weather>=600 && this.state.weather<700 ? 'snow' :
        (this.state.weather>=700 && this.state.weather<781 ? 'fog' :
        (this.state.weather === 781 ? 'tornado' :
        (this.state.weather === 800 ? 'clear' :
        (this.state.weather > 800 ? 'clouds' : 'App'
        )
        )
        )
        )
        )
        )
        )) : 'App')
      }>
        <h1 id="headH1">Check weather wherever you want</h1>
        <Form loadweather={this.getWeather} error={this.state.error}/>
        <Weather
          city={this.state.city}
          temp={this.state.temp}
          description={this.state.description}
          humidity={this.state.humidity}
          pressure={this.state.pressure}
          sunrise={this.state.sunrise}
          sunset={this.state.sunset}
          icon={this.state.icon}
        />
      </div>
    )
  }
}


export default App;
