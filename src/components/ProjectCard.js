import {
  Divider,
  Grid,
  IconButton,
  ListItem,
  ListItemText,
  Paper,
  Typography
} from "@material-ui/core"
import React from "react"
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos"
import { useDispatch } from "react-redux"
import { fetchCurrentProject } from "../actions/projects"
import moment from "moment"

function ProjectCard({ project }) {
  const dispatch = useDispatch()

  const handleSetCurrentProject = () => {
    localStorage.currentProjectId = project.id
    dispatch(fetchCurrentProject())
  }

  return (
    <>
      <ListItem button style={{ padding: "0.7rem 3rem" }}>
        <Grid container direction='column'>
          <Grid item>
            <ListItemText primary={project.name} />
          </Grid>
          <Grid item container justify='space-between'>
            <Typography variant='subtitle2' color='textSecondary' gutterBottom>
              {moment.unix(project.end_date).format("ll").toString()}
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
