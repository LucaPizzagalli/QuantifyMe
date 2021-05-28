import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Rating from '@material-ui/lab/Rating';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EjectIcon from '@material-ui/icons/Eject';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import Button from '@material-ui/core/Button';
import CardActionArea from '@material-ui/core/CardActionArea';
import StarIcon from '@material-ui/icons/Star';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import FunctionsIcon from '@material-ui/icons/Functions';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';

import { logos, iconColors, logoNames } from '../CustomIcons'
import { Typography } from '@material-ui/core';


function EditableMetric({ metric, step, metricIndex, handleSwapMetrics, handleUpdateMetric, handleRemoveMetric }) {
  let [thisStep, setThisStep] = useState(step);
  let [colorIndex, setColorIndex] = useState(iconColors.indexOf(metric.color));
  let [logoIndex, setLogoIndex] = useState(logoNames.indexOf(metric.logo));

  function handleTypeSelection(newType) {
    let newLogoIndex = Math.floor(Math.random() * logos.size);
    setLogoIndex(newLogoIndex);
    let newColorIndex = Math.floor(Math.random() * iconColors.length);
    setColorIndex(newColorIndex);
    let newMetric = { id: null, type: newType, color: iconColors[newColorIndex], logo: logoNames[newLogoIndex] };
    if (newType === 'rating')
      newMetric.length = 4;
    handleUpdateMetric(newMetric);
    setThisStep('edit');
  }

  function handleEject() {

  }

  function handleAskRemoveMetric() {
    setThisStep('delete');
  }

  function handleChangeColor(isNext) {
    let newColorIndex = (iconColors.length + colorIndex + isNext * 2 - 1) % iconColors.length;
    setColorIndex(newColorIndex);
    handleUpdateMetric({ ...metric, color: iconColors[newColorIndex] });
  }

  function handleChangeLogo(isNext) {
    let newLogoIndex = (logoNames.length + logoIndex + isNext * 2 - 1) % logoNames.length;
    setLogoIndex(newLogoIndex);
    handleUpdateMetric({ ...metric, logo: logoNames[newLogoIndex] });
  }

  function handleChangeName(e) {
    handleUpdateMetric({ ...metric, name: e.target.value });
  }

  let classes = useStyles(metric.color ? { col: metric.color[0] } : {});
  if (thisStep === 'edit')
    return (
      <Paper className={classes.root} variant="outlined" classes={{ outlined: classes.outlined }}>
        <div className={classes.horizontalFlex}>
          <div className={classes.colorCell}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleChangeColor(true)}
              onContextMenu={e => { handleChangeColor(false); e.preventDefault() }}
              style={{ background: metric.color[1] }}
            >
              Color
            </Button>
          </div>
          <IconButton aria-label="eject" onClick={handleEject}>
            <EjectIcon />
          </IconButton>
          <IconButton aria-label="delete" onClick={handleAskRemoveMetric}>
            <DeleteIcon />
          </IconButton>
        </div>
        <div className={classes.horizontalFlex}>
          <IconButton aria-label="move-before" onClick={() => handleSwapMetrics(metricIndex - 1, metricIndex)}>
            <NavigateBeforeIcon />
          </IconButton>
          <div className={classes.logo}>
            <LogoChooser color={metric.color} logoIndex={logoIndex} handleChangeLogo={handleChangeLogo} />
          </div>
          <IconButton aria-label="move-next" onClick={() => handleSwapMetrics(metricIndex, metricIndex + 1)}>
            <NavigateNextIcon />
          </IconButton>
        </div>
        { metric.type === 'rating' &&
          <div className={classes.horizontalFlex2}>
            <IconButton
              aria-label="remove-level"
              onClick={() => handleUpdateMetric({ ...metric, length: (metric.length - 1) })}
              disabled={metric.length <= 2}
            >
              <RemoveIcon />
            </IconButton>
            <Rating
              value={metric.length}
              max={metric.length}
              readOnly
              style={{ color: metric.color[0] }}
            />
            <IconButton
              aria-label="add-level"
              onClick={() => handleUpdateMetric({ ...metric, length: (metric.length + 1) })}
              disabled={metric.length >= 6}
            >
              <AddIcon />
            </IconButton>
          </div>
        }
        { metric.type === 'number' &&
          <div className={classes.horizontalFlex2}>
            1234
          </div>
        }
        { metric.type === 'text' &&
          <div className={classes.horizontalFlex2}>
            Text
          </div>
        }
        <TextField
          label="Name"
          onChange={handleChangeName}
          value={metric.name}
          InputProps={{ classes: { underline: classes.underline } }}
          InputLabelProps={{ style: { color: metric.color[0] } }}
        />
      </Paper>
    );
  if (thisStep === 'choose')
    return (
      <Paper className={classes.chooseRoot} variant="outlined" classes={{ outlined: classes.outlined }}>
        <div className={classes.buttonsGrid}>
          <div className={classes.buttonCell}>
            <IconButton
              aria-label="rating"
              onClick={() => handleTypeSelection('rating')}
            >
              <StarIcon />
            </IconButton>
          </div>
          <div className={classes.buttonCell}>
            <IconButton
              aria-label="number"
              onClick={() => handleTypeSelection('number')}
            >
              <FunctionsIcon />
            </IconButton>
          </div>
          <div className={classes.buttonCell}>
            <IconButton
              aria-label="text"
              onClick={() => handleTypeSelection('text')}
            >
              <TextFieldsIcon />
            </IconButton>
          </div>
          <div className={classes.buttonCell}>
            <IconButton
              aria-label="boolean"
              onClick={() => handleTypeSelection('boolean')}
            >
              <CheckBoxIcon />
            </IconButton>
          </div>
          <div className={classes.buttonCell}>
            <IconButton
              aria-label="image"
              onClick={() => handleTypeSelection('image')}
            >
              <DeleteIcon />
            </IconButton>
          </div>
          <div className={classes.buttonCell}>
            <IconButton
              aria-label="media"
              onClick={() => handleTypeSelection('media')}
            >
              <DeleteIcon />
            </IconButton>
          </div>
        </div>
      </Paper>
    );
  if (thisStep === 'create')
    return (
      <Paper className={classes.createRoot} variant="outlined" classes={{ outlined: classes.outlined }}>
        <CardActionArea
          onClick={() => setThisStep('choose')}
          className={classes.horizontalFlex2} >
          <AddIcon className={classes.addIcon} />
        </CardActionArea>
      </Paper>
    );
  if (thisStep === 'delete')
    return (
        <Alert icon={false} severity="warning" variant="outlined" className={classes.root}>
          <AlertTitle>Delete Metric</AlertTitle>
          <Typography>
            If you delete this metric, all associated records will also be deleted.
            Consider just ejecting the metric: you will not be able to log new values but you will keep the old data.
          </Typography>
          <div className={classes.horizontalFlex2}>
            <Button
              variant="contained"
              onClick={() => handleRemoveMetric(metric.id, metricIndex)}
            >
              Delete
            </Button>
            <Button
              variant="outlined"
            >
              Eject
            </Button>
            <Button
              variant="outlined"
            >
              Undo
            </Button>
          </div>
        </Alert>
    );
}


