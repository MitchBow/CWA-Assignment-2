'use client';
import React from 'react';

interface Tab {
  name: string;
  style: string;
  content: string;
}

interface TabNavigationProps {
  tabs: Tab[];
  activeTab: number;
  switchTab: (index: number) => void;
  deleteTab: (index: number) => void;
}

export default function TabNavigation({ tabs, activeTab, switchTab, deleteTab }: TabNavigationProps) {
  return (
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
  );
}
