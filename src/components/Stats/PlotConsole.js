import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import UserContext from '../Firebase';
import { TimeSeriesPlot, DependencyPlot } from './Plots';

function PlotConsole() {
  let user = useContext(UserContext);

  let [selectedMetrics, setSelectedMetrics] = useState([]);
  let [selectedIds, setSelectedIds] = useState([]);

  function handleChangeMetrics(e) {
    let newSelectedMetrics = e.target.value.map(id => {
      for (let metric of user.getMetrics())
        if (metric.id === id)
          return metric;
      return null;
    });
    setSelectedIds(e.target.value);
    setSelectedMetrics(newSelectedMetrics);
  };

  function handleRemoveMetric(removedId) {
    setSelectedIds(selectedIds.filter(id => id !== removedId));
    setSelectedMetrics(selectedMetrics.filter(metric => metric.id !== removedId));
  };

  let [xMetric, setXMetric] = useState();
  let [yMetric, setYMetric] = useState();
  let [colorMetric, setColorMetric] = useState();

  function handleSetXMetric(e) {
    for (let metric of user.getMetrics())
      if (metric.id === e.target.value)
        setXMetric(metric);
  };

  function handleSetYMetric(e) {
    for (let metric of user.getMetrics())
      if (metric.id === e.target.value)
        setYMetric(metric);
  };

  function handleSetColorMetric(e) {
    if (e.target.value === '--')
      setColorMetric(null);
    else
      for (let metric of user.getMetrics())
        if (metric.id === e.target.value)
          setColorMetric(metric);
  };

  let [plots, setPlots] = useState([]);

  function HandleAddDependencyPlot() {
    // setPlots([selectedMetrics, ...plots]); //TODO Why is this not working??
    setPlots([...plots, ['dependency', { x: xMetric, y: yMetric, color: colorMetric }]]);
  }

  function HandleAddPlot() {
    // setPlots([selectedMetrics, ...plots]); //TODO Why is this not working??
    setPlots([...plots, ['time-series', { metrics: selectedMetrics }]]);
  }

  let classes = useStyles();
  return (
    <div className={classes.root}>
      <Paper className={classes.paper} key="console">
        <FormControl className={classes.formControl}>
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
              user.getMetrics().map(metric => (
                <MenuItem key={metric.id} value={metric.id}>
                  <Checkbox checked={selectedIds.indexOf(metric.id) > -1} />
                  <ListItemText primary={metric.name} />
                </MenuItem>
              ))
            }
          </Select>
        </FormControl>
        <div className={classes.chips}> {
          selectedMetrics.map(metric =>
            <Chip key={metric.id} label={metric.name} onDelete={() => handleRemoveMetric(metric.id)} className={classes.chip} />
          )
        }
        </div>
        <Button onClick={HandleAddPlot} variant="contained" color="primary">Show</Button>


        <FormControl className={classes.formControl}>
          <InputLabel id="metric-x">X data</InputLabel>
          <Select
            labelId="metric-x"
            id="metric-x"
            value={xMetric ? xMetric.id : ''}
            onChange={handleSetXMetric}
            renderValue={() => xMetric.name}
            MenuProps={{ PaperProps: { style: { maxHeight: 800, width: 250 } } }} >
            {
              user.getMetrics().map(metric => (
                <MenuItem key={metric.id} value={metric.id}>{metric.name}</MenuItem>
              ))
            }
          </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel id="metric-y">Y data</InputLabel>
          <Select
            labelId="metric-y"
            id="metric-y"
            value={yMetric ? yMetric.id : ''}
            onChange={handleSetYMetric}
            renderValue={() => yMetric.name}
            MenuProps={{ PaperProps: { style: { maxHeight: 800, width: 250 } } }} >
            {
              user.getMetrics().map(metric => (
                <MenuItem key={metric.id} value={metric.id}>{metric.name}</MenuItem>
              ))
            }
          </Select>
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
              user.getMetrics().map(metric => (
                <MenuItem key={metric.id} value={metric.id}>{metric.name}</MenuItem>
              ))
            }
          </Select>
        </FormControl>
        <Button onClick={HandleAddDependencyPlot} variant="contained" color="primary">Show</Button>
      </Paper>
      {
        plots.map((plot, index) => {
          if (plot[0] === 'time-series')
            return <Paper key={'plot' + index} className={classes.paper}><TimeSeriesPlot metrics={plot[1].metrics} /></Paper>;
          if (plot[0] === 'dependency')
            return <Paper key={'plot' + index} className={classes.paper}><DependencyPlot metricX={plot[1].x} metricY={plot[1].y} color={plot[1].metricColor} /></Paper>;
          return null
          })
      }
    </div>
  );
}

let useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  paper: {
    margin: theme.spacing(1),
  },
  formControl: {
    margin: theme.spacing(1),
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
