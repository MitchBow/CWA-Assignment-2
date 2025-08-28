'use client';
import React, { useState } from 'react';

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

interface TaskListProps {
  stage: number;
}

const TaskList: React.FC<TaskListProps> = ({ stage }) => {
  // define tasks for each stage
  const stageTasks: Record<number, Task[]> = {
    1: [
      { id: 1, text: 'Review case documents', completed: false },
      { id: 2, text: 'Confirm courtroom availability', completed: false },
    ],
    2: [
      { id: 3, text: 'Prepare witness questions', completed: false },
      { id: 4, text: 'Test audio/video equipment', completed: false },
    ],
    3: [
      { id: 5, text: 'Present opening statements', completed: false },
      { id: 6, text: 'Examine key witnesses', completed: false },
      { id: 7, text: 'Submit evidence to judge', completed: false },
    ],
  };

  const [tasks, setTasks] = useState<Task[]>(stageTasks[stage] || []);

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  return (
    <div style={{ marginTop: '20px', padding: '15px', borderRadius: '12px', background: 'var(--header-footer-background)' }}>
      <h3>Stage {stage} Tasks</h3>
      {tasks.length === 0 ? (
        <p>No tasks for this stage.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {tasks.map(task => (
            <li
              key={task.id}
              onClick={() => toggleTask(task.id)}
              style={{
                padding: '8px',
                margin: '5px 0',
                borderRadius: '8px',
                cursor: 'pointer',
                background: task.completed ? '#4CAF50' : '#e0e0e0',
                color: task.completed ? 'white' : 'black',
                transition: '0.3s',
              }}
            >
              {task.completed ? `✓ ${task.text}` : task.text}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;
