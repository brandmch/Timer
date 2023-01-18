import "./App.css";
import React, { useState } from "react";

function App() {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [sessionTimer, setSessionTimer] = useState(25);

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

  return (
    <div className="App">
      <h1>Break Length</h1>
      <div className="scene">
        <button onClick={() => increase(breakLength, setBreakLength)}>^</button>
        <h2>{breakLength}</h2>
        <button onClick={() => decrease(breakLength, setBreakLength)}>v</button>
      </div>
      <h1>Session Length</h1>
      <div className="scene">
        <button onClick={() => increase(sessionLength, setSessionLength)}>
          ^
        </button>
        <h2>{sessionLength}</h2>
        <button onClick={() => decrease(sessionLength, setSessionLength)}>
          v
        </button>
      </div>
      <h1>Session</h1>
      <h2>{sessionTimer}</h2>
    </div>
  );
}

export default App;
