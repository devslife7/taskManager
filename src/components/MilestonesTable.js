import React from "react"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableContainer from "@material-ui/core/TableContainer"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import Paper from "@material-ui/core/Paper"
import { useDispatch, useSelector } from "react-redux"
import { IconButton, makeStyles } from "@material-ui/core"
import DeleteIcon from "@material-ui/icons/Delete"
import EditIcon from "@material-ui/icons/Edit"
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos"
import { fetchCurrentMilestone } from "../actions/milestones"
import { fromUnixTime, format } from "date-fns"

const useStyles = makeStyles(theme => ({
  table: {
    width: "50vw",
    marginTop: "1vh",
    marginLeft: "10vw",
  },
  editIcon: {
    color: theme.palette.success.main,
  },
  deleteIcon: {
    color: theme.palette.error.dark,
  },
  forwardIcon: {
    color: theme.palette.primary.main,
  },
}))

export default function MilestonesTable() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const currentProject = useSelector(state => state.projects.currentProject)

  // const handleDelete = entryId => {
  //   const entriesURL = "http://localhost:3000/entries/"

  //   fetch(entriesURL + entryId, { method: "DELETE" })
  //     .then(resp => resp.json())
  //     .then(data => console.log(data))
  // }

  const handleSetCurrentMilestone = milestoneId => {
    localStorage.setItem("currentMilestoneId", `${milestoneId}`)
    dispatch(fetchCurrentMilestone())
  }

  const renderRows = () => {
    return currentProject.milestones.map((milestone, idx) => (
      <TableRow key={idx}>
        <TableCell component='th' scope='row'>
          {milestone.name}{" "}
        </TableCell>
        <TableCell align='right'>{`${milestone.progress}%`}</TableCell>
        <TableCell align='right'>{milestone.hours}</TableCell>
        <TableCell align='right'>{format(fromUnixTime(milestone.start_date), "PP")} </TableCell>
        <TableCell align='right'>{format(fromUnixTime(milestone.end_date), "PP")} </TableCell>
        <TableCell align='right'>
          <IconButton>
            <EditIcon fontSize='small' className={classes.editIcon} />
          </IconButton>
          <IconButton>
            <DeleteIcon fontSize='small' className={classes.deleteIcon} />
          </IconButton>
          <IconButton onClick={() => handleSetCurrentMilestone(milestone.id)}>
            <ArrowForwardIosIcon fontSize='small' className={classes.forwardIcon} />
          </IconButton>
        </TableCell>
      </TableRow>
    ))
  }

  return (
    <TableContainer component={Paper} className={classes.table}>
      <Table size='small' aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>Milestones</TableCell>
            {/* <TableCell style={{ width: "100px" }}>Name </TableCell> */}
            <TableCell align='right'>Progress%</TableCell>
            <TableCell align='right'>Hours</TableCell>
            <TableCell align='right'>Start</TableCell>
            <TableCell align='right'>End</TableCell>
            <TableCell align='right'>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{renderRows()}</TableBody>
      </Table>
    </TableContainer>
  )
}
