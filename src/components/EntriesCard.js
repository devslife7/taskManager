import { Button } from "@material-ui/core"
import React from "react"

function EntriesCard({ entry }) {
  const handleDelete = () => {
    const entriesURL = "http://localhost:3000/entries/"

    fetch(entriesURL + entry.id, { method: "DELETE" })
      .then(resp => resp.json())
      .then(data => console.log(data))
  }

  return (
    <div>
      <h4>entry date: {entry.date}</h4>
      <h4>notes: {entry.notes}</h4>
      <h4>completion percentage: {entry.completion_percentage}</h4>
      <h4>created at: {entry.created_at}</h4>
      <h4>updated at: {entry.updated_at}</h4>
      <Button variant='contained' color='primary'>
        edit
      </Button>
      <Button variant='outlined' color='primary' onClick={handleDelete}>
        delete
      </Button>
    </div>
  )
}

export default EntriesCard
