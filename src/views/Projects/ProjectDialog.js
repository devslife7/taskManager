import React, { useEffect, useState } from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  FormControlLabel,
  Grid,
  InputLabel,
  Switch,
  TextField,
  Typography,
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { useDispatch } from 'react-redux'
import { addProjectFetch, editProjectFetch } from '../../redux/actions/projects'
import { addDays, fromUnixTime, getUnixTime } from 'date-fns'
import * as XLSX from 'xlsx'
import ProjectPreviewTable from './ProjectPreviewTable'

const useStyles = makeStyles(theme => ({
  button: {
    fontSize: '1rem',
  },
  KeyboardDatePicker: {
    width: '140px',
  },
  DialogContent: {
    // height: '250px',
    width: '450px',
  },
}))

export default function ProjectDialog({ open, onClose, project = {} }) {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  const [displayImport, setDisplayImport] = useState(false)
  const [data, setData] = useState([])
  // console.log(startDate)
  // console.log(new Date('07/21/2021'))

  useEffect(() => {
    if (project.id) {
      setName(project.name)
      setDescription(project.description)
      setStartDate(fromUnixTime(project.start_date))
      setEndDate(fromUnixTime(project.end_date))
    }
  }, [project])

  const handleSetStartDate = date => setStartDate(date)
  const handleSetEndDate = date => setEndDate(date)

  const addProjectClearForm = requestBody => {
    dispatch(addProjectFetch(requestBody))
    setName('')
    setDescription('')
    setStartDate(new Date())
    setEndDate(new Date())
  }

  const handleSubmit = e => {
    e.preventDefault()

    const requestBody = {
      project: {
        name: name,
        description: description,
        start_date: getUnixTime(startDate),
        end_date: getUnixTime(endDate),
      },
    }

    project.id ? dispatch(editProjectFetch(requestBody, project.id)) : addProjectClearForm(requestBody)

    onClose()
  }

  const readExcel = e => {
    const file = e.target.files[0]

    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader()
      fileReader.readAsArrayBuffer(file)

      fileReader.onload = e => {
        const bufferArray = e.target.result
        const wb = XLSX.read(bufferArray, { type: 'buffer' })
        const wsname = wb.SheetNames[0]
        const ws = wb.Sheets[wsname]
        const data = XLSX.utils.sheet_to_json(ws)
        resolve(data)
      }
      fileReader.onerror = error => {
        reject(error)
      }
    })
    promise.then(d => {
      setData(d)
      setName(d[0]['Name'])
      setDescription(d[0]['Description'])
      setStartDate(addDays(new Date(1899, 11, 30), d[0]['Start Date']))
      setEndDate(addDays(new Date(1899, 11, 30), d[0]['End Date']))
    })
  }

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <form onSubmit={handleSubmit}>
          <Typography variant='h5' style={{ marginTop: '20px', marginLeft: '30px' }}>
            {project.id ? 'Edit Project' : 'New Project'}
          </Typography>

          {!project.id && (
            <>
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
                style={{ marginTop: '20px', marginLeft: '15px', marginBottom: '10px' }}
              />
            </>
          )}

          {displayImport ? (
            <DialogContent className={classes.DialogContent}>
              <InputLabel htmlFor='my-input' style={{ margin: '20px 0px' }}>
                Select Import File
              </InputLabel>
              <input id='customFile' type='file' onChange={readExcel} />

              <ProjectPreviewTable data={data} />
            </DialogContent>
          ) : (
            <DialogContent className={classes.DialogContent}>
              <TextField
                autoFocus
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
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Grid container justifyContent='space-around'>
                  <DatePicker
                    label='Start Date'
                    value={startDate}
                    onChange={handleSetStartDate}
                    format='MM/dd/yyyy'
                    slotProps={{
                      textField: {
                        className: classes.KeyboardDatePicker,
                      },
                    }}
                  />
                  <DatePicker
                    label='End Date'
                    value={endDate}
                    onChange={handleSetEndDate}
                    format='MM/dd/yyyy'
                    slotProps={{
                      textField: {
                        className: classes.KeyboardDatePicker,
                      },
                    }}
                  />
                </Grid>
              </LocalizationProvider>
            </DialogContent>
          )}

          <DialogActions>
            <Button variant='outlined' className={classes.button} onClick={onClose} color='primary'>
              Cancel
            </Button>
            <Button type='submit' variant='contained' className={classes.button} color='primary'>
              Submit
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  )
}
