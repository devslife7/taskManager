import { Button } from "@material-ui/core"
import React from "react"

function EntriesCard({ entry }) {
  return (
    <div>
      <h3>Entry here</h3>
      <h5>entry date: {entry.date}</h5>
      <h5>notes: {entry.notes}</h5>
      <h5>completion percentage: {entry.completion_percentage}</h5>
      <h5>created at: {entry.created_at}</h5>
      <h5>updated at: {entry.updated_at}</h5>
      <Button variant='contained' color='primary'>
        edit
      </Button>
      <Button variant='outlined' color='primary'>
        delete
      </Button>
    </div>
  )
}

export default EntriesCard
