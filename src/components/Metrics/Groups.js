import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import SaveIcon from '@material-ui/icons/Save';
import CircularProgress from '@material-ui/core/CircularProgress';
import Zoom from '@material-ui/core/Zoom';
import IconButton from '@material-ui/core/IconButton';

import UserContext from '../Firebase';
import AlertContext from '../Layout';
import Group from './Group';
import AddNewGroup from './AddNewGroup';
import FirstMetricCard from './FirstMetricCard';
import { SwitchIcon } from '../Icons';


function Groups() {
  let user = useContext(UserContext);
  let showAlert = useContext(AlertContext);
  let [groups, setGroups] = useState(user.getGroups());
  let [isEdited, setIsEdited] = useState(false);
  let [isLoading, setIsLoading] = useState(false);

  function handleSwapGroups(index1, index2) {
    let newGroups = [...groups];
    newGroups[index1] = groups[index2];
    newGroups[index2] = groups[index1];
    setGroups(newGroups);
    setIsEdited(true);
  }

  function handleSaveGroups() {
    setIsLoading(true);
    setIsEdited(false);
    user.updateGroups(groups, handleUpdateGroupsSuccess, handleUpdateGroupsError);
  }

  function handleUpdateGroupsSuccess() {
    setIsLoading(false);
    setIsEdited(false);
    showAlert('Metrics saved', 'success');
  }

  function handleUpdateGroupsError(error) {
    setIsLoading(false);
    showAlert(error.message, 'error');
  }

  let classes = useStyles();
  let nextGroupId = -1;
  for (let group of groups)
    nextGroupId = Math.max(nextGroupId, parseInt(group.id.slice(2)));
  nextGroupId = 'id' + (nextGroupId + 1);

  return (
    <div className={classes.cardList}>
      { groups.length === 0 &&
        <FirstMetricCard key="no-metrics" />
      }
      { groups.map((group, index) =>
        [
          index > 0 &&
          <IconButton key={'swap-' + index}
            aria-label="swap" variant="contained" onClick={() => handleSwapGroups(index - 1, index)} >
            <SwitchIcon variant="contained" />
          </IconButton>
          ,
          <Group
            key={group.id}
            group={group}
            metrics={group.metrics.map(metric_id => user.getMetric(metric_id))}
            isEditable={!isEdited}
          />
        ]
      )}
      <IconButton key={'hidden-swap'} style={{visibility: 'hidden'}}>
        <SwitchIcon />
      </IconButton>
      <AddNewGroup key="add-group" groupId={nextGroupId} />

      <Zoom
        key="save-metrics-button"
        in={isEdited || isLoading}
        timeout={200}
        unmountOnExit
      >
        {isLoading ?
          <Fab aria-label="loading" className={classes.fab} color="primary">
            <CircularProgress color="inherit" />
          </Fab>
          :
          <Fab aria-label="save-metrics" className={classes.fab} color="primary" onClick={handleSaveGroups}>
            <SaveIcon />
          </Fab>
        }
      </Zoom>
    </div>
  );
}

let useStyles = makeStyles(theme => ({
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

export default Groups;