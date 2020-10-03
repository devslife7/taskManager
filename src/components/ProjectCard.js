import { IconButton, Paper } from "@material-ui/core"
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
      {/* <Paper style={{ padding: "1rem" }}> */}
      <div style={{ margin: "0px", fontWeight: "400" }}>
        {project.name} ({`${project.progress}%`})
        <IconButton onClick={handleSetCurrentProject}>
          <ArrowForwardIosIcon />
        </IconButton>
      </div>
      <p>{project.description}</p>
      <p>START: {moment.unix(project.start_date).format("ll").toString()}</p>
      <p>END: {moment.unix(project.end_date).format("ll").toString()}</p>
      {/* </Paper> */}
    </>
  )
}

export default ProjectCard
