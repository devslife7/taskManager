import React from "react"
import { useSelector } from "react-redux"
import MilestonesTable from "./MilestonesTable"

function Milestones() {
  const loading = useSelector(state => state.projects.loading)
  const currentProject = useSelector(state => state.projects.currentProject)

  console.log(currentProject)

  return (
    <div>
      {!!currentProject.milestones ? (
        <>
          <h2>
            {currentProject.name} ({`${currentProject.progress}%`})
          </h2>
          <div>{currentProject.description}</div>
          <div>
            {currentProject.start_date} - {currentProject.end_date}
          </div>
          {/* <div>{currentProject.description}</div> */}
          <h3>Milestones</h3>
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
