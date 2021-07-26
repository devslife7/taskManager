// import { format, fromUnixTime } from "date-fns"
import React from 'react'
import Chart from 'react-apexcharts'
import { useSelector } from 'react-redux'

export default function TasksGraph() {
  const tasks = useSelector(state => state.milestones.currentMilestone.tasks)
  const tasksSorted = tasks.sort((a, b) => b.end_date - a.end_date).reverse()

  const options = {
    chart: {
      zoom: {
        enabled: true,
      },
    },
    dataLabels: {
      enabled: true,
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
      categories: tasksSorted.map(t => t.name),
    },
    yaxis: {
      title: {
        text: 'Progress %',
      },
      min: 0,
      max: 100,
    },
  }

  const series = [
    {
      name: 'Progress',
      data: tasksSorted.map(t => t.progress),
    },
  ]

  const optionsPlaceHolder = {
    title: {
      text: 'No tasks created...',
      align: 'center',
      offsetY: 190,
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
    <div style={{ margin: '2vh auto', padding: '0 200px' }}>
      {/* <Chart options={options} series={series} type='bar' width='1000' height='400' /> */}

      {tasks.length === 0 ? (
        <Chart
          options={optionsPlaceHolder}
          series={seriesPlaceHolder}
          type='bar'
          width='1000'
          height='400'
          style={{ marginTop: '5rem' }}
        />
      ) : (
        <Chart options={options} series={series} type='bar' width='1000' height='400' />
      )}
    </div>
  )
}
