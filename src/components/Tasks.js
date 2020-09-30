import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchCurrentTask } from "../actions/tasks"
import TaskCard from "./TaskCard"

function Tasks() {
  const dispatch = useDispatch()
  const currentTask = useSelector(state => state.tasks.currentTask)

  useEffect(() => {
    !!localStorage.currentTaskId && dispatch(fetchCurrentTask(localStorage.currentTaskId))
  }, [])

  // const renderTasks = () => {
  //   return currentProject.tasks.map((t, idx) => <TaskCard key={idx} task={t} />)
  // }
  return (
    <div>
      <h2>Task page</h2>
      {/* <h2>current project Name: {currentProject.name}</h2> */}
      {/* {<h5>project tasks: {renderTasks()}</h5>} */}
    </div>
  )
}

export default Tasks
