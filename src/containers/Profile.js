import React from "react"
import { useSelector } from "react-redux"

function Profile() {
  const currentUser = useSelector(state => state.user.currentUser)
  return (
    <div style={{ margin: "100px auto", backgroundColor: "white", textAlign: "center" }}>
      <h2>Profile page</h2>
      <div style={{ fontSize: "1.5rem", marginTop: "20px" }}>First Name: {currentUser.first_name}</div>
      <div style={{ fontSize: "1.5rem", marginTop: "20px" }}>Last Name: {currentUser.last_name}</div>
      <div style={{ fontSize: "1.5rem", marginTop: "20px" }}>Username: {currentUser.username}</div>
      <div style={{ fontSize: "1.5rem", marginTop: "20px" }}>Role: {currentUser.role}</div>
    </div>
  )
}

export default Profile
