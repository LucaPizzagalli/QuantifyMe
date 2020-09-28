import React, { useState } from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import UISettings from './UISettings'
import AccountSettings from './AccountSettings'
import DataSettings from './DataSettings'

function Settings() {
  let [openTab, setOpenTab] = useState(0);

  return (
    <>
      <Tabs
        value={openTab}
        onChange={(_, tab) => setOpenTab(tab)}
        variant="fullWidth"
        indicatorColor="primary"
        textColor="primary"
        aria-label="setting-tabs"
      >
        <Tab id="theme" aria-controls="theme" label="Theme" aria-label="theme" />
        <Tab id="account" aria-controls="account" label="Account" aria-label="account" />
        <Tab id="data" aria-controls="data" label="Data" aria-label="data" />
      </Tabs>
      { openTab === 0 &&
        <UISettings />
      }
      { openTab === 1 &&
        <AccountSettings />
      }
      { openTab === 2 &&
        <DataSettings />
      }
    </>
  );
}

export default Settings;