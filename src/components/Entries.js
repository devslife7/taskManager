import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  // FormControlLabel,
  Grid,
  makeStyles,
  Slider,
  // Switch,
  TextField,
  Typography,
} from "@material-ui/core"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
// import { fetchCurrentMilestone } from "../actions/milestones"
import AddIcon from "@material-ui/icons/Add"
import { fetchCurrentTask } from "../actions/tasks"
import EntriesTable from "./EntriesTable"
import { fromUnixTime, format } from "date-fns"
import DateFnsUtils from "@date-io/date-fns"
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers"

const useStyles = makeStyles(theme => ({
  button: {
    textTransform: "none",
    fontSize: "1rem",
    color: "white",
    marginLeft: "10vw",
    marginTop: "2vh",
  },
}))

function Entries() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const currentTask = useSelector(state => state.tasks.currentTask)
  const [openDialog, setOpenDialog] = useState(false)
  const [sliderValue, setSliderValue] = useState("50")

  const handleOpenDialog = () => setOpenDialog(true)
  const handleCloseDialog = () => setOpenDialog(false)

  useEffect(() => {
    !!localStorage.currentTaskId && dispatch(fetchCurrentTask())
    console.log("ENTRIS DID MOUNT HERE")
  }, [dispatch])

  function valuetext(value) {
    console.log("THIS IS VALUE: ", value)
    setSliderValue(value)
    return `${value}°C`
  }

  const marks = [
    {
      value: 5,
      label: "5%",
    },
    {
      value: 25,
      label: "25%",
    },
    {
      value: 50,
      label: "50%",
    },
    {
      value: 75,
      label: "75%",
    },
    {
      value: 100,
      label: "100%",
    },
  ]

  return (
    <div style={{ padding: "0 50px", height: "90vh", overflow: "scroll" }}>
      <Typography variant='h6' align='center'>
        {currentTask.notes}
      </Typography>
      <Typography variant='subtitle1' align='center'>
        {!!currentTask.start_date && (
          <>
            {format(fromUnixTime(currentTask.start_date), "PP")} -{" "}
            {format(fromUnixTime(currentTask.end_date), "PP")}
          </>
        )}
      </Typography>
      <Typography variant='subtitle1' align='center'>{`Progress: ${currentTask.progress}%`}</Typography>
      <Typography variant='subtitle1' align='center'>{`Hours: ${currentTask.hours}`}</Typography>
      <Typography variant='subtitle1' align='center'>{`Owner(s): Owner`}</Typography>

      <Button
        variant='contained'
        color='primary'
        startIcon={<AddIcon />}
        className={classes.button}
        onClick={handleOpenDialog}>
        Add Entry
      </Button>

      <EntriesTable />

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <Typography variant='h5' style={{ marginTop: "20px", marginLeft: "30px" }}>
          {"New Entry"}
        </Typography>

        {/* <FormControlLabel
          control={
            <Switch
              checked={displayImport}
              onChange={() => setDisplayImport(!displayImport)}
              name='checkedB'
              color='primary'
            />
          }
          label='Import From Excel File'
          style={{ marginTop: "20px", marginLeft: "15px", marginBottom: "10px" }}
        /> */}

        <DialogContent className={classes.DialogContent}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justify='flex-start'>
              <KeyboardDatePicker
                disableToolbar
                variant='inline'
                format='MM/dd/yyyy'
                margin='normal'
                id='date-picker-inline'
                label='Date'
                // value={startDate}
                // onChange={handleSetStartDate}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
                className={classes.KeyboardDatePicker}
              />
            </Grid>
          </MuiPickersUtilsProvider>

          <Typography id='discrete-slider-small-steps' gutterBottom style={{ margin: "20px 0px 30px 0px" }}>
            Progress:
          </Typography>
          <Slider
            defaultValue={50}
            // getAriaValueText={valuetext}
            aria-labelledby='discrete-slider-small-steps'
            step={5}
            marks={marks}
            min={5}
            max={100}
            valueLabelDisplay='on'
            style={{ marginBottom: "30px" }}
          />

          <TextField
            variant='outlined'
            margin='normal'
            fullWidth
            multiline
            rows={2}
            label='Notes'
            // value={description}
            onChange={e => {
              // setDescription(e.target.value)
            }}
          />
        </DialogContent>

        <DialogActions>
          <Button variant='contained' className={classes.button} onClick={handleCloseDialog} color='primary'>
            Cancel
          </Button>
          <Button variant='contained' className={classes.button} onClick={handleCloseDialog} color='primary'>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default Entries
