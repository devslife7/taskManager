import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUser } from './actions/user'
import { fetchCurrentProject } from './actions/projects'
import { fetchCurrentMilestone } from './actions/milestones'
import { fetchCurrentTask } from './actions/tasks'
import SideBar from './components/SideBar'
import { SignUp, Login, Projects, Dashboard, Profile, Calendar, Reports, Inbox, Team } from './views'
import { Grid } from '@material-ui/core'

function App() {
  const dispatch = useDispatch()
  const loggedIn = useSelector(state => state.user.loggedIn)

  useEffect(() => {
    localStorage.getItem('userId') && dispatch(fetchUser())
    localStorage.getItem('currentProjectId') && dispatch(fetchCurrentProject())
    localStorage.getItem('currentMilestoneId') && dispatch(fetchCurrentMilestone())
    localStorage.getItem('currentTaskId') && dispatch(fetchCurrentTask())
  }, [dispatch])

  return (
    <Router>
      <Switch>
        <Route path='/' exact component={Login} />
        <Route path='/login' component={Login} />
        <Route path='/signup' component={SignUp} />
      </Switch>

      <Grid container wrap='nowrap'>
        {loggedIn && <SideBar />}
        <Switch>
          <Route path='/dashboard' component={Dashboard} />
          <Route path='/projects' component={Projects} />
          {/* <Route path='/projects' component={ProjectOverview} /> */}
          <Route path='/reports' component={Reports} />
          <Route path='/calendar' component={Calendar} />
          <Route path='/team' component={Team} />
          <Route path='/inbox' component={Inbox} />
          <Route path='/profile' component={Profile} />
        </Switch>
      </Grid>
    </Router>
  )
}

export default App
