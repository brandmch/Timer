import "./App.css";
import React, { useState, useEffect } from "react";
import {
  FaArrowUp,
  FaArrowDown,
  FaPlay,
  FaPause,
  FaRedo,
} from "react-icons/fa";

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
      <div className="stopwatch">
        <div className="adjustment-container">
          <div className="break-length-container flex border">
            <h2>Break Length</h2>
            <div className="adjustment-container">
              <div className="white">
                <FaArrowUp
                  className="fa"
                  onClick={() => setBreakLength(breakLength + 1)}
                />
                <h1>{breakLength}</h1>
                <FaArrowDown
                  className="fa"
                  onClick={() => setBreakLength(breakLength - 1)}
                />
              </div>
            </div>
          </div>
          <div className="session-length-container flex border">
            <h2>Session Length</h2>
            <div className="adjustment-container">
              <div className="white">
                <FaArrowUp
                  className="fa"
                  onClick={() => {
                    setSessionLength(sessionLength + 1);
                    setSessionTimer({ minutes: sessionLength + 1, seconds: 0 });
                    setIsRunning(false);
                  }}
                />
                <h1>{sessionLength}</h1>
                <FaArrowDown
                  className="fa"
                  onClick={() => {
                    setSessionLength(sessionLength - 1);
                    setSessionTimer({ minutes: sessionLength - 1, seconds: 0 });
                    setIsRunning(false);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="timer-container border">
          <h1>Session</h1>
          {onBreak && <h1>ON BREAK!</h1>}
          <h1 className="timer">
            {sessionTimer.minutes}:{sessionTimer.seconds < 10 ? "0" : ""}
            {sessionTimer.seconds}
          </h1>
          <div onClick={timerToggle} className="start-stop">
            <FaPlay className="fa" />
            <FaPause className="fa" />
          </div>
          <FaRedo
            className="fa"
            onClick={() => {
              setSessionTimer({ minutes: sessionLength, seconds: 0 });
              setIsRunning(false);
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
