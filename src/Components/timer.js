import logo from './img/clock_logo_3.png';
import * as React from 'react';
import './timer.css';
//mui libraries
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

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
    const [limit, setLimit] = React.useState(0);

    const handleChange = (event) => {
        setLimit(event.target.value);
        console.log(limit);
    };

    //Array for the list of options to  be displayed in the selection box
    const minutesItems = [];
    for(let i=1; i<=60; i++){
        minutesItems.push(<MenuItem value={ i }>{i<10 ? "0"+i : i}</MenuItem>)
    }

    //In case, an option has been selected from the Selection Box, an alarm will be triggered
    if(limit !== 0){
        if(limit === Math.floor((time/60000)%60)){
            alert("it's time");
        }
    }

    //Render ------------------------------------------------------------------------------------
    return (
        <div className='container'>
            {/*Logo will spin if the clock is running*/}
            <img src={logo} id='App-logo' className='App-logo-run' style={{animationPlayState: isActive? 'running':'paused' }} alt="logo" />

            {/*Select Box, it will display the 60 minutes as options to be set*/}
            <Box sx={{ 
                    minWidth: 120,
                    '&:hover': {
                        backgroundColor: 'primary.main',
                        opacity: [0.9, 0.8, 0.7],
                    },
                }}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Set Minute Alert</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={ limit }
                        label="setLimit"
                        onChange={handleChange}
                    >
                    { minutesItems }
                    </Select>
                </FormControl>
            </Box>
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
        </div>

    )//End of return

}//End of Timer

export default Timer;