function LogoChooser({ color, logoIndex, handleChangeLogo }) {
  return (
    <>
      <CardActionArea
        onClick={() => handleChangeLogo(true)}
        onContextMenu={e => { handleChangeLogo(false); e.preventDefault(); }}
        style={{ borderRadius: '1rem' }}
      >
        {logos.get(logoNames[logoIndex])({ color: color })}
      </CardActionArea>
    </>
  );
}


let useStyles = makeStyles(theme => ({
  root: {
    flex: '0 0 50%',
    display: 'flex',
    height: '100%',
    flexDirection: 'column',
    margin: theme.spacing(2),
    padding: theme.spacing(2),
    alignItems: 'stretch',
  },
  chooseRoot: {
    flex: '0 0 50%',
    display: 'flex',
    flexDirection: 'column',
    margin: theme.spacing(2),
    padding: theme.spacing(2),
    alignItems: 'stretch',
  },
  outlined: {
    borderWidth: '2px',
  },
  createRoot: {
    flex: '0 0 50%',
    display: 'flex',
    flexDirection: 'column',
    margin: theme.spacing(2),
    alignItems: 'stretch',
  },
  buttonsGrid: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  buttonCell: {
    flex: '0 0 50%',
    display: 'flex',
    alignItems: 'stretch',
    justifyContent: 'space-around'
  },
  colorCell: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
  },
  horizontalFlex: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  horizontalFlex2: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  logo: {
    maxWidth: '9rem',
  },
  addIcon: {
    color: theme.palette.action.active,
    margin: theme.spacing(3),
    fontSize: '2.5rem',
  },
  underline: { '&::after': { borderColor: props => props.col } },
}));

export default EditableMetric;
