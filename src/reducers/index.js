import { combineReducers } from "redux"
import userReducer from "./user"
import projectsReducer from "./projects"
import tasksReducer from "./tasks"

export default combineReducers({
  user: userReducer,
  projects: projectsReducer,
  tasks: tasksReducer
})
