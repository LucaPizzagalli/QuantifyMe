import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import UserContext from '../Firebase';
import AlertContext from '../Layout';

function EraseData() {
  let user = useContext(UserContext);
  let showAlert = useContext(AlertContext);
  let [isLoading, setIsLoading] = useState(false);
  let [eraseDays, setEraseDays] = useState(false);
  let [eraseMetrics, setEraseMetrics] = useState(false);
  let [eraseClocks, setEraseClocks] = useState(false);
  let [eraseExtra, setEraseExtra] = useState(false);

  function handleErase(e) {
    setIsLoading(true);
    let options = { days: eraseDays, metrics: eraseMetrics, clocks: eraseClocks, extra: eraseExtra };
    user.eraseData(options, handleEraseSuccess, handleEraseError);
  }

  function handleEraseSuccess() {
    showAlert('Deletion complete', 'success');
    setIsLoading(false);
  }

  function handleEraseError(e) {
    showAlert(e.message, 'error');
    setIsLoading(false);
  }

  let classes = useStyles();
  return (
    <div className={classes.root}>
      <FormGroup>
        <FormControlLabel
          control={<Checkbox checked={eraseDays} onChange={() => setEraseDays(!eraseDays)} name="days" color="primary" />}
          label="Days"
        />
        <FormControlLabel
          control={<Checkbox checked={eraseMetrics} onChange={() => setEraseMetrics(!eraseMetrics)} name="days" color="primary" />}
          label="Metrics"
        />
        <FormControlLabel
          control={<Checkbox checked={eraseClocks} onChange={() => setEraseClocks(!eraseClocks)} name="clocks" color="primary" />}
          label="Timers, Alarms, Stopwatches"
        />
        <FormControlLabel
          control={<Checkbox checked={eraseExtra} onChange={() => setEraseExtra(!eraseExtra)} name="clocks" color="primary" />}
          label="Others"
        />
      </FormGroup>
      <Alert severity="warning">
        <AlertTitle>Permanent Action</AlertTitle>
        If you decide to delete this account all the selected information will be deleted, this action is not reversible. You should consider exporting your data before proceeding.
      </Alert>
      <div className={classes.wrapper}>
        <Button variant="contained" color="primary" onClick={handleErase}>
          Permanently Erase Data
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

export default EraseData;
