import { Divider, Grid, ListItem, ListItemText, makeStyles, Typography } from "@material-ui/core"
import React from "react"
import { useDispatch } from "react-redux"
import { clearCurrentProject, fetchCurrentProject } from "../../actions/projects"
import { fromUnixTime, format } from "date-fns"
import { clearCurrentMilestone } from "../../actions/milestones"
import { clearCurrentTask } from "../../actions/tasks"

const useStyles = makeStyles(theme => ({
  ListItem: {
    padding: "0.7rem 2.2vw",
  },
}))

function ProjectCard({ project }) {
  const classes = useStyles()
  const dispatch = useDispatch()

  const handleSetCurrentProject = () => {
    if (project.id.toString() !== localStorage.getItem("currentProjectId")) {
      localStorage.setItem("currentProjectId", `${project.id}`)
      dispatch(fetchCurrentProject())
      dispatch(clearCurrentProject()) // fixes sligh flash of current project after selecting new prject
    }
    localStorage.setItem("currentProjectId", `${project.id}`)
    dispatch(clearCurrentMilestone())
    dispatch(clearCurrentTask())
  }

  return (
    <>
      <ListItem button className={classes.ListItem} onClick={handleSetCurrentProject}>
        <Grid container direction='column'>
          <Grid item>
            <ListItemText primary={project.name} />
          </Grid>
          <Grid item container justify='space-between'>
            <Typography variant='subtitle2' color='textSecondary' gutterBottom>
              {format(fromUnixTime(project.end_date), "PP")}
            </Typography>
            <Typography variant='subtitle2' color='textSecondary' gutterBottom>
              {`${project.progress}%`}
            </Typography>
          </Grid>
        </Grid>
      </ListItem>

      <Divider />
    </>
  )
}

export default ProjectCard