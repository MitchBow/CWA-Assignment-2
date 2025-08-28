'use client';
import React, { useState, useEffect } from 'react';
import { tasks as allTasks, Task } from './tasks';

interface StageManagerProps {
  inCourtroom?: boolean;
}

const StageManager: React.FC<StageManagerProps> = ({ inCourtroom }) => {
  const [stage, setStage] = useState(1);
  const [activeTasks, setActiveTasks] = useState<Task[]>([]);

  useEffect(() => {
    const stageTasks = allTasks.filter(t => t.stage === stage);
    setActiveTasks(stageTasks.map(t => ({ ...t, completed: false })));
  }, [stage]);

  const completeTask = (id: string) => {
    setActiveTasks(prev => prev.map(t => (t.id === id ? { ...t, completed: true } : t)));
  };

  if (inCourtroom) return null;

  return (
    <div
      style={{
        width: '40%',             // make the box 40% of the page width
        margin: '30px auto',      // center horizontally
        padding: '20px',
        borderRadius: '12px',
        backgroundColor: 'var(--header-footer-background)',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
      }}
    >
      <h2 style={{ textAlign: 'center' }}>Stage {stage}</h2>
      <ul>
        {activeTasks.map(task => (
          <li key={task.id} style={{ marginBottom: '10px' }}>
            {task.message}{' '}
            {!task.completed ? (
              <button
                onClick={() => completeTask(task.id)}
                style={{
                  marginLeft: '10px',
                  padding: '4px 8px',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  backgroundColor: 'var(--button-background)',
                  color: 'var(--button-text)',
                }}
              >
                Done
              </button>
            ) : (
              <span style={{ color: 'green', marginLeft: '10px' }}>✔ Completed</span>
            )}
          </li>
        ))}
      </ul>

      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        {stage > 1 && (
          <button
            onClick={() => setStage(stage - 1)}
            style={{
              marginRight: '10px',
              padding: '6px 12px',
              borderRadius: '6px',
              cursor: 'pointer',
              backgroundColor: 'var(--button-background)',
              color: 'var(--button-text)',
            }}
          >
            Previous Stage
          </button>
        )}
        <button
          onClick={() => setStage(stage + 1)}
          style={{
            padding: '6px 12px',
            borderRadius: '6px',
            cursor: 'pointer',
            backgroundColor: 'var(--button-background)',
            color: 'var(--button-text)',
          }}
        >
          Next Stage
        </button>
      </div>
    </div>
  );
};

export default StageManager;
