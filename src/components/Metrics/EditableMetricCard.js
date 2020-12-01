import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Slider from '@material-ui/core/Slider';
import Rating from '@material-ui/lab/Rating';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import CardActionArea from '@material-ui/core/CardActionArea';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import StarIcon from '@material-ui/icons/Star';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import FunctionsIcon from '@material-ui/icons/Functions';
import { customIcons, iconColors } from '../CustomIcons'


function EditableMetricCard({ metric, isNew, HandleDeleteMetric, nameRef, typeRef, descriptionRef, color1Ref, color2Ref, logoRef, rangeRef, detailRefs }) {
  let typeMapping = { 'rating': 0, 'bool': 1, 'text': 2, 'number': 3 };
  let mappingType = { 0: 'rating', 1: 'bool', 2: 'text', 3: 'number' };
  let [type, setType] = useState(typeMapping[metric.type]);

  let colors = [isNew ? iconColors[Math.floor(Math.random()*iconColors.length)] : metric.color].concat(iconColors);
  let [colorIndex, setColorIndex] = useState(0);

  let [levels, setLevels] = useState(metric.type === 'rating' ? metric.details.length : 3);
  let [range, setRange] = useState(metric.type === 'number' ? metric.range : [0, 10]);
  let [maxRange, setMaxRange] = useState([-100, 100]);

  function handleChangeRange(index, value) {
    if (Math.abs(value) > Math.abs(maxRange[index])) {
      let newMaxRange = maxRange.slice();
      newMaxRange[index] = value;
      setMaxRange(newMaxRange);
    }
    let newRange = range.slice();
    newRange[index] = value;
    setRange(newRange);
  }

  let classes = useStyles();
  return (
    <Paper className={classes.preRoot}>
      {isNew &&
        <Tabs
          value={type}
          onChange={(_, newType) => setType(newType)}
          variant="fullWidth"
          indicatorColor="primary"
          textColor="primary"
          aria-label="metric-types"
        >
          <Tab id="rating" aria-controls="rating" icon={<StarIcon />} aria-label="rating" />
          <Tab id="bool" aria-controls="bool" icon={<CheckBoxIcon />} aria-label="bool" />
          <Tab id="text" aria-controls="text" icon={<TextFieldsIcon />} aria-label="text" />
          <Tab id="number" aria-controls="number" icon={<FunctionsIcon />} aria-label="number" />
        </Tabs>
      }
      {!isNew &&
        <IconButton aria-label="delete" onClick={() => HandleDeleteMetric(metric.id)} className={classes.edit}>
          <DeleteIcon style={{ color: colors[colorIndex][0] }} />
        </IconButton>
      }
      <input value={mappingType[type]} ref={typeRef} type="hidden" />
      <input value={colors[colorIndex][0]} ref={color1Ref} type="hidden" />
      <input value={colors[colorIndex][1]} ref={color2Ref} type="hidden" />
      <div className={classes.root}>
        <div className={classes.logoColorLayout}>
          <LogoChooser color={colors[colorIndex]} logoRef={logoRef}
            currentName={isNew ? Array.from(customIcons.keys())[Math.floor(Math.random()*customIcons.size)] : metric.logo} />
          <Button
            variant="contained" color="primary"
            onClick={() => setColorIndex((colorIndex + 1) % colors.length)}
            style={{ background: colors[colorIndex][1], margin: '2rem' }} >
            Color
          </Button>
        </div>
        <div className={classes.nameTypeLayout}>
          <TextField
            className={classes.name}
            inputRef={nameRef}
            defaultValue={metric.name}
            label="Name"
          />
          {mappingType[type] === 'rating' &&
            <div className={classes.type}>
              <IconButton
                aria-label="remove-level"
                onClick={() => setLevels(levels - 1)}
                disabled={levels < 2}>
                <RemoveIcon />
              </IconButton>
              <Rating
                style={{ color: colors[colorIndex][0] }}
                value={levels}
                max={levels}
                size="large"
                readOnly />
              <IconButton
                aria-label="add-level"
                onClick={() => setLevels(levels + 1)}
                disabled={levels > 5}>
                <AddIcon />
              </IconButton>
            </div>
          }
          {mappingType[type] === 'number' &&
            <div className={classes.type}>
              <Input
                inputRef={rangeRef.current[0]}
                value={range[0]}
                onChange={(e) => handleChangeRange(0, Number(e.target.value))}
                inputProps={{ step: 1, type: 'number', 'aria-labelledby': 'range-slider' }}
                style={{ width: '5rem', margin: '2rem' }} />
              <Slider
                min={maxRange[0]}
                max={maxRange[1]}
                value={range}
                onChange={(_, newRange) => setRange(newRange)}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                style={{ color: colors[colorIndex][0] }} />
              <Input
                inputRef={rangeRef.current[1]}
                value={range[1]}
                onChange={(e) => handleChangeRange(1, Number(e.target.value))}
                inputProps={{ step: 1, type: 'number', 'aria-labelledby': 'range-slider' }}
                style={{ width: '5rem', margin: '2rem' }} />
            </div>
          }
          {mappingType[type] === 'text' &&
            <div className={classes.type}>
              Text
            </div>
          }
          <TextField
            className={classes.description}
            inputRef={descriptionRef}
            defaultValue={metric.description}
            label="Description"
            multiline
            fullWidth={true} />
        </div>
      </div>
      {
        mappingType[type] === 'rating' &&
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
    </Paper >


    // {
    // isNew ?
    //   <FormControl>
    //     <InputLabel id="type-label">Type</InputLabel>
    //     <Select
    //       inputRef={typeRef}
    //       labelId="type-label"
    //       id="type-select"
    //       value={type}
    //       onChange={(e) => setType(e.target.value)}
    //     >
    //       <MenuItem value={'rating'}>Rating</MenuItem>
    //       <MenuItem value={'text'}>Text</MenuItem>
    //       <MenuItem value={'number'}>Number</MenuItem>
    //     </Select>
    //   </FormControl>
    //   :
    //   <>
    //     <input value={type} ref={typeRef} type="hidden" />
    //     <p>{type}</p>
    //   </>
    // }
  );
}


function LogoChooser({ color, logoRef, currentName }) {
  let [iconIndex, setIconIndex] = useState(Array.from(customIcons.keys()).indexOf(currentName));

  let name = Array.from(customIcons.keys())[iconIndex];
  return (
    <>
      <input value={name} ref={logoRef} type="hidden" />
      <CardActionArea onClick={() => setIconIndex((iconIndex + 1) % customIcons.size)} style={{ borderRadius: '1rem' }}>
        {customIcons.get(name)({ color:color } )}
      </CardActionArea>
    </>
  );
}


let useStyles = makeStyles((theme) => ({
  preRoot: {
    width: '100%',
    position: 'relative',
    display: 'flex',
    padding: '1rem 2rem 1rem 2rem',
    flexDirection: 'column',
  },
  root: {
    flexGrow: 1,
    display: 'flex',
  },
  logoColorLayout: {
    flex: '1 1 20%',
    margin: '2rem 2rem 2rem 2rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  nameTypeLayout: {
    flex: '3 3 80%',
    margin: '1rem 2rem 1rem 2rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  name: {
    margin: '1rem 0 1rem 0',
  },
  type: {
    margin: '1rem 0 1rem 0',
    width: '80%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  description: {
    flexGrow: 1,
    margin: '1rem 0 1rem 0',
  },
  edit: {
    position: 'absolute',
    top: '0.5rem',
    right: '0.5rem',
  },
  col1: { fill: props => props.col1, },
  col2: { fill: props => props.col2, },
  col3: { fill: props => props.col3, },
  col4: { fill: props => props.col4, },
}));

export default EditableMetricCard;
