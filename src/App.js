import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUser } from './redux/actions/user'
import { fetchCurrentProject } from './redux/actions/projects'
import { fetchCurrentMilestone } from './redux/actions/milestones'
import { fetchCurrentTask } from './redux/actions/tasks'
import SideBar from './components/SideBar'
import { SignUp, Login, Projects, Dashboard, Profile, Calendar, Reports, Inbox, Team } from './views'
import { Grid, Box } from '@mui/material'

export default function App() {
  const dispatch = useDispatch()
  const loggedIn = useSelector(state => state.user.loggedIn)

  useEffect(() => {
    localStorage.getItem('userId') && dispatch(fetchUser())
    localStorage.getItem('currentProjectId') && dispatch(fetchCurrentProject())
    localStorage.getItem('currentMilestoneId') && dispatch(fetchCurrentMilestone())
    localStorage.getItem('currentTaskId') && dispatch(fetchCurrentTask())
  }, [dispatch])

  return (
    <Box>
      <Router>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
        </Routes>

        <Grid container flexWrap='nowrap'>
          {loggedIn && <SideBar />}
          <Routes>
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/projects' element={<Projects />} />
            <Route path='/reports' element={<Reports />} />
            <Route path='/calendar' element={<Calendar />} />
            <Route path='/team' element={<Team />} />
            <Route path='/inbox' element={<Inbox />} />
            <Route path='/profile' element={<Profile />} />
          </Routes>
        </Grid>
      </Router>
    </Box>
  )
}
