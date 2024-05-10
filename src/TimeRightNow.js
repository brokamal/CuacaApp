import React, { useState, useEffect } from 'react';

function TimeRightNow() {
  const [currentTime, setCurrentTime] = useState(new Date());


  useEffect(() => {
    const timerID = setInterval(() => tick(), 1000);
    
    return () => clearInterval(timerID);
  }, []);

  const tick = () => {
    setCurrentTime(new Date());
  };

  return (
    <div>
      <h1>Current Time</h1>
      <h2>{currentTime.toLocaleTimeString()}</h2>
    </div>
  );
}

export default TimeRightNow;
