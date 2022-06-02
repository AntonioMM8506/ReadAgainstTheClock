import React from "react";
import './alarm.css';
import alarm from './img/alarm.png';
import ringer from './sound/alarm_sound1.mp3'

function Alarm( props ) {

    //For playing an audio
    const audio = new Audio(ringer);
    audio.loop = true;

    function refreshPage() {
        setTimeout(function(){
            window.location.reload(true);
        }, 50000);
    }

    return (props.trigger) ? (

        <div className="popupAlarm" >
            <div className="popupAlarm-inner" onLoad={ () => { 
            audio.loop = true;
            audio.play(); 
            refreshPage();
            }}>
                <img src={alarm} id='alarmLogo' alt="logo"  />
                <button className="close-btn" onClick={ () =>  window.location.reload() }>Close</button>
                {props.children}
            </div>
        </div>
    ) : "";
}//End of Popup

export default Alarm;