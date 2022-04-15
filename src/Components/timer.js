import React from 'react';
import './timer.css';

const Timer = () => {
    //Hooks approach
    const [time, setTime] = React.useState(0);
    const [timerOn, setTimeOn] = React.useState(false);
    
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

    //Render
    return (
        <div className='container'>
            <div className='timer_container'>
            <h1>
                <span>{("0" + Math.floor((time/6000)%60)).slice(-2)}:</span> {/*Hours*/}
                <span>{("0" + Math.floor((time/1000)%60)).slice(-2)}:</span> {/*minutes*/}
                <span>{("0" + ((time)%100)).slice(-2)}</span> {/*Seconds*/}
            </h1>
                <div>
                    <button className='resume' onClick={() => setTimeOn(true)}>Start</button>
                    <button className='stop' onClick={() => setTimeOn(false)}>Stop</button>
                    <button className='resume' onClick={() => setTimeOn(true)}>Resume</button>
                    <button className='reset' onClick={() => setTime(0)}>Reset</button> 
                </div>
            </div>
        </div>

    )//End of return

}//End of Tmer

export default Timer;
