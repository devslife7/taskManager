import { Button, IconButton } from "@material-ui/core"
import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchCurrentProject } from "../actions/projects"
import MilestonesTable from "./MilestonesTable"
import AddIcon from "@material-ui/icons/Add"
import CreateIcon from "@material-ui/icons/Create"

function Milestones() {
  const dispatch = useDispatch()
  const loading = useSelector(state => state.projects.loading)
  const currentProject = useSelector(state => state.projects.currentProject)

  useEffect(() => {
    !!localStorage.currentProjectId && dispatch(fetchCurrentProject())
  }, [])

  return (
    <div>
      {!!currentProject.id ? (
        <>
          <h2>
            {currentProject.name} ({`${currentProject.progress}%`})
            <IconButton>
              <CreateIcon fontSize='small' />
            </IconButton>
          </h2>
          <div>{currentProject.description}</div>
          <div>
            {currentProject.start_date} - {currentProject.end_date}
          </div>
          <br />
          <br />
          <span style={{ fontSize: "1.5rem" }}>Milestones</span>
          <IconButton>
            <AddIcon style={{ color: "green" }} />
          </IconButton>
          <br />
          <br />
          <MilestonesTable />
        </>
      ) : (
        <div>{"Select a Project"}</div>
      )}
      {loading && <div> loading </div>}
    </div>
  )
}

export default Milestones
