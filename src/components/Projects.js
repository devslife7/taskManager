import { Typography } from "@material-ui/core"
import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchProjects } from "../actions/projects"
import ProjectCard from "./ProjectCard"

function Projects() {
  const dispatch = useDispatch()
  const projects = useSelector(state => state.projects.allProjects)
  const loading = useSelector(state => state.projects.loading)

  useEffect(() => {
    console.log("project page did mount")
    dispatch(fetchProjects())
  }, [dispatch])

  const renderProjects = () => {
    return projects.map((proj, idx) => <ProjectCard key={idx} project={proj} />).reverse()
  }

  return (
    <div>
      {loading ? (
        <Typography variant='h1' style={{ fontSize: "1.3em", marginTop: "90px" }}>
          Loading...
        </Typography>
      ) : (
        renderProjects()
      )}
    </div>
  )
}

export default Projects
