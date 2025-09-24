import React from 'react';
import { StageData } from './Stages';

//this code was created with AI assistance

interface StageEditorProps {
  stage: number;
  allStages: Record<number, StageData>;
  setAllStages: React.Dispatch<React.SetStateAction<Record<number, StageData>>>;
}

const StageEditor: React.FC<StageEditorProps> = ({ stage, allStages, setAllStages }) => {
  const stageData = allStages[stage];

  if (!stageData) return <p>No stage data found.</p>;

  // Update any field of a task
  const updateTask = (index: number, field: string, value: string) => {
    const newStage: StageData = { ...stageData, correctCode: { ...stageData.correctCode } };
    const taskName = newStage.tasks[index];

    if (field === 'task') {
      // Rename task
      newStage.tasks[index] = value;
      newStage.hints[value] = newStage.hints[taskName];
      newStage.checks[value] = newStage.checks[taskName];
      newStage.correctCode![value] = newStage.correctCode![taskName];
      delete newStage.hints[taskName];
      delete newStage.checks[taskName];
      delete newStage.correctCode![taskName];
    } else if (field === 'hint') {
      newStage.hints[taskName] = value;
    } else if (field === 'correct') {
      newStage.correctCode![taskName] = value;
      newStage.checks[taskName] = code => code.includes(value);
    }

    setAllStages(prev => ({ ...prev, [stage]: newStage }));
  };

  // Update the shared broken code for the stage
  const updateBrokenCode = (value: string) => {
    const newStage: StageData = { ...stageData, code: value };
    setAllStages(prev => ({ ...prev, [stage]: newStage }));
  };

  const addTask = () => {
    const newStage: StageData = { ...stageData, correctCode: { ...stageData.correctCode } };
    const newTaskName = `New Task ${newStage.tasks.length + 1}`;
    newStage.tasks.push(newTaskName);
    newStage.hints[newTaskName] = '';
    newStage.checks[newTaskName] = code => false;
    newStage.correctCode![newTaskName] = '';
    setAllStages(prev => ({ ...prev, [stage]: newStage }));
  };

  const removeTask = (index: number) => {
    const newStage: StageData = { ...stageData, correctCode: { ...stageData.correctCode } };
    const taskName = newStage.tasks[index];
    newStage.tasks.splice(index, 1);
    delete newStage.hints[taskName];
    delete newStage.checks[taskName];
    delete newStage.correctCode![taskName];
    setAllStages(prev => ({ ...prev, [stage]: newStage }));
  };

  return (
    <div style={{ padding: '20px', borderRadius: '12px', backgroundColor: '#2b2b2b', color: 'white', marginTop: '20px' }}>
      <h3>Edit Stage {stage}</h3>

      {stageData.tasks.map((task, i) => (
        <div key={i} style={{ marginBottom: '20px', padding: '10px', border: '1px solid #444', borderRadius: '8px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <strong>Task {i + 1}</strong>
            <button onClick={() => removeTask(i)} style={{ backgroundColor: 'red', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Remove Task</button>
          </div>

          <label>
            Task Name:
            <input
              type="text"
              value={task}
              onChange={e => updateTask(i, 'task', e.target.value)}
              style={{ width: '100%', marginBottom: '8px' }}
            />
          </label>

          <label>
            Hint:
            <textarea
              value={stageData.hints[task] || ''}
              onChange={e => updateTask(i, 'hint', e.target.value)}
              style={{ width: '100%', marginBottom: '8px' }}
            />
          </label>

          <label>
            Correct Code Must Include:
            <textarea
              value={stageData.correctCode?.[task] || ''}
              placeholder="Enter snippet the code must include..."
              onChange={e => updateTask(i, 'correct', e.target.value)}
              style={{ width: '100%', marginBottom: '8px' }}
            />
          </label>

          <label>
            Wrong Code Snippet (initial broken code):
            <textarea
              value={stageData.code} // linked across all tasks
              onChange={e => updateBrokenCode(e.target.value)}
              style={{ width: '100%' }}
            />
          </label>
        </div>
      ))}

      <button onClick={addTask} style={{ backgroundColor: 'green', color: 'white', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer' }}>+ Add Task</button>
    </div>
  );
};

export default StageEditor;
