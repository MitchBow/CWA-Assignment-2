'use client';
import React, { useState, useEffect } from 'react';
import TaskList from './TaskList';

interface StageManagerProps {
  triggerCourtroom?: () => void; // injected from CourtroomBackground
}

const StageManager: React.FC<StageManagerProps> = ({ triggerCourtroom }) => {
  const [stage, setStage] = useState(1);
  const [taskFailed, setTaskFailed] = useState(false);

  // Example: simulate a failed task after 15 seconds of stage 1
  useEffect(() => {
    if (stage === 1 && !taskFailed) {
      const timer = setTimeout(() => {
        setTaskFailed(true);
        if (triggerCourtroom) triggerCourtroom(); // swap to courtroom
      }, 15000);

      return () => clearTimeout(timer);
    }
  }, [stage, taskFailed, triggerCourtroom]);

  return (
    <div style={{ borderRadius: '12px', padding: '20px' }}>
      <h2>Stage {stage}</h2>
      <p>This is where stage {stage} tasks/messages will appear.</p>

      <TaskList stage={stage} />

      <div style={{ marginTop: '20px' }}>
        <button
          onClick={() => {
            setStage(stage + 1);
            setTaskFailed(false);
          }}
          style={{
            background: 'blue',
            color: 'white',
            padding: '8px 12px',
            borderRadius: '6px',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Next Stage
        </button>
        {stage > 1 && (
          <button
            onClick={() => {
              setStage(stage - 1);
              setTaskFailed(false);
            }}
            style={{
              marginLeft: '10px',
              background: 'blue',
              color: 'white',
              padding: '8px 12px',
              borderRadius: '6px',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Previous Stage
          </button>
        )}
      </div>
    </div>
  );
};

export default StageManager;
