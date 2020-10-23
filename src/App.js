import React, { useEffect } from "react"
import { BrowserRouter as Router, Route } from "react-router-dom"
import { useDispatch } from "react-redux"
import { fetchUser } from "./actions/user"
import Login from "./components/session/Login"
import SignUp from "./components/session/SignUp"
import Tasks from "./components/tasks/Tasks"
import DashBoard from "./containers/DashBoard"
import NavBar from "./containers/NavBar"
import Profile from "./containers/Profile"
import Entries from "./components/entries/Entries"
import { fetchCurrentProject } from "./actions/projects"
import { fetchCurrentMilestone } from "./actions/milestones"
import { fetchCurrentTask } from "./actions/tasks"

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    !!localStorage.getItem("userId") && dispatch(fetchUser())
    !!localStorage.getItem("currentProjectId") && dispatch(fetchCurrentProject())
    !!localStorage.getItem("currentMilestoneId") && dispatch(fetchCurrentMilestone())
    !!localStorage.getItem("currentTaskId") && dispatch(fetchCurrentTask())
  }, [dispatch])

  return (
    <Router>
      <NavBar />
      <Route exact path='/' component={Login} />
      <Route exact path='/login' component={Login} />
      <Route exact path='/signup' component={SignUp} />
      <Route exact path='/dashboard' component={DashBoard} />
      <Route exact path='/profile' component={Profile} />
      <Route exact path='/milestone/details' component={Tasks} />
      <Route exact path='/task/details' component={Entries} />
    </Router>
  )
}

export default App
