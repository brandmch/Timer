import "./App.css";
import React, { useState } from "react";

function App() {
  const [timerObj, setTimeObj] = useState({
    breakLength: 5,
    sessionLength: 25,
    sessionTimer: 25,
  });

  const increase = (item) => {
    if (timerObj[item] < 60) {
      let tempObj = { ...timerObj };
      tempObj[item] += 1;
      setTimeObj(tempObj);
    }
  };

  const decrease = (item) => {
    if (timerObj[item] > 0) {
      let tempObj = { ...timerObj };
      tempObj[item] -= 1;
      setTimeObj(tempObj);
    }
  };

  return (
    <div className="App">
      <h1>Break Length</h1>
      <div className="scene">
        <button onClick={() => increase("breakLength")}>^</button>
        <h2>{timerObj.breakLength}</h2>
        <button onClick={() => decrease("breakLength")}>v</button>
      </div>
      <h1>Session Length</h1>
      <div className="scene">
        <button onClick={() => increase("sessionLength")}>^</button>
        <h2>{timerObj.sessionLength}</h2>
        <button onClick={() => decrease("sessionLength")}>v</button>
      </div>
      <h1>Session</h1>
      <h2>{timerObj.sessionTimer}</h2>
    </div>
  );
}

export default App;
