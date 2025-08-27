'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [input, setInput] = useState('');
  const [tabs, setTabs] = useState<{ name: string; style: string; content: string }[]>([]);
  const [activeTab, setActiveTab] = useState(0);
  const [newTabName, setNewTabName] = useState('');
  const [newTabStyle, setNewTabStyle] = useState('');

  // Load tabs from localStorage on first load
  useEffect(() => {
    const savedTabs = localStorage.getItem('savedTabs');
    if (savedTabs) {
      const parsed = JSON.parse(savedTabs);
      setTabs(parsed);
      setInput(parsed[0]?.content || '');
      setNewTabName(parsed[0]?.name || '');
      setNewTabStyle(parsed[0]?.style || '');
    }
  }, []);

  // Save tabs to localStorage on any change
  useEffect(() => {
    localStorage.setItem('savedTabs', JSON.stringify(tabs));
  }, [tabs]);

  // Sync active tab data to inputs
  useEffect(() => {
    if (tabs[activeTab]) {
      setInput(tabs[activeTab].content);
      setNewTabName(tabs[activeTab].name);
      setNewTabStyle(tabs[activeTab].style);
    } else {
      setInput('');
      setNewTabName('');
      setNewTabStyle('');
    }
  }, [activeTab, tabs]);


  // HTML output generation
  const outputCode = `
  <!DOCTYPE html>
  <html>
    <head></head>
    <body>
      <div class="tab-buttons" style="margin-bottom: 1rem;">
  ${tabs
    .map((tab, index) => {
      return `      <button onclick="showTab(${index})" style="margin-right: 5px; padding: 0.4rem 0.8rem; cursor: pointer;">${tab.name}</button>`;
    })
    .join('\n')}
      </div>
      <div id="tabContent" class="tab-content" style="border: 1px solid #ccc; padding: 1rem; min-height: 100px;"></div>

      <script>
        const tabData = ${JSON.stringify(
          tabs.map(tab => ({
            content: tab.content,
            style: tab.style
          }))
        )};

        function showTab(index) {
          const data = tabData[index];
          document.getElementById('tabContent').innerHTML = 
            '<div style="' + data.style + '">' + data.content.replace(/\\n/g, '<br>') + '</div>';
        }

        if (tabData.length > 0) {
          showTab(0);
        }
      </script>
    </body>
  </html>
  `.trim();



  // Copy to clipboard handler
  const copyToClipboard = () => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(outputCode)
        .then(() => alert('Code copied to clipboard!'))
        .catch(() => alert('Failed to copy!'));
    } else {
      try {
        const textArea = document.createElement('textarea');
        textArea.value = outputCode;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        alert('Code copied to clipboard!');
      } catch {
        alert('Failed to copy!');
      }
    }
  };

  // Add new tab
  const addTab = () => {
    if (!newTabName.trim()) return;
    const newTabs = [
      ...tabs,
      { name: newTabName.trim(), style: newTabStyle.trim(), content: input }
    ];
    setTabs(newTabs);
    setActiveTab(newTabs.length - 1);
    setNewTabName('');
    setNewTabStyle('');
  };

  // Switch tab
  const switchTab = (index: number) => {
    setActiveTab(index);
  };

  // Delete tab
  const deleteTab = (indexToDelete: number) => {
    const newTabs = tabs.filter((_, index) => index !== indexToDelete);
    setTabs(newTabs);

    if (activeTab === indexToDelete) {
      setActiveTab(newTabs.length > 0 ? 0 : -1);
    } else if (activeTab > indexToDelete) {
      setActiveTab((prev) => prev - 1);
    }
  };

  // Rename tab
  const renameTab = () => {
    if (!newTabName.trim()) return;
    const updatedTabs = [...tabs];
    updatedTabs[activeTab].name = newTabName.trim();
    setTabs(updatedTabs);
  };

  // Update style
  const updateTabStyle = () => {
    const updatedTabs = [...tabs];
    updatedTabs[activeTab].style = newTabStyle.trim();
    setTabs(updatedTabs);
  };

  // Update content
  const updateTabContent = () => {
    const updatedTabs = [...tabs];
    updatedTabs[activeTab].content = input;
    setTabs(updatedTabs);
  };

  return (
    <div style={{ padding: '1rem', fontFamily: 'monospace' }}>
      <h2>Text to HTML Code Generator</h2>

      {/* Tab Navigation */}
      <div style={{ marginBottom: '0.5rem' }}>
        {tabs.map((tab, index) => (
          <div
            key={index}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              marginRight: '0.5rem',
              backgroundColor: activeTab === index ? '#0070f3' : '#eee',
              color: activeTab === index ? '#fff' : '#000',
              border: '1px solid #ccc',
              borderRadius: '5px',
              overflow: 'hidden',
            }}
          >
            <button
              onClick={() => switchTab(index)}
              style={{
                padding: '0.3rem 0.6rem',
                border: 'none',
                background: 'transparent',
                color: 'inherit',
                cursor: 'pointer',
              }}
            >
              {tab.name}
            </button>
            <button
              onClick={() => deleteTab(index)}
              style={{
                padding: '0.3rem',
                border: 'none',
                background: 'transparent',
                color: 'red',
                cursor: 'pointer',
                fontWeight: 'bold',
              }}
              title="Delete tab"
            >
              ❌
            </button>
          </div>
        ))}
      </div>

      {/* New tab inputs */}
      <div style={{ marginBottom: '1rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        {/* Tab */}
        <input
          type="text"
          placeholder="Tab name"
          value={newTabName}
          onChange={(e) => setNewTabName(e.target.value)}
          style={{
            flexGrow: 1,
            minWidth: '150px',
            padding: '0.3rem',
            fontFamily: 'monospace',
          }}
        />
        {/* Style */}
        <input
          type="text"
          placeholder="Inline style (e.g., color: black; font-size: 14px;)"
          value={newTabStyle}
          onChange={(e) => setNewTabStyle(e.target.value)}
          style={{
            flexGrow: 1,
            minWidth: '200px',
            padding: '0.3rem',
            fontFamily: 'monospace',
          }}
        />
        {/* Buttons */}
        <button onClick={addTab} style={{ backgroundColor: 'green', color: 'white', padding: '0.4rem 0.8rem', borderRadius: '5px', fontWeight: 'bold', border: 'none' }}>
          Add Tab
        </button>
        <button onClick={renameTab} disabled={activeTab === -1} style={{ backgroundColor: '#0070f3', color: 'white', padding: '0.4rem 0.8rem', borderRadius: '5px', fontWeight: 'bold', border: 'none' }}>
          Rename Tag
        </button>
        <button onClick={updateTabStyle} disabled={activeTab === -1} style={{ backgroundColor: '#aa00ff', color: 'white', padding: '0.4rem 0.8rem', borderRadius: '5px', fontWeight: 'bold', border: 'none' }}>
          Update Style
        </button>
        <button onClick={updateTabContent} disabled={activeTab === -1} style={{ backgroundColor: '#ff9900', color: 'white', padding: '0.4rem 0.8rem', borderRadius: '5px', fontWeight: 'bold', border: 'none' }}>
          Update Content
        </button>
      </div>

      {/* Text Input */}
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Page text"
        rows={6}
        style={{ width: '100%', fontFamily: 'monospace', padding: '0.5rem' }}
      />

      {/* Copy & Output */}
      <div style={{ marginTop: '1rem' }}>
        <button
          onClick={copyToClipboard}
          style={{
            padding: '0.5rem 1rem',
            cursor: 'pointer',
            borderRadius: '5px',
            border: 'none',
            backgroundColor: '#0070f3',
            color: 'white',
            fontWeight: 'bold',
            marginBottom: '0.5rem',
          }}
        >
          Copy Output
        </button>

        <pre
          style={{
            backgroundColor: '#1e1e1e',
            color: '#d4d4d4',
            padding: '1rem',
            borderRadius: '8px',
            whiteSpace: 'pre-wrap',
            overflowX: 'auto',
          }}
        >
          {outputCode}
        </pre>
      </div>
    </div>
  );
}
