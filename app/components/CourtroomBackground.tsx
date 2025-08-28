'use client';
import React, { ReactNode } from 'react';

type CourtroomBackgroundProps = {
  courtroomSrc: string;
  deskSrc: string;
  children?: ReactNode; // things that sit above desk (judge, lawyer, etc.)
};

export default function CourtroomBackground({ courtroomSrc, deskSrc, children }: CourtroomBackgroundProps) {
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      {/* Courtroom background */}
      <img
        src={courtroomSrc}
        alt="Courtroom"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />

      {/* Desk overlay (always part of background) */}
      <img
        src={deskSrc}
        alt="Desk"
        style={{
          position: 'absolute',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '60%',
          maxHeight: '40%',
          objectFit: 'contain',
          pointerEvents: 'none', // desk won’t block clicks
        }}
      />

      {/* Overlayed components */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
        }}
      >
        {children}
      </div>
    </div>
  );
}
