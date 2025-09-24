'use client';
import React from 'react';

interface CourtroomProps {
  visible: boolean;
  reason: string;
  onRetry?: () => void; 
}

const Courtroom: React.FC<CourtroomProps> = ({ visible, reason, onRetry }) => {
  if (!visible) return null;

  return (
    <>
      <div style={{ position: 'fixed', top:0, left:0, width:'100vw', height:'100vh', backgroundColor:'rgba(0,0,0,0.7)', zIndex:1000, pointerEvents:'none' }} />
      <div style={{ position:'fixed', top:'50%', left:'50%', transform:'translate(-50%,-50%)', backgroundColor:'var(--header-footer-background)', padding:'30px', borderRadius:'10px', maxWidth:'500px', textAlign:'center', zIndex:1100, pointerEvents:'auto', color:'var(--text-color)' }}>
        <h2>YOU GOT SENT TO COURT</h2>
        <p>{reason}</p>
        <div style={{ marginTop:'20px' }}>
          {onRetry && <button onClick={onRetry} style={{ padding:'8px 16px', borderRadius:'6px', cursor:'pointer', backgroundColor:'var(--button-background)', color:'var(--button-text)', border:'none' }}>Retry</button>}
        </div>
      </div>
    </>
  );
};

export default Courtroom;
