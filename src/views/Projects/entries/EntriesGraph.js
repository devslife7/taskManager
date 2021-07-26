import React from 'react'
import Chart from 'react-apexcharts'
import { format, fromUnixTime } from 'date-fns'

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
      offsetY: 30,
      style: {
        fontSize: '1.1rem',
        fontWeight: 500,
        color: 'black',
      },
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

  const optionsPlaceHolder = {
    title: {
      text: 'No entries created...',
      align: 'center',
      offsetY: 181,
      style: {
        fontSize: '1.6rem',
        fontWeight: 500,
        color: 'rgba(0, 0, 0, 0.50)',
      },
    },
    grid: {
      row: {
        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
        opacity: 0.5,
      },
    },
    xaxis: {
      categories: [''],
    },
    yaxis: {
      title: {
        text: 'Progress %',
      },
      min: 0,
      max: 100,
    },
  }

  const seriesPlaceHolder = [
    {
      name: 'Progress',
      data: [0],
    },
  ]

  return (
    <>
      <div style={{ marginTop: '1rem', padding: '0 300px' }}>
        {currentEntriesSorted.length === 0 ? (
          <Chart
            options={optionsPlaceHolder}
            series={seriesPlaceHolder}
            type='line'
            width='1000'
            height='350'
            style={{ marginTop: '5rem' }}
          />
        ) : (
          <Chart options={options} series={series} type='line' width='1000' height='350' />
        )}
      </div>
    </>
  )
}
