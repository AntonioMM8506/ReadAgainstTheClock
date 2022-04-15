import logo from './clock_logo_2.png';
import './App.css';
//import {Helmet} from "react-helmet";
import Timer from './Components/timer';
import React from "react";

function App() {
  //Hooks approach
  const [time, setTime] = React.useState(0);
  const [timerOn, setTimeOn] = React.useState(false);
  
  React.useEffect(() => {
    let interval = null;

    if(timerOn){ //Timer starts
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    }else{ //Timer stops
      clearInterval(interval);
    }

    return () => clearInterval(interval); // to avoid memory leaks

  }, [timerOn]); //runs every time the variable timeOn changes

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div>{time}</div>
        <div>
          <button onClick={() => setTimeOn(true)}>Start</button>
          <button onClick={() => setTimeOn(false)}>Stop</button>
          <button onClick={() => setTimeOn(true)}>Resume</button>
          <button onClick={() => setTime(0)}>Reset</button> 
        </div>
      </header>
      

      
    </div>
  );

}//End of App()

export default App;
