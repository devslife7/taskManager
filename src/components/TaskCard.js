import React from "react"
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { fetchCurrentTask } from "../actions/tasks"

function TaskCard({ task }) {
  const dispatch = useDispatch()

  const handleLink = () => {
    console.log("click task details")
    localStorage.currentTaskId = task.id
  }

  return (
    <div>
      <h1>{task.name}</h1>
      <p>notes: {task.notes}</p>
      <p>start date: {task.start_date}</p>
      <p>end date: {task.end_date}</p>
      <p>hours: {task.hours}</p>
      <p>completion percentage: {task.completion_percentage}</p>
      <p>created at: {task.created_at}</p>
      <p>updated at: {task.updated_at}</p>
      <Link to='/task/details' onClick={handleLink}>
        details
      </Link>
    </div>
  )
}

export default TaskCard
