'use client';
import Header from '../components/Header';
import ManualTimer from '../components/ManualTimer';
import CourtroomScene from '../components/CourtroomBackground';
import StageManager from '../components/StageManager'; // 👈 correct import

export default function Home() {
  return (
    <CourtroomScene courtroomSrc="/images/courtroom.jpg" deskSrc="/images/desk.jpg">
      <Header />
      <ManualTimer initialSeconds={0} />
      <StageManager />
    </CourtroomScene>

  );
}
