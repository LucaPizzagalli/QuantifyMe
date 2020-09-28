import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import UserContext from '../Firebase';
import AlertContext from '../Layout';

function ImportData() {
  let user = useContext(UserContext);
  let showAlert = useContext(AlertContext);
  let [isLoading, setIsLoading] = useState(false);
  let [importDays, setImportDays] = useState(true);
  let [importMetrics, setImportMetrics] = useState(true);
  let [importClocks, setImportClocks] = useState(true);
  let [importExtra, setImportExtra] = useState(false);

  function handleUpload(e) {
    setIsLoading(true);
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.onload = handleFileParsed;
    reader.readAsText(file);
  };

  function handleFileParsed(e) {
    let backup = JSON.parse(e.target.result);
    let options = { days: importDays, metrics: importMetrics, clocks: importClocks, extra: importExtra };
    user.importData(backup, options, handleBackupSuccess, handleBackupError);
  }

  function handleBackupSuccess() {
    showAlert('Import complete', 'success');
    setIsLoading(false);
  }

  function handleBackupError(e) {
    showAlert(e.message, 'error');
    setIsLoading(false);
  }

  let classes = useStyles();
  return (
    <div className={classes.root}>
      <FormGroup>
        <FormControlLabel
          control={<Checkbox checked={importDays} onChange={() => setImportDays(!importDays)} name="days" color="primary" />}
          label="Days"
        />
        <FormControlLabel
          control={<Checkbox checked={importMetrics} onChange={() => setImportMetrics(!importMetrics)} name="days" color="primary" />}
          label="Metrics"
        />
        <FormControlLabel
          control={<Checkbox checked={importClocks} onChange={() => setImportClocks(!importClocks)} name="clocks" color="primary" />}
          label="Timers, Alarms, Stopwatches"
        />
        <FormControlLabel
          control={<Checkbox checked={importExtra} onChange={() => setImportExtra(!importExtra)} name="clocks" color="primary" />}
          label="Others"
        />
      </FormGroup>
      <div className={classes.wrapper}>
        <input type="file" accept=".json,.JSON,application/JSON" id="upload-report" style={{ display: 'none' }}
          onChange={handleUpload} />
        <label htmlFor="upload-report">
          <Button variant="contained" color="primary" component="span">
            Upload JSON Backup
          </Button>
        </label>
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

export default ImportData;
