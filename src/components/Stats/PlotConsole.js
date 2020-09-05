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
import MetricPlot from './MetricPlot';

function PlotConsole() {
  let user = useContext(UserContext);

  let [selectedMetrics, setSelectedMetrics] = useState([]);
  let [selectedIds, setSelectedIds] = useState([]);
  let [plots, setPlots] = useState([]);

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

  function HandleAddPlot() {
    // setPlots([selectedMetrics, ...plots]); //TODO Why is this not working??
    setPlots([...plots, selectedMetrics]);
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
            MenuProps={{ PaperProps: { style: { maxHeight: 800, width: 250 } } }}
          > {
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
      </Paper> {
        plots.map((metrics, index) => <Paper key={'plot' + index} className={classes.paper}><MetricPlot metrics={metrics} /></Paper>)
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
