import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';


function PlotConsole({metrics, handleAddPlot}) {

  let [selectedMetrics, setSelectedMetrics] = useState([]);
  let [selectedIds, setSelectedIds] = useState([]);
  let [timeSeriesError, setTimeSeriesError] = useState('');

  function handleChangeMetrics(e) {
    setTimeSeriesError('');
    setSelectedIds(e.target.value);
    setSelectedMetrics(e.target.value.map(id => metrics[id]));
  };

  function handleRemoveMetric(removedId) {
    setSelectedIds(selectedIds.filter(id => id !== removedId));
    setSelectedMetrics(selectedMetrics.filter(metric => metric.id !== removedId));
  };

  function handleCheckTimeSeries() {
    if (selectedMetrics.length > 0)
      handleAddPlot({ type: 'time-series', metrics: selectedMetrics });
    else
      setTimeSeriesError('Add some metrics');
  }

  let [xMetric, setXMetric] = useState();
  let [yMetric, setYMetric] = useState();
  let [colorMetric, setColorMetric] = useState();
  let [xError, setXError] = useState('');
  let [yError, setYError] = useState('');

  function handleSetXMetric(e) {
    setXError('');
    setXMetric(metrics[e.target.value]);
  };

  function handleSetYMetric(e) {
    setYError('');
    setYMetric(metrics[e.target.value]);
  };

  function handleSetColorMetric(e) {
    if (e.target.value === '--')
      setColorMetric(null);
    else
      setColorMetric(metrics[e.target.value]);
  };

  function handleCheckCorrelationPlot() {
    if (xMetric && yMetric && colorMetric)
      handleAddPlot({type: 'correlation', metrics: [xMetric, yMetric, colorMetric ]});
    else if (xMetric && yMetric)
      handleAddPlot({type: 'correlation', metrics: [xMetric, yMetric ]});
    if (!xMetric)
      setXError('Choose metric');
    if (!yMetric)
      setYError('Choose metric');
  }

  let classes = useStyles();
  return (
    <Paper className={classes.paper} key="console">
      <div className={classes.block}>
        <div className={classes.subBlock}>
          <FormControl className={classes.formControl} error={timeSeriesError.length > 0}>
            <InputLabel id="metrics-select-label">Data to plot</InputLabel>
            <Select
              labelId="metrics-select-label"
              id="metrics-select"
              multiple
              value={selectedIds}
              onChange={handleChangeMetrics}
              input={<Input />}
              // renderValue={'giggino'}
              renderValue={() => selectedMetrics.map(metric => metric.name).join(', ')}
              MenuProps={{ PaperProps: { style: { maxHeight: 800, width: 250 } } }} >
              {
                Object.keys(metrics).map(id => (
                  <MenuItem key={id} value={id}>
                    <Checkbox checked={selectedIds.indexOf(id) > -1} />
                    <ListItemText primary={metrics[id].name} />
                  </MenuItem>
                ))
              }
            </Select>
            <FormHelperText>{timeSeriesError}</FormHelperText>
          </FormControl>
        </div>
        <div className={classes.chips}> {
          selectedMetrics.map(metric =>
            <Chip key={metric.id} label={metric.name} onDelete={() => handleRemoveMetric(metric.id)} className={classes.chip} />
          )
        }
        </div>
        <div className={classes.subBlock}>
          <Button onClick={handleCheckTimeSeries} variant="contained" color="primary">Show</Button>
        </div>
      </div>

      <Divider variant="middle" />

      <div className={classes.block}>
        <div className={classes.subBlock}>
          <FormControl className={classes.formControl} error={xError.length > 0}>
            <InputLabel id="metric-x">X data</InputLabel>
            <Select
              labelId="metric-x"
              id="metric-x"
              value={xMetric ? xMetric.id : ''}
              onChange={handleSetXMetric}
              renderValue={() => xMetric.name}
              MenuProps={{ PaperProps: { style: { maxHeight: 800, width: 250 } } }} >
              {
                Object.keys(metrics).map(id => (
                  <MenuItem key={id} value={id}>{metrics[id].name}</MenuItem>
                ))
              }
            </Select>
            <FormHelperText>{xError}</FormHelperText>
          </FormControl>
          <FormControl className={classes.formControl} error={yError.length > 0}>
            <InputLabel id="metric-y">Y data</InputLabel>
            <Select
              labelId="metric-y"
              id="metric-y"
              value={yMetric ? yMetric.id : ''}
              onChange={handleSetYMetric}
              renderValue={() => yMetric.name}
              MenuProps={{ PaperProps: { style: { maxHeight: 800, width: 250 } } }} >
              {
                Object.keys(metrics).map(id => (
                  <MenuItem key={id} value={id}>{metrics[id].name}</MenuItem>
                ))
              }
            </Select>
            <FormHelperText>{yError}</FormHelperText>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel id="metric-color">Color data</InputLabel>
            <Select
              labelId="metric-color"
              id="metric-color"
              value={colorMetric ? colorMetric.id : ''}
              onChange={handleSetColorMetric}
              renderValue={() => colorMetric.name}
              MenuProps={{ PaperProps: { style: { maxHeight: 800, width: 250 } } }} >
              <MenuItem key={'--'} value={'--'}>--</MenuItem>
              {
                Object.keys(metrics).map(id => (
                  <MenuItem key={id} value={id}>{metrics[id].name}</MenuItem>
                ))
              }
            </Select>
          </FormControl>
        </div>
        <div className={classes.subBlock}>
          <Button onClick={handleCheckCorrelationPlot} variant="contained" color="primary">Show</Button>
        </div>
      </div>
    </Paper>
  );
}

let useStyles = makeStyles(theme => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    margin: theme.spacing(1),
  },
  block: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  subBlock: {
    display: 'flex',
    alignItems: 'center',
    margin: theme.spacing(1),
  },
  formControl: {
    margin: theme.spacing(0, 1, 0, 1),
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
}));

export default PlotConsole
