'use client';
import React from 'react';
import Header from '../components/Header';
import ManualTimer from '../components/ManualTimer';
import CourtroomBackground from '../components/CourtroomBackground';
import StageManager from '../components/StageManager';
import NotificationManager from '../components/NotificationManager';

export default function Home() {
  return (
    <CourtroomBackground courtroomSrc="/images/courtroom.jpg" deskSrc="/images/desk.jpg">
      <Header />
      <ManualTimer initialSeconds={0} />
      <StageManager />
      <NotificationManager />
    </CourtroomBackground>
  );
}
