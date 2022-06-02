import logo from './img/clock_logo_3.png';
import * as React from 'react';
import './timer.css';
import Popup from './popup';
import Alarm from './alarm';


const Timer = () => {
    //Hooks approach ................................................................
    const [time, setTime] = React.useState(0);
    const [timerOn, setTimeOn] = React.useState(false);
    const [isActive, setActive] = React.useState(false);
    
    //Uses an interval that can be modified with the setinterval method inside this method 
    //one can define the conditions mo modify the given interval. With the method clearInterval, 
    //the given interval is stoped. However, because of the hooks it is not reset as in a normal use.
    React.useEffect(() => {
        let interval = null;

        if(timerOn){ //Timer starts
        interval = setInterval(() => {
            setTime(prevTime => prevTime + 10);
        }, 10);
        }else{ //Timer stops
            clearInterval(interval);
        }

        return () => clearInterval(interval); // to avoid memory leaks
    }, [timerOn]); //runs every time the variable timeOn changes


    //Functions for the animation of the clock .........................................
    const toggleClass = () => {
        setActive(true);
    };

    const negativeToggleClass = () => {
        setActive(false);
    };

    //Set Limit Logic ..................................................................
    const [buttonTriger, setButtonTrigger] = React.useState(false);
    
    const [limit, setLimit] = React.useState(0);
    //console.log("Starter limit: ", limit);
    
    const handleChange = (event) => {
        setLimit(event.target.value);
        //console.log("New given limit", limit);
    };
    
    const minutesSelect = [];
    for(let minSel=0; minSel<61; minSel++){
        minutesSelect.push(<option value={minSel}>{minSel}</option>);
    }

    //In case, an option has been selected from the Selection Box, 
    //an alarm will be triggered
    if(limit !== 0){
        //console.log('Current limit is ', parseInt(limit,10));
        //console.log('Current time is:',  Math.floor((time/60000)%60));

        if(parseInt(limit,10) === Math.floor((time/60000)%60)){
            return(
                <div onLoad={() => {
                }}>
                <Alarm trigger='true'>
                    <h2>Time's Up!</h2>
                    <h3>Close to Reload</h3>
                </Alarm>
                </div>
            )
            
        }
    }
    

    //Render ------------------------------------------------------------------------------------
    return (
        <div className='Main'>
            <div className='container'>
                {/*Logo will spin if the clock is running*/}
                <img src={logo} id='App-logo' className='App-logo-run' style={{animationPlayState: isActive? 'running':'paused' }} alt="logo" />

                {/*Select Box, it will display the 60 minutes as options to be set*/}
                <br></br>
                <button id='actionButton' className='setTimer' onClick={() => {
                    setButtonTrigger(true);
                }}>Set Timer</button>
                <br></br>


                
                {/*Timer and its action buttons*/}
                <div className='timer_container'>
                    <h1>
                        <span>{("0" + Math.floor((time/60000)%60)).slice(-2)} :</span> {/*minutes*/}
                        <span>{("0" + Math.floor((time/1000)%60)).slice(-2)}</span> {/*seconds*/}
                        {/* <span>{("0" + ((time/10)%100)).slice(-2)}</span> */}{/*miliseconds*/}
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
                </div>{/*End of timer*/}
        </div>{/*End of timer container*/}
            
            {/*Popup message displayed in order to input the expected minutes*/}
            <Popup trigger = {buttonTriger} setTrigger = {setButtonTrigger}>
                <h2>Set the Timer</h2>
                <h3>An alarm will be played when the time is up</h3>
                <label>
                    Minutes:&nbsp;  
                    <select name='Minutes' value={limit} onChange={handleChange}>
                        {minutesSelect}
                    </select>
                </label>
            </Popup>

        </div>           
    )//End of return

}//End of Timer

export default Timer;
