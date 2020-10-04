import {
  Button,
  Divider,
  IconButton,
  InputAdornment,
  makeStyles,
  TextField,
  Typography
} from "@material-ui/core"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addProject, fetchProjects } from "../actions/projects"
import ProjectCard from "./ProjectCard"
import CreateIcon from "@material-ui/icons/Create"
import SearchIcon from "@material-ui/icons/Search"

const useStyles = makeStyles(theme => ({
  mainDiv: {
    // backgroundColor: "#fafafa"
    // backgroundColor: theme.palette.secondary.main
    // color: "white"
    // color: "gray"
    // padding: "2rem"
  },
  searchBox: {
    // marginLeft: "20px",
    // marginBottom: "1rem"
    margin: "1rem 3rem"
  }
}))

function Projects() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const loading = useSelector(state => state.projects.loading)
  const allProjects = useSelector(state => state.projects.allProjects)
  const [showForm, setShowForm] = useState(false)
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [searchTerm, setSearchTerm] = useState("")

  const handleAddProject = e => {
    setShowForm(!showForm)
  }

  const handleSubmit = e => {
    e.preventDefault()

    const projURL = "http://localhost:3000/projects"

    const configObj = {
      method: "POST",
      headers: {
        "Content-Type": "Application/json"
      },
      body: JSON.stringify({
        project: {
          name: name,
          description: description,
          start_date: startDate,
          deadline: endDate,
          completion_percentage: "0%"
        }
      })
    }

    fetch(projURL, configObj)
      .then(resp => resp.json())
      .then(data => dispatch(addProject(data)))

    setShowForm(false)
    setName("")
    setDescription("")
    setStartDate("")
    setEndDate("")
  }

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
          )
        }}
        className={classes.searchBox}
        label='Search Projects'
      />
      <Divider />

      {showForm && (
        <form noValidate onSubmit={handleSubmit}>
          <TextField
            variant='outlined'
            margin='normal'
            fullWidth
            required
            label='Name'
            autoFocus
            value={name}
            onChange={e => {
              setName(e.target.value)
            }}
          />
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            label='Description'
            value={description}
            onChange={e => {
              setDescription(e.target.value)
            }}
          />
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            label='Start Date'
            value={startDate}
            onChange={e => {
              setStartDate(e.target.value)
            }}
          />
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            label='End Date'
            value={endDate}
            onChange={e => {
              setEndDate(e.target.value)
            }}
          />
          <Button type='submit' fullWidth variant='contained' color='primary'>
            Submit
          </Button>
        </form>
      )}

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
