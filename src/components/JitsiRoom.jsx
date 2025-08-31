import React from 'react';

const JitsiRoom = ({ roomName }) => {
  return (
    <div className="h-[600px] w-full border rounded-xl overflow-hidden">
      <iframe
        src={`https://meet.jit.si/${roomName}`}
        allow="camera; microphone; fullscreen; display-capture"
        style={{ height: '100%', width: '100%' }}
        title="Jitsi Meeting"
      />
    </div>
  );
};

export default JitsiRoom;