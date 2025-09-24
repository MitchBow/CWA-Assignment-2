'use client';
import React, { useState, useEffect } from 'react';
import { Task } from './tasks';

interface StageManagerProps {
  inCourtroom?: boolean;
}

//this code was heavily assisted in being writen through chatGTP, as they made all the stages
// Broken HTML snippets for each stage
const stageCode: Record<number, string> = {
  1: `
<html>
  <head>
    <title>My Page<title>
  </head>
  <body>
    <h1>Welcome to my site
    <p>This is a paragraph
  </body>
</html>
  `.trim(),

  2: `
<html>
  <head>
    <style>h1 { color: red; }</style>
  </head>
  <body>
    <img src="logo.png">
    <ul>
      <li>Item 1
      <li>Item 2
    </ul>
  </body>
</html>
  `.trim(),

  3: `
<html>
  <body>
    <form>
      <input name="username">
      <input name="email">
    </form>
  </body>
</html>
  `.trim(),

  4: `
<html>
  <body>
    <div>
      <input type="text" name="firstName">
    </div>
    <div>
      <input type="text" name="lastName">
    </div>
    <div>Footer text here</div>
  </body>
</html>
  `.trim(),

  5: `
<html>
  <head>
    <title>Advanced Page</title>
  </head>
  <body>
    <p>5 > 3 & 2 < 4</p>
    <!-- Missing charset meta -->
  </body>
</html>
  `.trim(),
};

// Tasks per stage
const stageTasks: Record<number, string[]> = {
  1: ['Fix malformed <title>', 'Close <h1> tag', 'Close <p> tag'],
  2: ['Add alt attribute to <img>', 'Close <li> tags', 'Link external stylesheet'],
  3: ['Add required to inputs', 'Set type="email" for email input', 'Add form action'],
  4: ['Add labels for inputs', 'Use semantic tags', 'Add lang="en" to <html>'],
  5: ['Add unit test function', 'Escape special characters', 'Add meta charset tag'],
};

// Hints for each stage/task
const stageHints: Record<number, Record<string, string>> = {
  1: {
    'Fix malformed <title>': 'Remember to add a proper closing </title> tag.',
    'Close <h1> tag': 'Headings should always have an opening and closing tag.',
    'Close <p> tag': 'Paragraphs need </p> to close correctly.',
  },
  2: {
    'Add alt attribute to <img>': 'Images need alt="description" for accessibility.',
    'Close <li> tags': 'Each <li> should be closed with </li>.',
    'Link external stylesheet': 'Use <link rel="stylesheet" href="style.css"> instead of <style>.',
  },
  3: {
    'Add required to inputs': 'Try adding required inside <input>.',
    'Set type="email" for email input': 'Use type="email" so browsers validate the field.',
    'Add form action': 'Forms should have an action, like action="/submit".',
  },
  4: {
    'Add labels for inputs': 'Wrap inputs with <label> or use <label for="id">.',
    'Use semantic tags': 'Replace <div> for page areas with <header>, <footer>, etc.',
    'Add lang="en" to <html>': 'The <html> tag should have lang="en".',
  },
  5: {
    'Add unit test function': 'Try writing a simple function test() {} or describe() block.',
    'Escape special characters': 'Replace < with &lt;, > with &gt;, & with &amp;.',
    'Add meta charset tag': 'Inside <head>, add <meta charset="UTF-8">.',
  },
};

// Validation checks
const stageChecks: Record<number, Record<string, (code: string) => boolean>> = {
  1: {
    'Fix malformed <title>': code => !code.includes('<title>My Page<title>'),
    'Close <h1> tag': code => code.includes('</h1>'),
    'Close <p> tag': code => code.includes('</p>'),
  },
  2: {
    'Add alt attribute to <img>': code => code.includes('alt='),
    'Close <li> tags': code => code.includes('</li>'),
    'Link external stylesheet': code => code.includes('<link rel="stylesheet"'),
  },
  3: {
    'Add required to inputs': code => code.includes('required'),
    'Set type="email" for email input': code => code.includes('type="email"'),
    'Add form action': code => code.includes('action='),
  },
  4: {
    'Add labels for inputs': code => code.includes('<label'),
    'Use semantic tags': code => code.includes('<header>') || code.includes('<footer>'),
    'Add lang="en" to <html>': code => code.includes('<html lang="en"'),
  },
  5: {
    'Add unit test function': code => code.includes('function test(') || code.includes('describe('),
    'Escape special characters': code => code.includes('&lt;') && code.includes('&gt;'),
    'Add meta charset tag': code => code.includes('<meta charset="UTF-8">'),
  },
};

