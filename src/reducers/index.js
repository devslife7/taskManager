import { combineReducers } from "redux"
import userReducer from "./user"
import projectsReducer from "./projects"

export default combineReducers({
  user: userReducer,
  projects: projectsReducer
})
