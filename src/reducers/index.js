import { combineReducers } from "redux"
import userReducer from "./user"
import projectsReducer from "./projects"
import tasksReducer from "./tasks"
import milestonesReducer from "./milestones"

export default combineReducers({
  user: userReducer,
  projects: projectsReducer,
  milestones: milestonesReducer,
  tasks: tasksReducer
})
