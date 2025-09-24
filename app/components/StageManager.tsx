'use client';
import React, { useState, useEffect } from 'react';
import { Task } from './tasks';
import { stages as baseStages, StageData } from './Stages';
import StageEditor from './StageEditor';

interface StageManagerProps {
  inCourtroom?: boolean;
}

//this code was created with AI assistance

const StageManager: React.FC<StageManagerProps> = ({ inCourtroom }) => {
  const [stage, setStage] = useState(1);
  const [allStages, setAllStages] = useState<Record<number, StageData>>(baseStages);
  const [activeTasks, setActiveTasks] = useState<Task[]>([]);
  const [brokenCode, setBrokenCode] = useState<string>('');
  const [hints, setHints] = useState<string[]>([]);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const stageData = allStages[stage];
    if (!stageData) return;

    setActiveTasks(stageData.tasks.map((t, i) => ({ id: `${stage}-${i}`, stage, message: t, completed: false })));
    setBrokenCode(stageData.code);
    setHints([]);
  }, [stage, allStages]);

  const runCheck = () => {
    const stageData = allStages[stage];
    if (!stageData) return;

    setActiveTasks(prev =>
      prev.map(task => {
        const checkFn = stageData.checks[task.message];
        return checkFn && checkFn(brokenCode) ? { ...task, completed: true } : { ...task, completed: false };
      })
    );
  };

  const showHint = (taskMessage: string) => {
    const stageData = allStages[stage];
    const hint = stageData.hints[taskMessage];
    if (hint && !hints.includes(hint)) setHints(prev => [...prev, hint]);
  };

  const addNewStage = () => {
    const newStageNum = Math.max(...Object.keys(allStages).map(Number)) + 1;
    setAllStages(prev => ({
      ...prev,
      [newStageNum]: {
        code: `<html><body><!-- New custom stage --></body></html>`,
        tasks: ['Example Task 1', 'Example Task 2'],
        hints: { 'Example Task 1': 'Sample hint 1', 'Example Task 2': 'Sample hint 2' },
        checks: { 'Example Task 1': code => code.includes('<!--'), 'Example Task 2': code => code.includes('</html>') },
      },
    }));
    setStage(newStageNum);
  };

  const removeStage = () => {
    if (!(stage in allStages)) return;
    const updatedStages = { ...allStages };
    delete updatedStages[stage];
    setAllStages(updatedStages);

    const remainingStages = Object.keys(updatedStages).map(Number).sort((a, b) => a - b);
    setStage(remainingStages[0] || 1);
  };

  if (inCourtroom) return null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '90%', margin: '30px auto', gap: '20px' }}>
      {/* Stage Controls */}
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <button onClick={() => setStage(stage - 1)} disabled={stage <= Math.min(...Object.keys(allStages).map(Number))}>Previous Stage</button>
        <button onClick={() => setStage(stage + 1)} disabled={stage >= Math.max(...Object.keys(allStages).map(Number))}>Next Stage</button>
        <button onClick={addNewStage} style={{ backgroundColor: 'green', color: 'white' }}>➕ Add New Stage</button>
        <button onClick={removeStage} style={{ backgroundColor: 'red', color: 'white' }}>🗑 Remove Stage</button>
        <button onClick={() => setEditing(!editing)} style={{ backgroundColor: '#555', color: 'white' }}>{editing ? 'Close Editor' : '✏️ Edit Stage'}</button>
      </div>

      {/* Task List & Code Editor */}
      <div style={{ display: 'flex', gap: '20px' }}>
        {/* Left Side: Tasks */}
        <div style={{ flex: 1, padding: '20px', borderRadius: '12px', backgroundColor: 'var(--header-footer-background)' }}>
          <h2>Stage {stage}</h2>
          <ul>
            {activeTasks.map(task => (
              <li key={task.id}>
                {task.message} {task.completed ? '✔' : '✘'}
                {!task.completed && <button onClick={() => showHint(task.message)}>Hint</button>}
              </li>
            ))}
          </ul>
          {hints.length > 0 && (
            <div>
              <strong>Hints:</strong>
              <ul>{hints.map((hint, i) => <li key={i}>{hint}</li>)}</ul>
            </div>
          )}
        </div>

        {/* Right Side: Code Editor */}
        <div style={{ flex: 2, padding: '20px', borderRadius: '12px', backgroundColor: '#1e1e1e', color: '#dcdcdc' }}>
          <h2>Fix the Code</h2>
          <textarea
            value={brokenCode}
            onChange={e => setBrokenCode(e.target.value)}
            style={{ width: '100%', height: '250px', fontFamily: 'monospace', fontSize: '14px', borderRadius: '8px', padding: '10px' }}
          />
          <div style={{ marginTop: '10px' }}>
            <button onClick={runCheck}>Run Check</button>
          </div>
        </div>
      </div>

      {/* Stage Editor */}
      {editing && <StageEditor stage={stage} allStages={allStages} setAllStages={setAllStages} />}
    </div>
  );
};

export default StageManager;
