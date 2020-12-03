import React, { useState, useContext, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import SaveIcon from '@material-ui/icons/Save';
import CircularProgress from '@material-ui/core/CircularProgress';
import Zoom from '@material-ui/core/Zoom';
import UserContext from '../Firebase';
import AlertContext from '../Layout';
import MetricCard from './MetricCard';
import EditableMetricCard from './EditableMetricCard';
import DeletedMetricCard from './DeletedMetricCard';
import FirstMetricCard from './FirstMetricCard';
import IconButton from '@material-ui/core/IconButton';
import { SwitchIcon } from '../Icons';


function MetricList() {
  let user = useContext(UserContext);
  let showAlert = useContext(AlertContext);
  let [metrics, setMetrics] = useState(user.getMetrics());
  let [editable, setEditable] = useState({ id: null, delete: false, new: false });
  let [isLoading, setIsLoading] = useState(false);
  let nameRef = useRef();
  let typeRef = useRef();
  let descriptionRef = useRef();
  let logoRef = useRef();
  let color1Ref = useRef();
  let color2Ref = useRef();
  let rangeRef = useRef([React.createRef(), React.createRef()]);
  let detailRefs = useRef((new Array(25).fill(0)).map(() => React.createRef()));

  function HandleAddMetric() {
    let maxId = -1;
    for (let metric of metrics)
      maxId = Math.max(maxId, parseInt(metric.id.slice(2)));
    let newMetric = {
      id: 'id' + (maxId + 1),
      name: '',
      type: 'text',
      description: '',
      details: [],
      logo: null,
      color: null,
    };
    setMetrics([...metrics, newMetric]);
    setEditable({ id: newMetric.id, delete: false, new: true });
  }

  function HandleEditMetric(id) {
    setEditable({ id: id, delete: false, new: false });
  }

  function HandleDeleteMetric(id) {
    setEditable({ id: id, delete: true, new: false });
  }

  function HandleSwapMetrics(index1, index2) {
    let newMetrics = [...metrics];
    newMetrics[index1] = metrics[index2];
    newMetrics[index2] = metrics[index1];
    setMetrics(newMetrics);
    if (!editable.id)
      setEditable({ id: -1, delete: false, new: false });
  }

  function HandleSaveMetrics() {
    setIsLoading(true);
    let newMetrics = null;
    if (editable.delete) {
      for (let [index, metric] of metrics.entries())
        if (metric.id === editable.id) {
          newMetrics = [...metrics.slice(0, index), ...metrics.slice(index + 1)];
          break;
        }
    }
    else if (editable.id !== -1) {
      let newMetric = {
        id: editable.id,
        name: nameRef.current.value,
        type: typeRef.current.value,
        description: descriptionRef.current.value,
        logo: logoRef.current.value,
        color: [color1Ref.current.value, color2Ref.current.value],
      };
      if (newMetric.type === 'number')
        newMetric['range'] = [Number(rangeRef.current[0].current.value), Number(rangeRef.current[1].current.value)];
      if (newMetric.type === 'rating') {
        let details = [];
        for (let ref of detailRefs.current) {
          if (ref.current)
            details.push(ref.current.value);
        }
        newMetric['details'] = details;
      }
      for (let [index, metric] of metrics.entries())
        if (metric.id === editable.id) {
          newMetrics = [...metrics.slice(0, index), newMetric, ...metrics.slice(index + 1)];
          break;
        }
    }
    else
      newMetrics = metrics;
    setEditable({ id: null, delete: false, new: false });
    setMetrics(newMetrics);
    user.updateMetrics(newMetrics, editable.new ? editable.id : null, editable.delete ? editable.id : null, handleUpdateMetricsSuccess, handleUpdateMetricsError);
  }

  function handleUpdateMetricsSuccess() {
    setIsLoading(false);
    showAlert('Metrics saved', 'success');
  }

  function handleUpdateMetricsError(error) {
    setIsLoading(false);
    showAlert(error.message, 'error');
  }

  let ids = [];
  let statics = [];
  let metricCards = metrics.map(metric => {
    ids.push(metric.id);
    if (metric.id === editable.id) {
      statics.push(metric.id);
      if (editable.delete)
        return (
          <DeletedMetricCard key={metric.id} />
        );
      else {
        return (
          <EditableMetricCard
            key={metric.id}
            metric={metric}
            isNew={editable.new}
            HandleDeleteMetric={HandleDeleteMetric}
            nameRef={nameRef}
            typeRef={typeRef}
            descriptionRef={descriptionRef}
            color1Ref={color1Ref}
            color2Ref={color2Ref}
            logoRef={logoRef}
            rangeRef={rangeRef}
            detailRefs={detailRefs} />
        );
      }
    }
    else
      return (
        <MetricCard
          key={metric.id}
          metric={metric}
          interactive={editable.id == null}
          HandleEditMetric={HandleEditMetric} />
      );
  });
  if (metrics.length === 0) {
    ids.push('firstMetric');
    metricCards = [<FirstMetricCard key="no-metrics"/>];
  }

  let classes = useStyles();
  return (
    <div className={classes.cardList}>
      { metricCards.map((card, index) =>
        [
          index > 0 &&
            <IconButton key={'swap-' + index}
              aria-label="swap" variant="contained" onClick={() => HandleSwapMetrics(index - 1, index)} >
              <SwitchIcon variant="contained" />
            </IconButton>,
          card
        ]
      )}
      <Zoom
        key="add-metric-button"
        in={editable.id == null}
        timeout={200}
        style={{
          transitionDelay: `${editable.id == null ? 200 : 0}ms`,
        }}
        unmountOnExit
      >
        <Fab aria-label="Add metric" className={classes.fab} color="primary" onClick={HandleAddMetric}>
          {isLoading ?
            <CircularProgress color="inherit" /> :
            <AddIcon />}
        </Fab>
      </Zoom>
      <Zoom
        key="save-metrics-button"
        in={editable.id != null}
        timeout={200}
        style={{
          transitionDelay: `${editable.id != null ? 200 : 0}ms`,
        }}
        unmountOnExit
      >
        <Fab aria-label="Save metrics" className={classes.fab} color="primary" onClick={HandleSaveMetrics}>
          <SaveIcon />
        </Fab>
      </Zoom>
    </div>
  );
}

let useStyles = makeStyles((theme) => ({
  cardList: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

export default MetricList;