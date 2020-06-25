import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
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

function EditableMetricCard({ metric, isNew, HandleDeleteMetric, nameRef, typeRef, descriptionRef, detailRefs }) {
  let [type, setType] = useState(metric.type);
  let [levels, setLevels] = useState(metric.type === 'rating' ? metric.details.length : 3);

  let detailTable = null;
  if (type === 'rating') {
    let details = [];
    for (let index = 0; index < levels; index++) {
      details.push(
        <TableRow key={index}>
          <TableCell component='th' scope='row'>{index}</TableCell>
          <TableCell >
            <TextField
              inputRef={detailRefs.current[index]}
              defaultValue={metric.type === 'rating' ? metric.details[index] : ''}
            />
          </TableCell>
        </TableRow>
      );
    }
    detailTable =
      <Table aria-label='detail-table'>
        <TableBody>{details}</TableBody>
      </Table>;
  }

  return (
    <Card>
      <CardHeader
        action={
          <IconButton aria-label="delete" onClick={() => HandleDeleteMetric(metric.id)}>
            <DeleteIcon />
          </IconButton>}
        title={
          <TextField
            inputRef={nameRef}
            defaultValue={metric.name}
            label="Name"
            variant="filled"
          />}
      />
      <CardContent>
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
        {type === 'rating' && levels < 25 &&
          <IconButton aria-label="add-level" onClick={() => setLevels(levels + 1)}>
            <AddIcon />
          </IconButton>}
        {type === 'rating' && levels > 2 &&
          <IconButton aria-label="remove-level" onClick={() => setLevels(levels - 1)}>
            <RemoveIcon />
          </IconButton>}
        <TextField
          inputRef={descriptionRef}
          defaultValue={metric.description}
          label="Description"
          fullWidth={true}
        />
        {detailTable}
      </CardContent>
    </Card>
  );
}

export default EditableMetricCard;
