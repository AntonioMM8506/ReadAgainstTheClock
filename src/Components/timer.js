import logo from '../clock_logo_2.png';
import React from 'react';
import './timer.css';

const Timer = () => {
    //Hooks approach
    const [time, setTime] = React.useState(0);
    const [timerOn, setTimeOn] = React.useState(false);
    const [isActive, setActive] = React.useState(false);
    
    //Uses an interval that can be modified with the setinterval method
    //inside this method one can define the conditions mo modify the given
    //interval. With the method clearInterval, the given interval is stoped
    //However, because of the hooks it is not reset as in a normal use.
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

    //Functions for the animation of the clock.
    const toggleClass = () => {
        setActive(true);
    };

    const negativeToggleClass = () => {
        setActive(false);
    };


    //Render ------------------------------------------------------------------------------------
    return (
        <div className='container'>
            <img src={logo} id='App-logo' className='App-logo-run' style={{animationPlayState: isActive? 'running':'paused' }} alt="logo" />

            <div className='timer_container'>
                <h1>
                    <span>{("0" + Math.floor((time/6000)%60)).slice(-2)}:</span> {/*Hours*/}
                    <span>{("0" + Math.floor((time/1000)%60)).slice(-2)}:</span> {/*minutes*/}
                    <span>{("0" + ((time)%100)).slice(-2)}</span> {/*Seconds*/}
                </h1>
                <div>
                    {/*Run*/}
                    {   
                        time === 0 ? 
                        <button id='actionButton' className='start' onClick={() => {
                            toggleClass();
                            setTimeOn(true);
                            document.getElementById('App-logo').classList.add("App-logo-run");
                        }}>Start</button> 
                        :
                        <button id='actionButton' className='resume' onClick={() => {
                            toggleClass();
                            setTimeOn(true);
                        }}>Resume</button>
                    }

                    {/*Pause/Stop*/}
                    <button id='actionButton' className='stop' onClick={() => {
                        setTimeOn(false);
                        negativeToggleClass();
                    } }>Pause</button>

                    {/*Reset*/}
                    <button id='actionButton' className='reset' onClick={() =>{
                        setTime(0);
                        setTimeOn(false);
                        negativeToggleClass();
                        document.getElementById('App-logo').classList.remove("App-logo-run");
                    
                    }}>Reset</button>
                    
                </div>
            </div>
        </div>

    )//End of return

}//End of Timer

export default Timer;
