import React from "react"
import { useSelector } from "react-redux"

function Profile() {
  const currentUser = useSelector(state => state.user.currentUser)
  return (
    <div style={{ textAlign: "center", marginTop: "7vh", backgroundColor: "white" }}>
      <h2>Profile page</h2>
      <div style={{ fontSize: "1.5rem", marginTop: "5vh" }}>
        First Name: {currentUser.first_name}
      </div>
      <div style={{ fontSize: "1.5rem", marginTop: "20px" }}>
        Last Name: {currentUser.last_name}
      </div>
      <div style={{ fontSize: "1.5rem", marginTop: "20px" }}>Username: {currentUser.username}</div>
    </div>
  )
}

export default Profile
