'use client';
import React, { useState, useEffect } from 'react';
import TabNavigation from './components/TabNavigation';
import TabForm from './components/TabForm';
import Output from './components/Output';

interface Tab {
  name: string;
  style: string;
  content: string;
}

export default function Home() {
  const [input, setInput] = useState('');
  const [tabs, setTabs] = useState<Tab[]>([]);
  const [activeTab, setActiveTab] = useState(0);
  const [newTabName, setNewTabName] = useState('');
  const [newTabStyle, setNewTabStyle] = useState('');

  // Load and save tabs
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

  // Handlers
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
  const renameTab = () => { if (newTabName.trim()) { const t = [...tabs]; t[activeTab].name = newTabName.trim(); setTabs(t); } };
  const updateTabStyle = () => { const t = [...tabs]; t[activeTab].style = newTabStyle.trim(); setTabs(t); };
  const updateTabContent = () => { const t = [...tabs]; t[activeTab].content = input; setTabs(t); };

  // Generate output
  const outputCode = `<!DOCTYPE html><html><head></head><body><div class="tab-buttons" style="margin-bottom: 1rem;">${tabs.map((tab, index) => `<button onclick="showTab(${index})" style="margin-right:5px;padding:0.4rem 0.8rem;cursor:pointer;">${tab.name}</button>`).join('')}</div><div id="tabContent" class="tab-content" style="border:1px solid #ccc;padding:1rem;min-height:100px;"></div><script>const tabData=${JSON.stringify(tabs.map(t=>({content:t.content,style:t.style})))};
function showTab(i){const d=tabData[i];document.getElementById('tabContent').innerHTML='<div style="'+d.style+'">'+d.content.replace(/\n/g,'<br>')+'</div';}if(tabData.length>0){showTab(0);}</script></body></html>`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(outputCode).then(() => alert('Copied!')).catch(() => alert('Failed!'));
  };

  return (
    <div style={{ padding: '1rem', fontFamily: 'monospace' }}>
      <h2>Text to HTML Code Generator</h2>
      <TabNavigation tabs={tabs} activeTab={activeTab} switchTab={switchTab} deleteTab={deleteTab} />
      <TabForm
        newTabName={newTabName} setNewTabName={setNewTabName}
        newTabStyle={newTabStyle} setNewTabStyle={setNewTabStyle}
        addTab={addTab} renameTab={renameTab} updateTabStyle={updateTabStyle} updateTabContent={updateTabContent}
        activeTab={activeTab}
      />
      <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="Page text" rows={6} style={{ width: '100%', fontFamily: 'monospace', padding: '0.5rem' }} />
      <Output outputCode={outputCode} copyToClipboard={copyToClipboard} />
    </div>
  );
}
