import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Input from '@material-ui/core/Input';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

function EditableMetricCard({ metric, isNew, HandleDeleteMetric, nameRef, typeRef, descriptionRef, rangeRef, detailRefs }) {
  let [type, setType] = useState(metric.type);
  let [levels, setLevels] = useState(metric.type === 'rating' ? metric.details.length : 3);
  let [range, setRange] = useState(metric.type === 'number' ? metric.range : [0, 10]);
  let [maxRange, setMaxRange] = useState([-100, 100]);

  function handleChangeRange(index, value) {
    if (Math.abs(value) > Math.abs(maxRange[index])) {
      let newMaxRange = maxRange.slice();
      newMaxRange[index] = value
      setMaxRange(newMaxRange);
    }
    let newRange = range.slice();
    newRange[index] = value
    console.log(newRange)
    setRange(newRange);
  }

  let classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardHeader
        action={
          <IconButton aria-label="delete" onClick={() => HandleDeleteMetric(metric.id)}>
            <DeleteIcon />
          </IconButton>}
        title='Create Metric'
      />
      <CardContent>
        <TextField
          inputRef={nameRef}
          defaultValue={metric.name}
          label="Name"
        />
        {isNew ?
          <FormControl>
            <InputLabel id="type-label">Type</InputLabel>
            <Select
              inputRef={typeRef}
              labelId="type-label"
              id="type-select"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <MenuItem value={'rating'}>Rating</MenuItem>
              <MenuItem value={'text'}>Text</MenuItem>
              <MenuItem value={'number'}>Number</MenuItem>
            </Select>
          </FormControl>
          :
          <>
            <input value={type} ref={typeRef} type="hidden" />
            <p>{type}</p>
          </>
        }
        {type === 'rating' && levels < 10 &&
          <IconButton aria-label="add-level" onClick={() => setLevels(levels + 1)}>
            <AddIcon />
          </IconButton>}
        {type === 'rating' && levels > 2 &&
          <IconButton aria-label="remove-level" onClick={() => setLevels(levels - 1)}>
            <RemoveIcon />
          </IconButton>}
        {type === 'number' &&
          <div>
            <Typography id="range-slider" gutterBottom>
              Metric range
            </Typography>
            <div className={classes.horizontalFlex}>
              <Input
                inputRef={rangeRef.current[0]}
                value={range[0]}
                margin="dense"
                onChange={(e) => handleChangeRange(0, Number(e.target.value))}
                inputProps={{
                  step: 1,
                  type: 'number',
                  'aria-labelledby': 'range-slider',
                }}
                style={{ width: 62, margin: '2rem' }}
              />
              <Slider
                min={maxRange[0]}
                max={maxRange[1]}
                value={range}
                onChange={(_, newRange) => setRange(newRange)}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
              />
              <Input
                inputRef={rangeRef.current[1]}
                value={range[1]}
                margin="dense"
                onChange={(e) => handleChangeRange(1, Number(e.target.value))}
                inputProps={{
                  step: 1,
                  type: 'number',
                  'aria-labelledby': 'range-slider',
                }}
                style={{ width: 62, margin: '2rem' }}
              />
            </div>
          </div>
        }
        <TextField
          inputRef={descriptionRef}
          defaultValue={metric.description}
          label="Description"
          fullWidth={true}
        />
        {
          type === 'rating' &&
          <Table aria-label='detail-table'>
            <TableBody>
              {[...Array(levels).keys()].map(index =>
                <TableRow key={index}>
                  <TableCell component='th' scope='row'>{index}</TableCell>
                  <TableCell >
                    <TextField
                      inputRef={detailRefs.current[index]}
                      defaultValue={metric.type === 'rating' ? metric.details[index] : ''}
                      fullWidth={true}
                    />
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        }
      </CardContent >
    </Card >
  );
}

let useStyles = makeStyles((theme) => ({
  card: {
    // maxWidth: 345,
    flexGrow: 1
  },
  horizontalFlex: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

export default EditableMetricCard;
