'use client';
import React, { useState, useEffect } from 'react';

interface ManualTimerProps {
  initialSeconds?: number;
}

const ManualTimer: React.FC<ManualTimerProps> = ({ initialSeconds = 0 }) => {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRunning) {
      timer = setInterval(() => {
        setSeconds(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning]);

  const startTimer = () => setIsRunning(true);
  const stopTimer = () => setIsRunning(false);
  const resetTimer = () => {
    setSeconds(initialSeconds);
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
        margin: '50px auto 30px auto', // top margin increased for spacing from header
        padding: '20px',
        backgroundColor: 'var(--header-footer-background)',
        borderRadius: '12px',
        width: '250px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
      }}
    >
      <h2 style={{ marginBottom: '15px' }}>Manual Timer</h2>
      <p style={{ fontSize: '2rem', margin: '10px 0' }}>{formatTime(seconds)}</p>
      <div>
        <button onClick={startTimer} style={{ margin: '0 5px', padding: '8px 12px' }}>Start</button>
        <button onClick={stopTimer} style={{ margin: '0 5px', padding: '8px 12px' }}>Stop</button>
        <button onClick={resetTimer} style={{ margin: '0 5px', padding: '8px 12px' }}>Reset</button>
      </div>
    </div>
  );
};

export default ManualTimer;
