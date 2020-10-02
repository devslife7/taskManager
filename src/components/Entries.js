import { IconButton } from "@material-ui/core"
import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchCurrentMilestone } from "../actions/milestones"
import AddIcon from "@material-ui/icons/Add"
import CreateIcon from "@material-ui/icons/Create"
import { fetchCurrentTask } from "../actions/tasks"
import EntriesTable from "./EntriesTable"

function Entries() {
  const dispatch = useDispatch()
  const currentTask = useSelector(state => state.tasks.currentTask)

  useEffect(() => {
    !!localStorage.currentTaskId && dispatch(fetchCurrentTask())
  }, [dispatch])

  return (
    <div>
      {!!currentTask.id ? (
        <>
          <h2>
            {currentTask.name} ({`${currentTask.progress}%`})
            <IconButton>
              <CreateIcon fontSize='small' />
            </IconButton>
          </h2>

          <p>hours: {currentTask.hours}</p>
          <p>
            {currentTask.start_date} - {currentTask.end_date}
          </p>

          <br />
          <br />
          <span style={{ fontSize: "1.5rem" }}>Entries</span>
          <IconButton>
            <AddIcon style={{ color: "green" }} />
          </IconButton>
          <br />
          <br />
          <EntriesTable />
        </>
      ) : (
        <div>{"Select a Task"}</div>
      )}
    </div>
  )
}

export default Entries
