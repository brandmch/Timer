import "./App.css";
import React, { useState, useEffect } from "react";

function App() {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(5);
  const [sessionTimer, setSessionTimer] = useState({
    minutes: sessionLength,
    seconds: 0,
  });
  const [isRunning, setIsRunning] = useState(false);

  const increase = (state, setState) => {
    if (state < 60) {
      setState(state + 1);
    }
  };

  const decrease = (state, setState) => {
    if (state > 0) {
      setState(state - 1);
    }
  };

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
          setIsRunning(false);
        }
        setSessionTimer({ minutes: minutes, seconds: seconds });
      }, 1000);
    } else if (!isRunning && sessionTimer !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning, sessionTimer]);

  return (
    <div className="App">
      <h1>Break Length</h1>
      <div className="scene">
        <button onClick={() => setBreakLength(breakLength + 1)}>^</button>
        <h2>{breakLength}</h2>
        <button onClick={() => setBreakLength(breakLength - 1)}>v</button>
      </div>
      <h1>Session Length</h1>
      <div className="scene">
        <button
          onClick={() => {
            setSessionLength(sessionLength + 1);
            setSessionTimer({ minutes: sessionLength + 1, seconds: 0 });
            setIsRunning(false);
          }}
        >
          ^
        </button>
        <h2>{sessionLength}</h2>
        <button
          onClick={() => {
            setSessionLength(sessionLength - 1);
            setSessionTimer({ minutes: sessionLength - 1, seconds: 0 });
            setIsRunning(false);
          }}
        >
          v
        </button>
      </div>
      <h1>Session</h1>
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
