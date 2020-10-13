import React from "react"
import Typography from "@material-ui/core/Typography"
import { useDispatch, useSelector } from "react-redux"
import { clearCurrentProject, fetchCurrentProject } from "../actions/projects"
import { Button, Grid, makeStyles, MenuItem, Select } from "@material-ui/core"
// import { Breadcrumbs as Bread } from "@material-ui/core"
import NavigateNextIcon from "@material-ui/icons/NavigateNext"
import { clearCurrentMilestone, fetchCurrentMilestone } from "../actions/milestones"
import { clearCurrentTask, fetchCurrentTask } from "../actions/tasks"
import HomeIcon from "@material-ui/icons/Home"

const useStyles = makeStyles({
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
})

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
        {/* <Bread> */}
        <Button startIcon={<HomeIcon />} className={classes.overviewBtn} onClick={clearProject}>
          Overview
        </Button>

        {currentProject.id && (
          <>
            <NavigateNextIcon color='action' className={classes.iconButton} />
            <Button className={classes.overviewBtn} onClick={clearMilestone}>
              {currentProject.name}
            </Button>

            <Select style={{ width: "1.6rem" }} onChange={handleSetCurrentProject}>
              {renderMenuItems(allProjects)}
            </Select>
          </>
        )}
        {currentMilestone.id && (
          <>
            <NavigateNextIcon color='action' className={classes.iconButton} />
            <Button className={classes.overviewBtn} onClick={clearTask}>
              {currentMilestone.name}
            </Button>

            <Select style={{ width: "1.6rem" }} onChange={handleSetCurrentMilestone}>
              {renderMenuItems(currentProject.milestones)}
            </Select>
          </>
        )}
        {currentTask.id && (
          <>
            <NavigateNextIcon color='action' className={classes.iconButton} />
            {/* <Grid container> */}
            <Typography color='textPrimary'>{currentTask.name}</Typography>

            <Select style={{ width: "1.6rem" }} onChange={handleSetCurrentTask}>
              {renderMenuItems(currentMilestone.tasks)}
            </Select>
            {/* </Grid> */}
          </>
        )}
        {/* </Bread> */}
      </Grid>
    </div>
  )
}
