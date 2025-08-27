'use client';
import React, { useState, useEffect } from 'react';
import TabNavigation from './TabNavigation';
import TabForm from './TabForm';
import Output from './Output';

export interface Tab {
  name: string;
  style: string;
  content: string;
}

export default function TabManager() {
  const [input, setInput] = useState('');
  const [tabs, setTabs] = useState<Tab[]>([]);
  const [activeTab, setActiveTab] = useState(0);
  const [newTabName, setNewTabName] = useState('');
  const [newTabStyle, setNewTabStyle] = useState('');

  // Load tabs from localStorage
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

  useEffect(() => {
    localStorage.setItem('savedTabs', JSON.stringify(tabs));
  }, [tabs]);

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

  // Tab actions
  const addTab = () => {
    if (!newTabName.trim()) return;
    const newTabs = [...tabs, { name: newTabName.trim(), style: newTabStyle.trim(), content: input }];
    setTabs(newTabs);
    setActiveTab(newTabs.length - 1);
    setNewTabName('');
    setNewTabStyle('');
  };

  const switchTab = (index: number) => setActiveTab(index);

  const deleteTab = (index: number) => {
    const newTabs = tabs.filter((_, i) => i !== index);
    setTabs(newTabs);
    setActiveTab(activeTab === index ? 0 : activeTab > index ? activeTab - 1 : activeTab);
  };

  const renameTab = () => {
    if (!newTabName.trim()) return;
    const updated = [...tabs];
    updated[activeTab].name = newTabName.trim();
    setTabs(updated);
  };

  const updateTabStyle = () => {
    const updated = [...tabs];
    updated[activeTab].style = newTabStyle.trim();
    setTabs(updated);
  };

  const updateTabContent = () => {
    const updated = [...tabs];
    updated[activeTab].content = input;
    setTabs(updated);
  };

  // Generate formatted HTML output
  const outputCode = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Generated Tabs</title>
    <style>
      .tab-buttons button {
        margin-right: 5px;
        padding: 0.4rem 0.8rem;
        cursor: pointer;
      }
      .tab-content {
        border: 1px solid #ccc;
        padding: 1rem;
        min-height: 100px;
      }
    </style>
  </head>
  <body>
    <div class="tab-buttons">
${tabs.map((tab, i) => `      <button onclick="showTab(${i})">${tab.name}</button>`).join('\n')}
    </div>
    <div id="tabContent" class="tab-content"></div>
    <script>
      const tabData = ${JSON.stringify(tabs.map(t => ({ content: t.content, style: t.style })), null, 2)};
      function showTab(index) {
        const data = tabData[index];
        document.getElementById('tabContent').innerHTML =
          '<div style="' + data.style + '">' + data.content.replace(/\\n/g, '<br>') + '</div>';
      }
      if (tabData.length > 0) showTab(0);
    </script>
  </body>
</html>
`.trim();

  // Copy to clipboard (robust)
  const copyToClipboard = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(outputCode)
        .then(() => alert('Code copied to clipboard!'))
        .catch(() => fallbackCopy());
    } else {
      fallbackCopy();
    }
  };

  const fallbackCopy = () => {
    try {
      const textArea = document.createElement('textarea');
      textArea.value = outputCode;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      alert('Code copied to clipboard!');
    } catch (err) {
      alert('Failed to copy!');
      console.error(err);
    }
  };

  return (
    <div style={{ padding: '1rem', fontFamily: 'monospace' }}>
      <h2>Text to HTML Code Generator</h2>

      {/* Components */}
      <TabNavigation tabs={tabs} activeTab={activeTab} switchTab={switchTab} deleteTab={deleteTab} />

      <TabForm
        newTabName={newTabName} setNewTabName={setNewTabName}
        newTabStyle={newTabStyle} setNewTabStyle={setNewTabStyle}
        addTab={addTab} renameTab={renameTab} updateTabStyle={updateTabStyle} updateTabContent={updateTabContent}
        activeTab={activeTab}
      />

      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Page text"
        rows={6}
        style={{ width: '100%', fontFamily: 'monospace', padding: '0.5rem', marginTop: '0.5rem' }}
      />

      <Output outputCode={outputCode} copyToClipboard={copyToClipboard} />
    </div>
  );
}
