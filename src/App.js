import logo from './clock_logo_2.png';
//import React, { Component } from 'react';
//import updateCountdown from './scripts/timer';
import './App.css';
import {Helmet} from "react-helmet";



function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <p id="countdown">10:00</p>
        <Helmet>
          <script src=
            "./scripts/timer.js" 
          type="text/jsx" />
        </Helmet>

      </header>
      

      
    </div>
  );

}//End of App()

export default App;
