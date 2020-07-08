import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

function Loading() {
  return (
    <div style={{
      position: 'absolute',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '80%',
      width: '100%'
    }}>
      <CircularProgress size="5rem" />
    </div>
  );
}

export default Loading;