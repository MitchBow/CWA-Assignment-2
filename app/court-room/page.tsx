'use client';
import React, { useState } from 'react';
import Header from '../components/Header';
import ManualTimer from '../components/ManualTimer';
import CourtroomBackground from '../components/CourtroomBackground';
import StageManager from '../components/StageManager';
import NotificationManager from '../components/NotificationManager';
import Courtroom from '../components/Courtroom';

export default function Home() {
  const [isCourtroom, setIsCourtroom] = useState(false);

  return (
    <CourtroomBackground
      courtroomSrc="/images/courtroom.jpg"
      deskSrc="/images/desk.jpg"
      isCourtroom={isCourtroom}
    >
      <Header />
      <ManualTimer initialSeconds={0} />
      <StageManager />
      <NotificationManager onCourtroom={setIsCourtroom} />
    </CourtroomBackground>
  );
}
