'use client';
import React, { ReactNode } from 'react';

interface CourtroomBackgroundProps {
  children?: ReactNode;
  deskImage?: string;
}

export default function CourtroomBackground({
  children,
  deskImage,
}: CourtroomBackgroundProps) {
  return (
    <div
      style={{
        backgroundImage: `url('/courtroom.jpg')`, // for future me image here!
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: '100vw',
        height: '100vh',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
      }}
    >
      {deskImage && (
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <img
            src={deskImage}
            alt="Desk"
            style={{ maxHeight: '200px', width: 'auto' }}
          />
        </div>
      )}

      <div
        style={{
          position: 'relative',
          zIndex: 10,
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {children}
      </div>
    </div>
  );
}
