import "./App.css";
import React, { useState, useEffect } from "react";

function App() {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [sessionTimer, setSessionTimer] = useState({ minutes: 1, seconds: 5 });
  const [isRunning, setIsRunning] = useState(false);

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
      <h1>Session</h1>
      <h2>
        {sessionTimer.minutes}:{sessionTimer.seconds < 10 ? "0" : ""}
        {sessionTimer.seconds}
      </h2>
      <button onClick={timerToggle}>START</button>
      <button
        onClick={() => {
          setSessionTimer({ minutes: 0, seconds: 3 });
          setIsRunning(false);
        }}
      >
        RESET
      </button>
    </div>
  );
}

export default App;
