// import { format, fromUnixTime } from "date-fns"
import React, { useState } from 'react'
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

  return (
    <div style={{ margin: '2vh auto', padding: '0 200px' }}>
      <Chart options={options} series={series} type='bar' width='1000' height='400' />
    </div>
  )
}
