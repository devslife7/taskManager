import { Button, makeStyles } from '@material-ui/core'
import React, { useState } from 'react'
import OverviewGraph from './OverviewGraph'
import AddIcon from '@material-ui/icons/Add'
import AddProjectDialog from '../Projects/AddProjectDialog'

const useStyles = makeStyles(theme => ({
  button: {
    textTransform: 'none',
    margin: '5vh 0 0 10vw',
    fontSize: '1rem',
  },
  AddProjectButton: {
    textTransform: 'none',
    margin: '5vh 0 0 17.5vw',
    fontSize: '1rem',
  },
  KeyboardDatePicker: {
    width: '140px',
  },
  DialogContent: {
    height: '250px',
    width: '350px',
  },
}))

export default function Overview() {
  const classes = useStyles()
  // const dispatch = useDispatch()
  const [openDialog, setOpenDialog] = useState(false)
  // const [importFile, setImportFile] = useState("")

  const handleOpenDialog = () => setOpenDialog(true)
  const handleCloseDialog = () => {
    setOpenDialog(false)
    // setImportFile("")
    // setDisplayImport(false)
  }

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
    <div>
      <Button
        variant='contained'
        color='primary'
        startIcon={<AddIcon />}
        className={classes.AddProjectButton}
        onClick={handleOpenDialog}
      >
        Add Project
      </Button>
      <OverviewGraph />

      <AddProjectDialog open={openDialog} onClose={handleCloseDialog} />
    </div>
  )
}
