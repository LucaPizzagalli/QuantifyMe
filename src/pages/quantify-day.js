import React from 'react';
import AddDayForm from '../components/QuantifyDay/AddDayForm';


function QuantifyDayPage() {
  return (
    <div style={{ height: 'calc(100vh - 80px)', position: 'relative', overflowX: 'hidden' }}>
      <AddDayForm />
    </div>
  );
}

export default QuantifyDayPage
