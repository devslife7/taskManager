import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  Grid,
  Input,
  InputLabel,
  makeStyles,
  Switch,
  TextField,
  Typography
} from "@material-ui/core"
import React, { useState } from "react"
import OverviewGraph from "./OverviewGraph"
import AddIcon from "@material-ui/icons/Add"
import { useDispatch } from "react-redux"

import DateFnsUtils from "@date-io/date-fns"
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers"

const useStyles = makeStyles(theme => ({
  button: {
    textTransform: "none",
    margin: "5vh 0 0 10vw",
    fontSize: "1rem",
    backgroundColor: "#2b9af7"
  },
  KeyboardDatePicker: {
    // width: "7.5vw"
    width: "140px"
  },
  DialogContent: {
    height: "250px",
    width: "350px"
  }
}))

export default function Overview() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [openDialog, setOpenDialog] = useState(false)
  const [displayImport, setDisplayImport] = useState(false)
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  const [importFile, setImportFile] = useState("")

  const handleOpenDialog = () => setOpenDialog(true)
  const handleCloseDialog = () => setOpenDialog(false)
  const handleSetStartDate = date => setStartDate(date)
  const handleSetEndDate = date => setEndDate(date)

  // const handleAddProject = e => {
  //   setShowForm(!showForm)
  // }

  // const handleSubmit = e => {
  //   e.preventDefault()

  //   const projURL = "http://localhost:3000/projects"

  //   const configObj = {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "Application/json"
  //     },
  //     body: JSON.stringify({
  //       project: {
  //         name: name,
  //         description: description,
  //         start_date: startDate,
  //         deadline: endDate,
  //         completion_percentage: "0%"
  //       }
  //     })
  //   }

  //   fetch(projURL, configObj)
  //     .then(resp => resp.json())
  //     .then(data => dispatch(addProject(data)))

  //   setShowForm(false)
  //   setName("")
  //   setDescription("")
  //   setStartDate("")
  //   setEndDate("")
  // }

  return (
    <div style={{ backgroundColor: "#fafafa" }}>
      <Button
        variant='contained'
        color='secondary'
        startIcon={<AddIcon />}
        className={classes.button}
        onClick={handleOpenDialog}
      >
        Add Project
      </Button>
      <OverviewGraph />

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <Typography variant='h5' style={{ marginTop: "20px", marginLeft: "30px" }}>
          {"Create New Project"}
        </Typography>

        <FormControlLabel
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
        />

        {displayImport ? (
          <DialogContent className={classes.DialogContent}>
            <InputLabel htmlFor='my-input' style={{ margin: "20px 0px" }}>
              Select Import File
            </InputLabel>
            <input
              id='customFile'
              type='file'
              onChange={e => setImportFile(e.target.files[0])}
              // style={{ color: "red", backgroundColor: "yellow" }}
            />
          </DialogContent>
        ) : (
          <DialogContent className={classes.DialogContent}>
            <TextField
              variant='outlined'
              margin='normal'
              fullWidth
              label='Name'
              value={name}
              onChange={e => {
                setName(e.target.value)
              }}
            />
            <TextField
              variant='outlined'
              margin='normal'
              fullWidth
              label='Description'
              value={description}
              onChange={e => {
                setDescription(e.target.value)
              }}
            />
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid container justify='space-around'>
                <KeyboardDatePicker
                  disableToolbar
                  variant='inline'
                  format='MM/dd/yyyy'
                  margin='normal'
                  id='date-picker-inline'
                  label='Start Date'
                  value={startDate}
                  onChange={handleSetStartDate}
                  KeyboardButtonProps={{
                    "aria-label": "change date"
                  }}
                  className={classes.KeyboardDatePicker}
                />
                <KeyboardDatePicker
                  disableToolbar
                  variant='inline'
                  format='MM/dd/yyyy'
                  margin='normal'
                  id='date-picker-inline'
                  label='End Date'
                  value={endDate}
                  onChange={handleSetEndDate}
                  KeyboardButtonProps={{
                    "aria-label": "change date"
                  }}
                  className={classes.KeyboardDatePicker}
                />
              </Grid>
            </MuiPickersUtilsProvider>
          </DialogContent>
        )}

        <DialogActions>
          <Button
            variant='contained'
            className={classes.button}
            onClick={handleCloseDialog}
            color='primary'
          >
            Cancel
          </Button>
          <Button
            variant='contained'
            className={classes.button}
            onClick={handleCloseDialog}
            color='primary'
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
