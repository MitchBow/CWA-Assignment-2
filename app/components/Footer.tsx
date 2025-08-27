import React from 'react';

export default function Footer() {
  return (
    <footer
      style={{
        background: 'var(--header-footer-background)',
        padding: '1rem',
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',
      }}
    >
      {new Date().getFullYear()} - © - Mitchell Bowell — Student No: 21610317
    </footer>
  );
}
