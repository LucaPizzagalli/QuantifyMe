import React, { useState, useContext } from 'react';
import { useLocation, useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import SaveIcon from '@material-ui/icons/Save';
import CircularProgress from '@material-ui/core/CircularProgress';

import UserContext from '../Firebase';
import AlertContext from '../Layout';
import EditableMetricFirst from './EditableMetricFirst';
import EditableMetric from './EditableMetric';


function EditableGroup() {
  let history = useHistory();
  let groupId = (new URLSearchParams(useLocation().search)).get('group');
  let user = useContext(UserContext);
  let showAlert = useContext(AlertContext);
  let [metricIds, setMetricIds] = useState(user.getGroup(groupId) ? user.getGroup(groupId).metrics : []);
  let [metrics, setMetrics] = useState(user.getMetrics());
  let [isLoading, setIsLoading] = useState(false);
  console.log(metricIds)

  function handleSwapMetrics(index1, index2) {
    let newMetricIds = [...metricIds];
    index1 = (index1 + metricIds.length) % metricIds.length;
    index2 = (index2 + metricIds.length) % metricIds.length;
    newMetricIds[index1] = metricIds[index2];
    newMetricIds[index2] = metricIds[index1];
    setMetricIds(newMetricIds);
  }

  function handleRemoveMetric(metricId, metricIndex) {
    let newMetricIds = [...metricIds];
    newMetricIds.splice(metricIndex, 1);
    setMetricIds(newMetricIds);

    let newMetrics = { ...metrics };
    delete newMetrics[metricId];
    setMetrics(newMetrics);
  }

  function handleUpdateMetric(newMetric) {
    if (!newMetric.id) {
      let nextMetricId = -1;
      for (let id of Object.keys(metrics))
        nextMetricId = Math.max(nextMetricId, parseInt(id.slice(2)));
      newMetric.id = 'id' + (nextMetricId + 1);
      setMetricIds([...metricIds, newMetric.id]);
    }
    setMetrics({ ...metrics, [newMetric.id]: newMetric });
  }

  function handleSaveGroup() {
    setIsLoading(true);
    user.updateGroup({ id: groupId, metrics: metricIds }, metrics, handleSaveGroupSuccess, handleSaveGroupError)
  }

  function handleSaveGroupSuccess() {
    setIsLoading(false);
    showAlert('Metrics saved', 'success');
    history.push('/metrics');
  }

  function handleSaveGroupError(error) {
    setIsLoading(false);
    showAlert(error.message, 'error');
  }

  let classes = useStyles();
  let metricCards;
  if (metricIds.length === 0)
    metricCards =
      <EditableMetricFirst
        metric={{ type: null, color: ['#5e5eec', '#2e2ee6'], logo: 'smartwatch' }}
        step="choose"
        handleUpdateMetric={handleUpdateMetric}
      />;
  else
    metricCards = <>
      <EditableMetricFirst
        metric={metrics[metricIds[0]]}
        step="edit"
        isUnique={metricIds.length === 1}
        handleSwapMetrics={handleSwapMetrics}
        handleUpdateMetric={handleUpdateMetric}
        handleRemoveMetric={handleRemoveMetric}
        key={metricIds[0]} />
      {
        metricIds.slice(1).map((metricId, index) =>
          <div className={classes.metricCell} key={metricId}>
            <EditableMetric
              metric={metrics[metricId]}
              step="edit"
              metricIndex={index + 1}
              handleSwapMetrics={handleSwapMetrics}
              handleUpdateMetric={handleUpdateMetric}
              handleRemoveMetric={handleRemoveMetric}
            />
          </div>
        )
      }
        <EditableMetric
          metric={{ type: null, color: ['#5e5eec', '#2e2ee6'], logo: 'smartwatch' }}
          step="create"
          metricIndex={metricIds.length}
          handleUpdateMetric={handleUpdateMetric}
          key={metricIds.length}
        />
    </>
  return (
    <>
      <Paper className={classes.root}>
        {metricCards}
      </Paper>
      <div className={classes.fabContainer}>
        { isLoading &&
          <Fab aria-label="loading" className={classes.fab} color="primary">
            <CircularProgress color="inherit" />
          </Fab>
        }
        { !isLoading && 
          < Fab aria-label="save-metrics" className={classes.fab} color="primary" onClick={handleSaveGroup}>
            <SaveIcon />
          </Fab>
        }
    </div>
    </>
  );
}

let useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: theme.spacing(2),
  },
  metricCell: {
    flex: '0 0 50%',
  },
  fabContainer: {
  },
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

export default EditableGroup;
