import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExportData from './ExportData'
import ImportData from './ImportData'
import EraseData from './EraseData';

function DataSettings() {
  let classes = useStyles();
  return (
    <>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="export-data"
          id="export-data" >
          <Typography>Export Data</Typography>
        </AccordionSummary>
        <AccordionDetails className={classes.accordion}>
          <ExportData />
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="import-data"
          id="import-data" >
          <Typography>Import Data</Typography>
        </AccordionSummary>
        <AccordionDetails className={classes.accordion}>
          <ImportData />
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="erase-data"
          id="erase-data" >
          <Typography>Erase Data</Typography>
        </AccordionSummary>
        <AccordionDetails className={classes.accordion}>
          <EraseData />
        </AccordionDetails>
      </Accordion>
    </>
  );
}

let useStyles = makeStyles(theme => ({
  accordion: {
    display: 'flex',
    flexDirection: 'column',
    // alignItems: 'center',
  },
}));

export default DataSettings;