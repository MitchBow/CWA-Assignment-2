'use client';
import Header from '../components/Header';
import ManualTimer from '../components/ManualTimer';

export default function Home() {
  return (
    <div>
      <Header />
      <ManualTimer initialSeconds={0} />
    </div>
  );
}
