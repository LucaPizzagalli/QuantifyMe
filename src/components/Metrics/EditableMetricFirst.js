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
import StarIcon from '@material-ui/icons/Star';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import FunctionsIcon from '@material-ui/icons/Functions';

import { logos, iconColors, logoNames } from '../CustomIcons'


function EditableMetricFirst({ metric, step, isUnique, handleSwapMetrics, handleUpdateMetric, handleRemoveMetric }) {
  let [thisStep, setThisStep] = useState(step);
  let [colorIndex, setColorIndex] = useState(0);

  function handleTypeSelection(newType) {
    let newLogoIndex = Math.floor(Math.random() * logos.size);
    let newColorIndex = Math.floor(Math.random() * iconColors.length);
    setColorIndex(newColorIndex);
    let newMetric = { id: null, type: newType, color: iconColors[newColorIndex], logo: logoNames[newLogoIndex] };
    if (newType === 'rating')
      newMetric.length = 4;
    handleUpdateMetric(newMetric);
    setThisStep('edit');
  }

  function handleEject() {
    // TODO
  }

  function handleChangeColor(isNext) {
    let newColorIndex = (iconColors.length + colorIndex + isNext * 2 - 1) % iconColors.length;
    setColorIndex(newColorIndex);
    handleUpdateMetric({ ...metric, color: iconColors[newColorIndex] });
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
          <IconButton aria-label="delete" onClick={() => handleRemoveMetric(metric.id, 0)}>
            <DeleteIcon />
          </IconButton>
        </div>
        <div className={classes.horizontalFlex}>
          <IconButton aria-label="move-before" onClick={() => handleSwapMetrics(-1, 0)} style={isUnique ? { visibility: 'hidden' } : {}}>
            <NavigateBeforeIcon />
          </IconButton>
          {metric.type === 'rating' &&
            <div className={classes.horizontalFlex}>
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
                size="large"
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
          {metric.type === 'number' &&
            <div className={classes.horizontalFlex}>
              1234
            </div>
          }
          {metric.type === 'text' &&
            <div className={classes.horizontalFlex}>
              Text
            </div>
          }
          <IconButton aria-label="move-next" onClick={() => handleSwapMetrics(0, 1)} style={isUnique ? { visibility: 'hidden' } : {}}>
            <NavigateNextIcon />
          </IconButton>
        </div>
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
      <Paper className={classes.root} variant="outlined" classes={{ outlined: classes.outlined }}>
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
}


let useStyles = makeStyles(theme => ({
  root: {
    width: '80%',
    display: 'flex',
    flexDirection: 'column',
    margin: theme.spacing(1),
    padding: theme.spacing(2),
    alignItems: 'stretch',
  },
  outlined: {
    borderWidth: '2px',
  },
  buttonsGrid: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  buttonCell: {
    flex: '0 0 33.333333%',
    display: 'flex',
    alignItems: 'stretch',
    justifyContent: 'space-around',
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
  underline: { '&::after': { borderColor: props => props.col } },
}));

export default EditableMetricFirst;
