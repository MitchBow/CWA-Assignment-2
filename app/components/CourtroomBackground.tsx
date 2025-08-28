'use client';
import React, { ReactNode, ReactElement, isValidElement, useState } from 'react';

type CourtroomBackgroundProps = {
  courtroomSrc: string;
  deskSrc: string;
  children?: ReactNode;
};

export default function CourtroomBackground({ courtroomSrc, deskSrc, children }: CourtroomBackgroundProps) {
  const [failed, setFailed] = useState(false); // ✅ start with desk

  // Function to trigger courtroom when StageManager signals failure
  const triggerCourtroom = () => setFailed(true);

  // Inject triggerCourtroom into children
  const childrenWithProps = React.Children.map(children, (child) => {
    if (isValidElement(child)) {
      return React.cloneElement(child as ReactElement<any>, { triggerCourtroom });
    }
    return child;
  });

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      {/* Desk is default, courtroom shows only when failed */}
      <img
        src={failed ? courtroomSrc : deskSrc} 
        alt={failed ? 'Courtroom' : 'Desk'}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />

      {/* Overlayed components */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
        }}
      >
        {childrenWithProps}
      </div>
    </div>
  );
}
