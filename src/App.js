import React, { useEffect } from "react"
import { BrowserRouter as Router, Route } from "react-router-dom"
import { useDispatch } from "react-redux"
import { fetchUser } from "./actions/user"
import Login from "./components/Login"
import SignUp from "./components/SignUp"
import Tasks from "./components/Tasks"
import DashBoard from "./containers/DashBoard"
import ProjectDetails from "./components/ProjectDetails"
import NavBar from "./containers/NavBar"
import Profile from "./containers/Profile"
import Milestones from "./components/Milestones"
import Entries from "./components/Entries"

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    !!localStorage.userId && dispatch(fetchUser(localStorage.userId))
  }, [dispatch])

  return (
    <Router>
      <NavBar />
      <Route exact path='/' component={Login} />
      <Route exact path='/login' component={Login} />
      <Route exact path='/signup' component={SignUp} />
      <Route exact path='/dashboard' component={DashBoard} />
      <Route exact path='/profile' component={Profile} />
      <Route exact path='/project/details' component={ProjectDetails} />
      <Route exact path='/milestone/details' component={Tasks} />
      <Route exact path='/task/details' component={Entries} />
    </Router>
  )
}

export default App
