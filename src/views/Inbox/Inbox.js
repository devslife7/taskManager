import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core'
import * as XLSX from 'xlsx'

const useStyles = makeStyles(() => ({
  container: {
    margin: '100px auto',
    fontSize: '2rem',
    backgroundColor: 'yellow',
  },
}))

export default function Inbox() {
  const classes = useStyles()

  const [data, setData] = useState([])

  const readExcel = e => {
    const file = e.target.files[0]

    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader()
      fileReader.readAsArrayBuffer(file)

      fileReader.onload = e => {
        const bufferArray = e.target.result
        const wb = XLSX.read(bufferArray, { type: 'buffer' })
        const wsname = wb.SheetNames[0]
        const ws = wb.Sheets[wsname]
        const data = XLSX.utils.sheet_to_json(ws)
        resolve(data)
      }

      fileReader.onerror = error => {
        reject(error)
      }
    })

    promise.then(d => {
      setData(d)
      console.log(d)
    })
  }

  return (
    <>
      <div className={classes.container}>
        <div>Inbox Page coming soon...</div>
        <div>format Exel sheets</div>

        <div>
          <input type='file' onChange={readExcel} />
        </div>

        <table>
          <thead>
            <tr>
              <th scope='col'>Name</th>
              <th scope='col'>Description</th>
              <th scope='col'>Start Date</th>
              <th scope='col'>End Date</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, idx) => (
              <tr key={idx}>
                <td>{item['Name']}</td>
                <td>{item['Description']}</td>
                <td>{item['Start Date']}</td>
                <td>{item['End Date']}</td>
                {/* {console.log('format', format(item['Start Date'], 'PP'))} */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
