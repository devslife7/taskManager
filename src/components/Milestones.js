import { IconButton } from "@material-ui/core"
import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchCurrentProject } from "../actions/projects"
import MilestonesTable from "./MilestonesTable"
import AddIcon from "@material-ui/icons/Add"
import CreateIcon from "@material-ui/icons/Create"
import MilestonesGraph from "./MilestonesGraph"
// import moment from "moment"

function Milestones() {
  const dispatch = useDispatch()
  const loading = useSelector(state => state.projects.loading)
  const currentProject = useSelector(state => state.projects.currentProject)

  useEffect(() => {
    !!localStorage.currentProjectId && dispatch(fetchCurrentProject())
  }, [dispatch])

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
            {/* {moment.unix(currentProject.start_date).format("ll").toString()} -{" "}
            {moment.unix(currentProject.end_date).format("ll").toString()} */}
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

          <MilestonesGraph />
        </>
      ) : (
        <div>{"Select a Project"}</div>
      )}
      {loading && <div> loading </div>}
    </div>
  )
}

export default Milestones
