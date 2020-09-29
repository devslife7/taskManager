import React from "react"
import { Container } from "@material-ui/core"
import { BrowserRouter as Router, Route } from "react-router-dom"
import Login from "./components/Login"
import SignUp from "./components/SignUp"
import HomePage from "./components/HomePage"

function App() {
  return (
    <Router>
      <Container disableGutters>
        <Route exact path='/' component={HomePage} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/signup' component={SignUp} />
      </Container>
    </Router>
  )
}

export default App
