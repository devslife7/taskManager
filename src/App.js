import React, { useEffect } from "react"
import { Container } from "@material-ui/core"
import { BrowserRouter as Router, Route } from "react-router-dom"
import { useDispatch } from "react-redux"
import { fetchUser } from "./actions/user"
import Login from "./components/Login"
import SignUp from "./components/SignUp"
// import Projects from "./components/Projects"
import Tasks from "./components/Tasks"
import Home from "./components/Home"
import ProjectDetails from "./components/ProjectDetails"
import NavBar from "./containers/NavBar"

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    !!localStorage.userId && dispatch(fetchUser(localStorage.userId))
  }, [dispatch])

  return (
    <Router>
      <NavBar />
      <Container disableGutters>
        <Route exact path='/' component={Login} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/signup' component={SignUp} />
        <Route exact path='/home' component={Home} />
        <Route exact path='/project/details' component={ProjectDetails} />
        <Route exact path='/task/details' component={Tasks} />
      </Container>
    </Router>
  )
}

export default App
