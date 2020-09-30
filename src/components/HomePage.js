import React, { useEffect } from "react"

function HomePage() {
  useEffect(() => {
    console.log("homepage component did mount")
    // fetch projects
  }, [])
  return (
    <div>
      <h3>Homepage</h3>
    </div>
  )
}

export default HomePage