const StageManager: React.FC<StageManagerProps> = ({ inCourtroom }) => {
  const [stage, setStage] = useState(1);
  const [activeTasks, setActiveTasks] = useState<Task[]>([]);
  const [brokenCode, setBrokenCode] = useState<string>('');
  const [hints, setHints] = useState<string[]>([]);

  useEffect(() => {
    // Load tasks for current stage
    const tasks = stageTasks[stage].map((t, i) => ({
      id: `${stage}-${i}`,
      stage,
      message: t,
      completed: false,
    }));
    setActiveTasks(tasks);

    // Load broken HTML for this stage
    setBrokenCode(stageCode[stage] || '');
    setHints([]); // reset hints when stage changes
  }, [stage]);

  const runCheck = () => {
    if (!stageChecks[stage]) return;

    setActiveTasks(prev =>
      prev.map(task => {
        const checkFn = stageChecks[stage][task.message];
        if (checkFn && checkFn(brokenCode)) {
          return { ...task, completed: true };
        }
        return { ...task, completed: false };
      })
    );
  };

  const showHint = (taskMessage: string) => {
    const hint = stageHints[stage][taskMessage];
    if (hint && !hints.includes(hint)) {
      setHints(prev => [...prev, hint]);
    }
  };

  if (inCourtroom) return null;

  return (
    <div
      style={{
        display: 'flex',
        width: '90%',
        margin: '30px auto',
        gap: '20px',
      }}
    >
      {/* Left Side: Task List */}
      <div
        style={{
          flex: 1,
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
              {task.completed ? (
                <span style={{ color: 'green', marginLeft: '10px' }}>
                  ✔ Completed
                </span>
              ) : (
                <>
                  <span style={{ color: 'red', marginLeft: '10px' }}>
                    ✘ Not fixed
                  </span>
                  <button
                    onClick={() => showHint(task.message)}
                    style={{
                      marginLeft: '10px',
                      padding: '2px 6px',
                      borderRadius: '4px',
                      fontSize: '12px',
                      cursor: 'pointer',
                      backgroundColor: '#444',
                      color: '#fff',
                    }}
                  >
                    Hint
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>

        {/* Show hints under the task list */}
        {hints.length > 0 && (
          <div
            style={{
              marginTop: '15px',
              padding: '10px',
              borderRadius: '6px',
              backgroundColor: '#f1f1f1',
              color: '#333',
              fontSize: '14px',
            }}
          >
            <strong>Hints:</strong>
            <ul>
              {hints.map((hint, idx) => (
                <li key={idx}>{hint}</li>
              ))}
            </ul>
          </div>
        )}

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
          {stage < 5 && (
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
          )}
        </div>
      </div>

      {/* Right Side: Code Editor */}
      <div
        style={{
          flex: 2,
          padding: '20px',
          borderRadius: '12px',
          backgroundColor: '#1e1e1e',
          color: '#dcdcdc',
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        }}
      >
        <h2 style={{ textAlign: 'center' }}>Fix the Code</h2>
        <textarea
          value={brokenCode}
          onChange={e => setBrokenCode(e.target.value)}
          style={{
            width: '100%',
            height: '250px',
            borderRadius: '8px',
            padding: '10px',
            fontFamily: 'monospace',
            fontSize: '14px',
            backgroundColor: '#252526',
            color: '#dcdcdc',
            border: '1px solid #333',
          }}
        />
        <div style={{ marginTop: '15px', textAlign: 'center' }}>
          <button
            onClick={runCheck}
            style={{
              padding: '8px 16px',
              borderRadius: '6px',
              cursor: 'pointer',
              backgroundColor: 'var(--button-background)',
              color: 'var(--button-text)',
            }}
          >
            Run Check
          </button>
        </div>
      </div>
    </div>
  );
};

export default StageManager;
