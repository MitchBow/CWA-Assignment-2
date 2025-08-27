'use client';
import React from 'react';

interface OutputProps {
  outputCode: string;
  copyToClipboard: () => void;
}

export default function Output({ outputCode, copyToClipboard }: OutputProps) {
  return (
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
      <pre style={{
        backgroundColor: '#1e1e1e',
        color: '#d4d4d4',
        padding: '1rem',
        borderRadius: '8px',
        whiteSpace: 'pre-wrap',
        overflowX: 'auto',
      }}>
        {outputCode}
      </pre>
    </div>
  );
}
