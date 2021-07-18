import React from 'react'
import { format, fromUnixTime } from 'date-fns'
import { formatDuration, intervalToDuration } from 'date-fns'

export default function Inbox() {
  const duration = intervalToDuration({
    start: new Date('07 / 15 / 2021'),
    end: new Date(),
  })

  delete duration.hours
  delete duration.minutes
  delete duration.seconds

  const formatedDuration = formatDuration(duration, {
    delimiter: ', ',
  })

  const handleSubmit = e => {
    e.preventDefault()
    console.log('submits')
  }

  return (
    <>
      <div style={{ margin: '100px auto', fontSize: '2rem', backgroundColor: 'yellow' }}>
        <div>Inbox Page coming soon...</div>
        <div style={{ backgroundColor: 'green' }}> Testing until deadline feature</div>
        <form onSubmit={e => handleSubmit(e)}>
          <label>name:</label>
          <input />
          <button type='submit'>Submit</button>
        </form>
      </div>
    </>
  )
}
