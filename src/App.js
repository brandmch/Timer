import "./App.css";
import React, { useState, useEffect } from "react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

function App() {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(5);
  const [sessionTimer, setSessionTimer] = useState({
    minutes: sessionLength,
    seconds: 0,
  });
  const [isRunning, setIsRunning] = useState(false);
  const [onBreak, setOnBreak] = useState(false);

  const timerToggle = () => {
    setIsRunning(!isRunning);
  };

  useEffect(() => {
    let interval = null;
    if (isRunning) {
      interval = setInterval(() => {
        let { minutes, seconds } = sessionTimer;
        seconds = seconds - 1;
        if (seconds < 0) {
          minutes = minutes - 1;
          seconds = 59;
        }
        if (seconds === 0 && minutes === 0) {
          if (!onBreak) {
            minutes = breakLength;
            seconds = 0;
            setOnBreak(true);
          } else {
            minutes = sessionLength;
            seconds = 0;
            setOnBreak(false);
          }
        }
        setSessionTimer({ minutes: minutes, seconds: seconds });
      }, 100);
    } else if (!isRunning && sessionTimer !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning, sessionTimer]);

  return (
    <div className="App">
      <div className="adjustment-container">
        <div className="break-length-container flex">
          <h2>Break Length</h2>
          <div className="adjustment-container">
            <FaArrowUp onClick={() => setBreakLength(breakLength + 1)} />
            <h2>{breakLength}</h2>
            <FaArrowDown onClick={() => setBreakLength(breakLength - 1)} />
          </div>
        </div>
        <div className="session-length-container flex">
          <h2>Session Length</h2>
          <div className="adjustment-container">
            <FaArrowUp
              onClick={() => {
                setSessionLength(sessionLength + 1);
                setSessionTimer({ minutes: sessionLength + 1, seconds: 0 });
                setIsRunning(false);
              }}
            />
            <h2>{sessionLength}</h2>
            <FaArrowDown
              onClick={() => {
                setSessionLength(sessionLength - 1);
                setSessionTimer({ minutes: sessionLength - 1, seconds: 0 });
                setIsRunning(false);
              }}
            />
          </div>
        </div>
      </div>
      <h1>Session</h1>
      {onBreak && <h1>ON BREAK!</h1>}
      <h2>
        {sessionTimer.minutes}:{sessionTimer.seconds < 10 ? "0" : ""}
        {sessionTimer.seconds}
      </h2>
      <button onClick={timerToggle}>START</button>
      <button
        onClick={() => {
          setSessionTimer({ minutes: sessionLength, seconds: 0 });
          setIsRunning(false);
        }}
      >
        RESET
      </button>
    </div>
  );
}

export default App;
