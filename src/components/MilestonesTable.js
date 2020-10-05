import React from "react"
// import { makeStyles } from "@material-ui/core/styles"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableContainer from "@material-ui/core/TableContainer"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import Paper from "@material-ui/core/Paper"
import { useDispatch, useSelector } from "react-redux"
import { IconButton } from "@material-ui/core"
// import DeleteIcon from "@material-ui/icons/Delete"
// import EditIcon from "@material-ui/icons/Edit"
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos"
import { fetchCurrentMilestone } from "../actions/milestones"
import { fromUnixTime, format } from "date-fns"

// const useStyles = makeStyles({
//   table: {
//     minWidth: 650
//   }
// })

export default function MilestonesTable() {
  // const classes = useStyles()
  const dispatch = useDispatch()
  const currentProject = useSelector(state => state.projects.currentProject)

  // const handleDelete = entryId => {
  //   const entriesURL = "http://localhost:3000/entries/"

  //   fetch(entriesURL + entryId, { method: "DELETE" })
  //     .then(resp => resp.json())
  //     .then(data => console.log(data))
  // }

  const handleSetCurrentMilestone = milestoneId => {
    localStorage.currentMilestoneId = milestoneId
    dispatch(fetchCurrentMilestone())
  }

  const renderRows = () => {
    return currentProject.milestones.map((milestone, idx) => (
      <TableRow key={idx}>
        <TableCell component='th' scope='row' style={{ display: "flex" }}>
          {milestone.name}{" "}
          <IconButton onClick={() => handleSetCurrentMilestone(milestone.id)}>
            <ArrowForwardIosIcon fontSize='small' />
          </IconButton>
        </TableCell>
        <TableCell align='right'>{`${milestone.progress}%`}</TableCell>
        {/* <TableCell>{"owner"}</TableCell> */}
        <TableCell align='right'>{milestone.hours}</TableCell>
        <TableCell align='right'>{format(fromUnixTime(milestone.start_date), "PP")} </TableCell>
        <TableCell align='right'>{format(fromUnixTime(milestone.end_date), "PP")} </TableCell>

        {/* <TableCell> */}
        {/* <IconButton>
            <EditIcon fontSize='small' color='primary' />
          </IconButton> */}
        {/* <IconButton>
            <DeleteIcon fontSize='small' color='error' />
          </IconButton> */}
        {/* </TableCell> */}
      </TableRow>
    ))
  }

  return (
    <TableContainer component={Paper} style={{ marginRight: "2px" }}>
      <Table size='small' aria-label='simple table'>
        <TableHead>
          <TableRow>
            {/* <TableCell>Name</TableCell> */}
            <TableCell style={{ width: "100px" }}>Name </TableCell>
            <TableCell align='right'>Progress%</TableCell>
            <TableCell align='right'>Hours</TableCell>
            <TableCell align='right'>Start</TableCell>
            <TableCell align='right'>End</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{renderRows()}</TableBody>
      </Table>
    </TableContainer>
  )
}
