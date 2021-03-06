import { Paper } from '@material-ui/core'
import { format, fromUnixTime } from 'date-fns'
import React from 'react'
import Chart from 'react-apexcharts'

export default function EntriesGraph({ records }) {
  const currentEntriesSorted = records.sort((a, b) => b.date - a.date).reverse()

  const options = {
    chart: {
      backgroundColor: 'white',
      zoom: {
        enabled: true,
      },
    },
    dataLabels: {
      enabled: true,
    },
    stroke: {
      // curve: "smooth",
      curve: 'stepline',
    },
    title: {
      text: 'Task Progress',
      align: 'center',
    },
    grid: {
      row: {
        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
        opacity: 0.5,
      },
    },
    xaxis: {
      // type: 'datetime',
      categories: currentEntriesSorted.map(t => format(fromUnixTime(t.date), 'LLL do')),
      // categories: currentEntriesSorted.map(t => fromUnixTime(t.date))
    },
    yaxis: {
      title: {
        text: 'Progress %',
      },
      min: 0,
      max: 100,
    },
    tooltip: {
      x: {
        format: 'dd/MM/yy',
      },
    },
  }

  const series = [
    {
      name: 'Progress',
      data: currentEntriesSorted.map(t => t.progress),
      // data: sortAndFormatEntries(),
    },
  ]

  return (
    <>
      <Paper style={{ width: '60rem', margin: '2rem auto' }}>
        <Chart options={options} series={series} type='line' height='350' />
      </Paper>
    </>
  )
}
