'use client';
import Header from '../components/Header';
import ManualTimer from '../components/ManualTimer';
import CourtroomScene from '../components/CourtroomBackground';

export default function Home() {
  return (
    <CourtroomScene
      courtroomSrc="/images/courtroom.jpg"
      deskSrc="/images/desk.png"
    >
      <Header />
      <ManualTimer initialSeconds={0} />
    </CourtroomScene>
  );
}
