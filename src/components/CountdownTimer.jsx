import React, { useEffect, useState } from 'react';

const CountdownTimer = ({ targetDateTime }) => {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const diff = new Date(targetDateTime) - now;

      if (diff <= 0) {
        setTimeLeft('🟢 Consultation Time! Join Now');
        clearInterval(timer);
      } else {
        const mins = Math.floor(diff / 60000);
        const secs = Math.floor((diff % 60000) / 1000);
        setTimeLeft(`⏱ Starts in: ${mins}m ${secs}s`);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDateTime]);

  return <p className="text-center text-blue-600 font-semibold mt-2">{timeLeft}</p>;
};

export default CountdownTimer;