import { useEffect, useRef, useState } from "react";
import React from "react";
import './../styles/App.css';

const LapTimer = () => {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [laps, setLaps] = useState([]);
  const intervalRef = useRef(null);

  useEffect(()=>{
    if(running){
      intervalRef.current = setInterval(()=>{
        setTime(prevTime => prevTime+10);
      }, 10);
    }
    return () =>clearInterval(intervalRef.current);
  }, [running]);

  const startTimer = ()=>{
    setRunning(true);
  }
  
  const stopTimer = ()=>{
    setRunning(false);
  }
  
  const addLap = () =>{
    setLaps([...laps, time]);
  }

  const resetTimer = () =>{
    setTime(0);
    setLaps([]);
  }

  const formatTime = timeInMs => {
    const date = new Date(timeInMs);
    const minutes = date.getUTCMinutes().toString().padStart(2, "0");
    const seconds = date.getUTCSeconds().toString().padStart(2, "0");
    const milliseconds = Math.floor(date.getUTCMilliseconds() / 10)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}.${milliseconds}`;
  };

  return (
    <div>
    <h1>{formatTime(time)}</h1>
    <button onClick={startTimer}>Start</button>
    <button onClick={stopTimer}>Stop</button>
    <button onClick={addLap}>Lap</button>
    <button onClick={resetTimer}>Reset</button>
    <ul>
      {laps.map((lap, index) => (
        <li key={index}>{formatTime(lap)}</li>
      ))}
    </ul>
  </div>
);
}

export default LapTimer;