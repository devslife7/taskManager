import React from "react"
import Typography from "@material-ui/core/Typography"
import { useDispatch, useSelector } from "react-redux"
import { clearCurrentProject, fetchCurrentProject } from "../actions/projects"
import { Button, Grid, makeStyles, MenuItem, Select } from "@material-ui/core"
import { Breadcrumbs as Bread } from '@material-ui/core';
import NavigateNextIcon from "@material-ui/icons/NavigateNext"
import { clearCurrentMilestone, fetchCurrentMilestone } from "../actions/milestones"
import { clearCurrentTask, fetchCurrentTask } from "../actions/tasks"
import HomeIcon from "@material-ui/icons/Home"

const useStyles = makeStyles(theme => ({
  mainDiv: {
    // height: "5rem",
    // backgroundColor: "green",
  },
  iconButton: {
    margin: "0vh 0.5vw",
  },
  overviewBtn: {
    textTransform: "none",
    fontSize: "1rem",
  },
  gridContainer: {
    height: "3rem",
  },
  link: {
    color: theme.palette.primary.main,
    display: 'inline-block',
    "&:hover": {
      textDecoration: 'underline',
      cursor: 'pointer'
    }
  },
  linkNoHover: {
    color: theme.palette.primary.main
  },
  select: {
    backgroundColor: 'green',
    border: 'none',
    width: '1rem',
    marginLeft: '0.3rem',
    padding: '50px 20px 10px 0px'
  }
}))

export default function Breadcrumbs() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const allProjects = useSelector(state => state.projects.allProjects)
  const currentProject = useSelector(state => state.projects.currentProject)
  const currentMilestone = useSelector(state => state.milestones.currentMilestone)
  const currentTask = useSelector(state => state.tasks.currentTask)

  const clearProject = () => {
    dispatch(clearCurrentProject())
    clearMilestone()
  }
  const clearMilestone = () => {
    dispatch(clearCurrentMilestone())
    clearTask()
  }
  const clearTask = () => {
    dispatch(clearCurrentTask())
  }

  const handleSetCurrentProject = event => {
    localStorage.setItem("currentProjectId", `${event.target.value}`)
    dispatch(fetchCurrentProject())
    clearProject()
  }
  const handleSetCurrentMilestone = event => {
    localStorage.setItem("currentMilestoneId", `${event.target.value}`)
    dispatch(fetchCurrentMilestone())
    clearMilestone()
  }
  const handleSetCurrentTask = event => {
    localStorage.setItem("currentTaskId", `${event.target.value}`)
    dispatch(fetchCurrentTask())
    clearTask()
  }

  const renderMenuItems = list => {
    return list.map((item, idx) => (
      <MenuItem key={idx} value={item.id}>
        <Typography color='textPrimary' variant='subtitle1'>
          {item.name}
        </Typography>
      </MenuItem>
    ))
  }

  return (
    <div aria-label='breadcrumb' className={classes.mainDiv}>
      <Grid container alignItems='center' className={classes.gridContainer}>
        <Bread>
        <div className={classes.link} onClick={clearProject}>
              {"Projects"}
            </div>

        {currentProject.id && (
          <>
            {/* <NavigateNextIcon color='action' className={classes.iconButton} /> */}
            <div className={classes.link} onClick={clearMilestone}>
              {currentProject.name}
            </div>

            {/* <Select className={classes.select} style={{border: 'none'}} value='' onChange={handleSetCurrentProject}>
              {renderMenuItems(allProjects)}
            </Select> */}

            <select className={classes.select}>
              <option></option>
              <option>Option 1</option>
              <option>Option 2</option>
              <option>Option 3</option>
            </select>
          </>
        )}
        {currentMilestone.id && (
          <>
            {/* <NavigateNextIcon color='action' className={classes.iconButton} /> */}
            <div className={classes.link} onClick={clearTask}>
              {currentMilestone.name}
            </div>

            <Select style={{ width: "1.6rem" }} value='' onChange={handleSetCurrentMilestone}>
              {renderMenuItems(currentProject.milestones)}
            </Select>
          </>
        )}
        {currentTask.id && (
          <>
            {/* <NavigateNextIcon color='action' className={classes.iconButton} /> */}
            {/* <Grid container> */}
            <Typography color='textPrimary' style={{display: 'inline-block'}}>{currentTask.name}</Typography>

            <Select style={{ width: "1.6rem" }} value='' onChange={handleSetCurrentTask}>
              {renderMenuItems(currentMilestone.tasks)}
            </Select>
            {/* </Grid> */}
          </>
        )}
        </Bread>
      </Grid>
    </div>
  )
}
