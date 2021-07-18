import { format, fromUnixTime } from 'date-fns'
import React from 'react'

export default function Inbox() {
  return (
    <>
      <div style={{ margin: '100px auto', fontSize: '2rem', backgroundColor: 'yellow' }}>
        <div>Inbox Page coming soon...</div>
        <div style={{ backgroundColor: 'green' }}> Testing until deadline feature</div>
        <div>{format(fromUnixTime(1626582842), 'eeee PPP')}</div>
      </div>
    </>
  )
}
