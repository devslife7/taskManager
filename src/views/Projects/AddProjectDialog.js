import { Dialog, Typography } from '@material-ui/core'
import React from 'react'

export default function AddProjectDialog() {
  return (
    <>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <Typography variant='h5' style={{ marginTop: '20px', marginLeft: '30px' }}>
          {'New Project'}
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
          style={{ marginTop: '20px', marginLeft: '15px', marginBottom: '10px' }}
        />

        {displayImport ? (
          <DialogContent className={classes.DialogContent}>
            <InputLabel htmlFor='my-input' style={{ margin: '20px 0px' }}>
              Select Import File
            </InputLabel>
            <input
              id='customFile'
              type='file'
              // onChange={e => setImportFile(e.target.files[0])}
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
                  autoOk
                  variant='inline'
                  format='MM/dd/yyyy'
                  margin='normal'
                  id='date-picker-inline'
                  label='Start Date'
                  value={startDate}
                  onChange={handleSetStartDate}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                  className={classes.KeyboardDatePicker}
                />
                <KeyboardDatePicker
                  disableToolbar
                  autoOk
                  variant='inline'
                  format='MM/dd/yyyy'
                  margin='normal'
                  id='date-picker-inline'
                  label='End Date'
                  value={endDate}
                  onChange={handleSetEndDate}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                  className={classes.KeyboardDatePicker}
                />
              </Grid>
            </MuiPickersUtilsProvider>
          </DialogContent>
        )}

        <DialogActions>
          <Button variant='outlined' className={classes.button} onClick={handleCloseDialog} color='primary'>
            Cancel
          </Button>
          <Button variant='contained' className={classes.button} onClick={handleCloseDialog} color='primary'>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
