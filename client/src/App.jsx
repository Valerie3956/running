import { useState, useContext } from 'react'
import Auth from './components/auth'
import Menu from "./components/menu"
import Leaderboard from './components/leaderboard'
import LastRuns from './components/lastRuns'
import MyRuns from './components/myRuns'
import RunLog from './components/runLog'
import { Routes, Route, Navigate} from 'react-router-dom'
import { UserContext } from './context/userContext'
import ProtectedRoute from './components/protectedRoutes'

function App() {

  const {token, logout} = useContext(UserContext)
  return (
<>

{token && <Menu logout = {logout} />}

<Routes>

<Route 
  path = "/"
  element = {token ? <Navigate to ="/runLog" /> : <Auth />}
  />

<Route 
    path = "/myRuns"
    element = { <ProtectedRoute token = {token} redirectTo = "/">
    <MyRuns />
    </ProtectedRoute> }/>

    <Route 
    path = "/runLog"
    element = { <ProtectedRoute token = {token} redirectTo = "/">
    <RunLog />
    </ProtectedRoute> }/>

    <Route 
    path = "/lastRuns"
    element = { <ProtectedRoute token = {token} redirectTo = "/">
    <LastRuns />
    </ProtectedRoute> }/>

    <Route 
    path = "/leaderboard"
    element = { <ProtectedRoute token = {token} redirectTo = "/">
    <Leaderboard />
    </ProtectedRoute> }/>

</Routes>
</>
  )
}

export default App
