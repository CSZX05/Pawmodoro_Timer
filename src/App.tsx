import React, {useState, useEffect} from 'react';
import './App.css';
import { studyEncouragements, restEncouragements } from './messages';
import { playRandomRingtone } from './sounds';

//These are all the imports from the assets folder
import Down from './assets/Down.png';
import Up from './assets/Up.png';

function App() {
  const [timeLeft, setTimeLeft] = React.useState(25 * 60); // 25 minutes in seconds, Change this part for the time
  const [isRunning, setIsRunning] = React.useState(false);
  const [isBreak, setIsBreak] = React.useState(false);
  const[encouragement, setEncouragement] = React.useState("");
  const[totalStudyTime, setTotalStudyTime] = React.useState(0);
  const[totalRestTime, setTotalRestTime] = React.useState(0);


  useEffect(() => {
    if (!isRunning) return;
  
    const startTime = Date.now();
    const initialTimeLeft = timeLeft;
  
    const timer = setInterval(() => {
      const elapsedSeconds = Math.floor((Date.now() - startTime) / 1000);
      const updatedTimeLeft = Math.max(initialTimeLeft - elapsedSeconds, 0);
  
      setTimeLeft(updatedTimeLeft);
  
      if (isBreak) {
        setTotalRestTime(prev => prev + 1);
      } else {
        setTotalStudyTime(prev => prev + 1);
      }
  
      if (updatedTimeLeft === 0) {
        clearInterval(timer);
      }
    }, 1000);
  
    return () => clearInterval(timer);
  }, [isRunning, isBreak]);

  //When the timer reaches 0, it will play a song
  useEffect(() => {
    if (timeLeft === 0) {
      playRandomRingtone();
      setIsRunning(false);
    }
  }, [timeLeft]);
  
  // Time format to show hours, minutes and seconds
  const formatTime = (seconds: number): string => {
    const h = Math.floor(seconds/3600).toString().padStart(2,'0');
    const m = Math.floor((seconds % 3600) / 60).toString().padStart(2,'0');
    const s = (seconds % 60).toString().padStart(2,'0');

    if(h !== "00"){
      return `${h}:${m}:${s}`;
    }else{
    return `${m}:${s}`;
    }
  };

  //switch between study and rest mode
  const switchMode = (breakMode :boolean) => {
    setIsBreak(breakMode);
    setIsRunning(false);
    setTimeLeft(breakMode ? 5 * 60 : 25 * 60);
  }

  //Encouragement message logic
  useEffect(() => {
    let messageInterval : NodeJS.Timeout;
    if(isRunning && timeLeft > 0) {
      const messages = isBreak ? restEncouragements : studyEncouragements;
      const getRandomMessage = () => messages[Math.floor(Math.random() * messages.length)];

      setEncouragement(getRandomMessage());

      messageInterval = setInterval(() => {
        setEncouragement(getRandomMessage());
      },6000);
    }
    else {
      setEncouragement("");
    }

    return () => clearInterval(messageInterval);
  },[isRunning, isBreak]);

  //handle start button click
  const handleClickStart = () => {
    if(!isRunning && timeLeft > 0)
      setIsRunning(true);
  }
  const handleClickStop = () => {
    if(isRunning)
      setIsRunning(false);
  }
  const handleClickReset = () => {
    setTimeLeft(isBreak ? 5 * 60 : 25 * 60);
  }

  const manageTime = (add: boolean) => {
    const MAX_TIME = 60 * 60;
    const MIN_TIME = 5 * 60; 
    const STEP = 5 * 60;
  
    setTimeLeft(prevTime => {
      if (add && prevTime >= MAX_TIME) {
        return prevTime;
      }
      if (!add && prevTime <= MIN_TIME) {
        return prevTime;
      }
      return add ? Math.min(MAX_TIME, prevTime + STEP) : prevTime - STEP;
    });
  };

  const [mode, setMode] = useState<'study' | 'rest'>('study');

  //main format shown in the ending page
  return (
    <div className = "app-wrapper">
       {/*Must have an overall div wrapping the entire body so that the buttons can be positioned relatively within it*/}

    <div className = "home-content">
      <div className = "home-controls">
      <button 
      className={`image-button ${mode === 'study' ? 'active' : ''}`}
      onClick={() => switchMode(false)}>
      Study
    </button>
    
    <button 
      className={`image-button ${mode === 'rest' ? 'active' : ''}`}
      onClick={() => switchMode(true)}>
      Rest
    </button>
        </div>
    </div>

    <div className = "home-timer-container">
    <h1 className = "home-timer">
      {formatTime(timeLeft)}
    </h1>
    <button className = "add-time-button" onClick= {() => manageTime(true) }> 
    <img src={Up} alt="Add Time" className = "addTime-image"/>
      Add 5 min</button>
    <button className = "remove-time-button" onClick= {() => manageTime(false) }> 
    <img src={Down} alt="Remove Time" className = "removeTime-image"/>
    Remove 5 min</button>
    {/*How onClick={() => manageTime(true)} differs from onClick={manageTime}?
    
    When using onClick={() => manageTime(true)}, the function will only be executed when the onClick() signal is received + the computer will only return a boolean value to the function that we use to define whether time is added or removed.

    When using onClick={manageTime}, the function will be executed immediately without waiting for the onClick() signal + the computer will return all the information of the click to the function instead of just the boolean value that we use to define whether time is added or removed*/}
    

    
    <p className = {`encouragement-text ${!isRunning? "hidden": ""}`}>
      {encouragement}
    </p>
    <button className = "home-button" onClick={handleClickStart}>Start</button>
    <button className = "home-button" onClick={handleClickStop}>Stop</button>
    <button className = "home-button" onClick={handleClickReset}>Reset</button>
    </div>

    <div className = "progress-tracker">
      <h3>Session Progress</h3>
      <p>Study Time: {formatTime(totalStudyTime)}</p>
      <p>Rest Time: {formatTime(totalRestTime)}</p>
      <p>Total Session : {formatTime(totalStudyTime + totalRestTime)}</p>

    </div>

    
    {/*This is the end of the html rendering part, do not delete <div> under here!*/}
    </div>
  );
}

export default App;
