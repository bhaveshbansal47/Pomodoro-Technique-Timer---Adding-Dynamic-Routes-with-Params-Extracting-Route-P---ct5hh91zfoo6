"use client";
import { useRef, useState } from "react";

const App = () => {
  const workTimeRef = useRef(null);
  const breakTimeRef = useRef(null);
  const [currentTime, setCurrentTime] = useState({
    minute: 25,
    second: 0,
  });
  const [isWorkTime, setIsWorkTime] = useState(true);
  const intervalRef = useRef(null);
  const startTime = () => {
    intervalRef.current = setInterval(() => {
      setCurrentTime((prevCurrentTime) => {
        console.log(prevCurrentTime)
        if (prevCurrentTime.minute === 0 && prevCurrentTime.second === 0) {
          let isWorkTimeNew = isWorkTimeNew || isWorkTime
          setIsWorkTime((prev) => {
            isWorkTimeNew = prev
            return !prev
          });
          alert(`${isWorkTime ? "work" : "break"} is over`);
          return {
            minute: (isWorkTime ? breakTimeRef : workTimeRef).current.value,
            second: 0,
          };
        } else {
          return {
            minute:
              prevCurrentTime.second === 0
                ? prevCurrentTime.minute - 1
                : prevCurrentTime.minute,
            second:
              prevCurrentTime.second === 0 ? 59 : prevCurrentTime.second - 1,
          };
        }
      });
    }, 1000);
  };

  const stopTime = () => {
    clearInterval(intervalRef.current);
  };

  const resetTime = () => {
    setCurrentTime({
      minute: 25,
      second: 0,
    });
    workTimeRef.current.value = 25;
    breakTimeRef.current.value = 5;
    setIsWorkTime(true);
    stopTime();
  };

  const setTime = () => {
    setCurrentTime({
      minute: workTimeRef.current.value,
      second: 0,
    });
  };
  return (
    <div
      id="main"
      style={{
        textAlign: "center",
      }}
    >
      <h1>
        {String(currentTime.minute).padStart(2, "0")}:
        {String(currentTime.second).padStart(2, "0")}
      </h1>
      <h3>{isWorkTime ? "Work-Time" : "Break-Time"}</h3>
      <div>
        <button onClick={startTime}>start</button>
        <button onClick={stopTime}>stop</button>
        <button onClick={resetTime}>reset</button>
      </div>
      <div
        style={{
          marginTop: 30,
        }}
      >
        <input defaultValue={25} ref={workTimeRef} type="number" />
        <input defaultValue={5} ref={breakTimeRef} type="number" />
        <button onClick={setTime}>set</button>
      </div>
    </div>
  );
};

export default App;
