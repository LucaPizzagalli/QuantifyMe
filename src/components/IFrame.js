import React from 'react';

function IFrame() {
  return (
    <div style={{
      position: 'absolute',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      width: '100%'
    }}>
      <iframe src="https://www.google.com/search?igu=1" width="540" height="450"></iframe>
    </div>
  );
}

export default IFrame;
