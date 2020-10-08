import { Divider, InputAdornment, makeStyles, TextField, Typography } from "@material-ui/core"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchProjects } from "../actions/projects"
import ProjectCard from "./ProjectCard"
import SearchIcon from "@material-ui/icons/Search"

const useStyles = makeStyles(theme => ({
  mainDiv: {
    // backgroundColor: "#fafafa",
    // backgroundColor: "#79b0f7",
    // color: "white",
    // color: "gray"
  },
  searchBox: {
    margin: "1rem 3rem",
  },
}))

function Projects() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const loading = useSelector(state => state.projects.loading)
  const allProjects = useSelector(state => state.projects.allProjects)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    dispatch(fetchProjects())
  }, [dispatch])

  const renderProjects = () => {
    const filterProjects = allProjects.filter(proj =>
      proj.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    filterProjects.sort((a, b) => b.end_date - a.end_date) // Sorts Projects by end_date

    return filterProjects.map((proj, idx) => <ProjectCard key={idx} project={proj} />).reverse()
  }

  return (
    <div className={classes.mainDiv}>
      <TextField
        value={searchTerm}
        onChange={event => setSearchTerm(event.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment>
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        className={classes.searchBox}
        label='Search Projects'
      />
      <Divider />

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
