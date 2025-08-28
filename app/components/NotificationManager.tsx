'use client';
import React, { useEffect, useState } from 'react';
import { notifications as allNotifications, Notification } from './notifications';
import Courtroom from './Courtroom';

interface NotificationManagerProps {
  onCourtroom?: (inCourt: boolean) => void; // optional callback for background
}

const NotificationManager: React.FC<NotificationManagerProps> = ({ onCourtroom }) => {
  const [queue, setQueue] = useState<Notification[]>([]);
  const [activeNotification, setActiveNotification] = useState<Notification | null>(null);
  const [inCourtroom, setInCourtroom] = useState(false);
  const [courtReason, setCourtReason] = useState('');

  useEffect(() => setQueue([...allNotifications]), []);

  const showNextNotification = () => {
    if (queue.length === 0 || inCourtroom) return;

    const next = queue[0];
    setActiveNotification(next);
    setQueue(prev => prev.slice(1));

    const escalation = setTimeout(() => {
      if (!next.acknowledged) {
        setCourtReason(next.courtReason);
        setInCourtroom(true);
        setActiveNotification(null);

        // Notify parent to switch background
        if (onCourtroom) onCourtroom(true);
      }
    }, next.escalationDelay);

    return () => clearTimeout(escalation);
  };

  useEffect(() => {
    if (!activeNotification && !inCourtroom) {
      const timer = setTimeout(showNextNotification, 20000 + Math.random() * 10000);
      return () => clearTimeout(timer);
    }
  }, [activeNotification, queue, inCourtroom]);

  const acknowledgeNotification = () => setActiveNotification(null);

  const handleRetry = () => {
    setInCourtroom(false);
    setCourtReason('');
    if (onCourtroom) onCourtroom(false);
  };

  return (
    <>
      {activeNotification && !inCourtroom && (
        <div style={{ position:'fixed', bottom:'20px', right:'20px', maxWidth:'300px', backgroundColor:'var(--header-footer-background)', border:'1px solid var(--border-color)', padding:'10px', borderRadius:'8px', zIndex:1000, color:'var(--text-color)' }}>
          <strong>{activeNotification.sender}:</strong> {activeNotification.message}
          <button onClick={acknowledgeNotification} style={{ marginLeft:'10px', cursor:'pointer', borderRadius:'5px', backgroundColor:'var(--button-background)', color:'var(--button-text)' }}>
            Acknowledge
          </button>
        </div>
      )}
      <Courtroom
        visible={inCourtroom}
        reason={courtReason}
        onRetry={handleRetry}
      />
    </>
  );
};

export default NotificationManager;
