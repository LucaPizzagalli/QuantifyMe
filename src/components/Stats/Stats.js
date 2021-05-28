import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import SaveIcon from '@material-ui/icons/Save';
import CircularProgress from '@material-ui/core/CircularProgress';
import Zoom from '@material-ui/core/Zoom';
import IconButton from '@material-ui/core/IconButton';

import UserContext from '../Firebase';
import AlertContext from '../Layout';
import PlotConsole from './PlotConsole';
import { TimeSeriesPlot, CorrelationPlot } from './Plots';
import { SwitchIcon } from '../Icons';


function Stats() {
  let user = useContext(UserContext);
  let showAlert = useContext(AlertContext);
  let metrics = user.getMetrics();

  let [plots, setPlots] = useState([]);
  let [isEdited, setIsEdited] = useState(false);
  let [isLoading, setIsLoading] = useState(true);
  let [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    function handleLoadingSuccess(newPlots) {
      setPlots(newPlots);
      setIsLoading(false);
    }

    function handleLoadingError(error) {
      setIsLoading(false);
      showAlert(error.message, 'error');
    }

    user.getPlots(handleLoadingSuccess, handleLoadingError);
  }, [user, showAlert]);

  function handleAddPlot(newPlot) {
    let nextPlotId = -1;
    for (let plot of plots)
      nextPlotId = Math.max(nextPlotId, parseInt(plot.id.slice(2)));
    nextPlotId = 'id' + (nextPlotId + 1);
    newPlot.id = nextPlotId;
    setPlots([newPlot, ...plots]);
    setIsEdited(true);
  }

  function handleSwapPlots(index1, index2) {
    let newPlots = [...plots];
    newPlots[index1] = plots[index2];
    newPlots[index2] = plots[index1];
    setPlots(newPlots);
    setIsEdited(true);
  }

  function handleDeletePlot(plotId) {
    let newPlots = plots.filter(plot => plot.id !== plotId);
    setPlots(newPlots);
    setIsEdited(true);
  }

  function handleSavePlots() {
    function handleSavePlotsSuccess() {
      setIsSaving(false);
      setIsEdited(false);
      showAlert('Metrics saved', 'success');
    }

    function handleSavePlotsError(error) {
      setIsSaving(false);
      showAlert(error.message, 'error');
    }

    setIsSaving(true);
    setIsEdited(false);
    user.updatePlots(plots, handleSavePlotsSuccess, handleSavePlotsError);
  }

  let classes = useStyles();
  return (
    <>
      <PlotConsole metrics={metrics} handleAddPlot={handleAddPlot} />
      { isLoading ?
        <div className={classes.loading}>
          <CircularProgress size="5rem" />
        </div>
        :
        plots.map((plot, index) => [
          index > 0 &&
          <IconButton key={'swap-' + index}
            aria-label="swap" variant="contained" onClick={() => handleSwapPlots(index - 1, index)} >
            <SwitchIcon variant="contained" />
          </IconButton>
          ,
          plot.type === 'time-series' ?
            <TimeSeriesPlot key={plot.id} plot={plot} handleDeletePlot={handleDeletePlot}/>
            :
            <CorrelationPlot key={plot.id} plot={plot} handleDeletePlot={handleDeletePlot} />
        ])
      }
      <Zoom
        key="save-metrics-button"
        in={isEdited || isSaving}
        timeout={200}
        unmountOnExit
      >
        {isSaving ?
          <Fab aria-label="loading" className={classes.fab} color="primary">
            <CircularProgress color="inherit" />
          </Fab>
          :
          <Fab aria-label="save-metrics" className={classes.fab} color="primary" onClick={handleSavePlots}>
            <SaveIcon />
          </Fab>
        }
      </Zoom>
    </>
  );
}

let useStyles = makeStyles(theme => ({
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  loading: {
    position: 'fixed',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100vw',
    height: '100vh',
    zIndex: -1,
  }
}));

export default Stats
