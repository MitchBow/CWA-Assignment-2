'use client';
import React, { useState, useEffect } from 'react';

const ManualTimer: React.FC = () => {
  const [seconds, setSeconds] = useState(0);        // current countdown value
  const [inputMinutes, setInputMinutes] = useState(1); // user input for minutes
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRunning && seconds > 0) {
      timer = setInterval(() => {
        setSeconds(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            setIsRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning, seconds]);

  const startTimer = () => {
    if (seconds > 0) setIsRunning(true);
  };

  const stopTimer = () => setIsRunning(false);

  const resetTimer = () => {
    setSeconds(inputMinutes * 60);
    setIsRunning(false);
  };

  const setTimer = () => {
    setSeconds(inputMinutes * 60);
    setIsRunning(false);
  };

  const formatTime = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const secs = sec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div
      style={{
        textAlign: 'center',
        margin: '50px auto 30px auto',
        padding: '20px',
        backgroundColor: 'var(--header-footer-background)',
        borderRadius: '12px',
        width: '280px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
      }}
    >
      <h2 style={{ marginBottom: '15px' }}>Countdown Timer</h2>

      {/* Input to set minutes */}
      <div style={{ marginBottom: '15px' }}>
        <input
          type="number"
          min="0"
          value={inputMinutes}
          onChange={(e) => setInputMinutes(Number(e.target.value))}
          style={{
            width: '60px',
            padding: '5px',
            textAlign: 'center',
            marginRight: '10px',
          }}
        />
        <span>minutes</span>
        <button
          onClick={setTimer}
          style={{ marginLeft: '10px', padding: '5px 10px' }}
        >
          Set
        </button>
      </div>

      {/* Timer display */}
      <p style={{ fontSize: '2rem', margin: '10px 0' }}>{formatTime(seconds)}</p>

      {/* Controls */}
      <div>
        <button onClick={startTimer} style={{ margin: '0 5px', padding: '8px 12px' }}>Start</button>
        <button onClick={stopTimer} style={{ margin: '0 5px', padding: '8px 12px' }}>Stop</button>
        <button onClick={resetTimer} style={{ margin: '0 5px', padding: '8px 12px' }}>Reset</button>
      </div>
    </div>
  );
};

export default ManualTimer;
