import React from "react"
import DashBoard from "../containers/DashBoard"
import Profile from "../containers/Profile"
// import { BrowserRouter as Router, Route } from "react-router-dom"
import SideBar from "../components/SideBar"

export default function Interface() {
  return (
    <div>
      <SideBar />
      {"Interface"}
      {/* 
      <Router>
        <Route exact path='/dashboard' component={DashBoard} />
        <Route exact path='/profile' component={Profile} />
      </Router> */}
    </div>
  )
}
