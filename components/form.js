import React from 'react';
import './form.css';

const Form = props =>{
    return(
        <div className="form">
            <form onSubmit={props.loadweather}>
                <div>{props.error ? error : null}</div>
                <input type="text" name="city" placeholder="Type city" required></input>
                <input type="text" name="country" placeholder="Type country" required></input>
                <button>Get Weather</button>
            </form>
        </div>
    );
}


function error(){
    return(
      <div className="alert" role="alert">
        Please enter city and country
      </div>
    )
  }

export default Form;