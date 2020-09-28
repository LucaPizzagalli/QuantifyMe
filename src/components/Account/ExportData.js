import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import UserContext from '../Firebase';
import AlertContext from '../Layout';

function ExportData() {
  let user = useContext(UserContext);
  let showAlert = useContext(AlertContext);
  let [isLoading, setIsLoading] = useState(false);

  function handleBackupSuccess(backup) {
    let url = window.URL.createObjectURL(backup);
    let a = document.createElement('a');
    let today = new Date().toISOString().slice(0, 10);
    a.style.display = 'none';
    a.href = url;
    a.download = 'QuantifyMe-backup-' + today + '.json';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    setIsLoading(false);
    showAlert('Backup generation successful', 'success');
  }

  function handleBackupError(e) {
    showAlert(e.message, 'error');
    setIsLoading(false);
  }

  function handleSubmit() {
    setIsLoading(true);
    user.exportData(handleBackupSuccess, handleBackupError);
  }

  let classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>
        <Button
          variant="contained"
          color="primary"
          disabled={isLoading}
          onClick={handleSubmit}
        >
          Generate JSON backup
      </Button>
        {isLoading && <CircularProgress size={24} className={classes.buttonProgress} />}
      </div>
    </div>
  );
}

let useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
  },
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}));

export default ExportData;
