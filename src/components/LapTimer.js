import { useEffect, useRef, useState } from "react";
import React from "react";
import './../styles/App.css';

const LapTimer = () => {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [laps, setLaps] = useState([]);
  const intervalRef = useRef();

  useEffect(()=>{
    if(running){
      intervalRef.current = setInterval(()=>{
        setTime(prevTime => prevTime+10);
      }, 10);
    }
    return ()=>clearInterval(intervalRef.current);
  }, [running]);

  const startTimer = ()=>setRunning(true);

  const stopTimer = ()=>setRunning(false);

  const resetTimer = () =>{
    setTime(0);
    setRunning(false);
    setLaps([]);
  }

  const addLap = () =>{
    setLaps(prev =>[...prevLaps, time]);
  }
  return (
    <div>
      <h1>Lap Timer</h1>
      <div>TIme : {time} </div>
      {!running && <button onClick={startTimer}>Start</button>}
      {running && <button onClick={stopTimer}>Stop</button>}

      <button onClick={addLap}>Lap</button>
      <button onClick={resetTimer}>Reset</button>
      
        {laps.length > 0 && (
          <div>
            <h2>Laps</h2>
            {laps.map((lapTime, index)=>{
              <div key={key}>Lap {index + 1}: {lapTime}</div>
            })}
        </div>
        )}
    </div>
  )
}

export default LapTimer;
