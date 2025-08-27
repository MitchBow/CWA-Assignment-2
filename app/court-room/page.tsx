'use client';
import Header from '../components/Header';
import ManualTimer from '../components/ManualTimer';
import CourtroomBackground from '../components/CourtroomBackground';

export default function Home() {
  return (
    <CourtroomBackground deskImage="/desk.png">
      <Header />
      <ManualTimer initialSeconds={0} />
    </CourtroomBackground>
  );
}
