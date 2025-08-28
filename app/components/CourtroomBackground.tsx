'use client';
import React from 'react';

interface CourtroomBackgroundProps {
  courtroomSrc: string;
  deskSrc: string;
  isCourtroom?: boolean;
  children: React.ReactNode;
}

const CourtroomBackground: React.FC<CourtroomBackgroundProps> = ({ courtroomSrc, deskSrc, isCourtroom, children }) => {
  const backgroundImage = isCourtroom ? courtroomSrc : deskSrc;

  return (
    <div
      style={{
        width: '95vw',
        height: '80vh',
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        transition: 'background-image 0.5s ease-in-out',
      }}
    >
      {children}
    </div>
  );
};

export default CourtroomBackground;
