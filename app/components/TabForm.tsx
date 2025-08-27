'use client';
import React from 'react';

interface TabFormProps {
  newTabName: string;
  setNewTabName: (name: string) => void;
  newTabStyle: string;
  setNewTabStyle: (style: string) => void;
  addTab: () => void;
  renameTab: () => void;
  updateTabStyle: () => void;
  updateTabContent: () => void;
  activeTab: number;
}

export default function TabForm({
  newTabName,
  setNewTabName,
  newTabStyle,
  setNewTabStyle,
  addTab,
  renameTab,
  updateTabStyle,
  updateTabContent,
  activeTab
}: TabFormProps) {
  return (
    <div style={{ marginBottom: '1rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
      <input
        type="text"
        placeholder="Tab name"
        value={newTabName}
        onChange={(e) => setNewTabName(e.target.value)}
        style={{ flexGrow: 1, minWidth: '150px', padding: '0.3rem', fontFamily: 'monospace' }}
      />
      <input
        type="text"
        placeholder="Inline style (e.g., color: black; font-size: 14px;)"
        value={newTabStyle}
        onChange={(e) => setNewTabStyle(e.target.value)}
        style={{ flexGrow: 1, minWidth: '200px', padding: '0.3rem', fontFamily: 'monospace' }}
      />
      <button onClick={addTab} style={{ backgroundColor: 'green', color: 'white', padding: '0.4rem 0.8rem', borderRadius: '5px', fontWeight: 'bold', border: 'none' }}>
        Add Tab
      </button>
      <button onClick={renameTab} disabled={activeTab === -1} style={{ backgroundColor: '#0070f3', color: 'white', padding: '0.4rem 0.8rem', borderRadius: '5px', fontWeight: 'bold', border: 'none' }}>
        Rename Tab
      </button>
      <button onClick={updateTabStyle} disabled={activeTab === -1} style={{ backgroundColor: '#aa00ff', color: 'white', padding: '0.4rem 0.8rem', borderRadius: '5px', fontWeight: 'bold', border: 'none' }}>
        Update Style
      </button>
      <button onClick={updateTabContent} disabled={activeTab === -1} style={{ backgroundColor: '#ff9900', color: 'white', padding: '0.4rem 0.8rem', borderRadius: '5px', fontWeight: 'bold', border: 'none' }}>
        Update Content
      </button>
    </div>
  );
}
