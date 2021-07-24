import React from 'react'
import Chart from 'react-apexcharts'
import { useSelector } from 'react-redux'

export default function MilestonesGraph() {
  const milestones = useSelector(state => state.projects.currentProject.milestones)
  const milestonesSorted = milestones.sort((a, b) => b.end_date - a.end_date).reverse()

  const options = {
    chart: {
      type: 'line',
      zoom: {
        enabled: true,
      },
      animations: {
        enabled: true,
      },
    },
    dataLabels: {
      enabled: true,
    },
    stroke: {
      curve: 'smooth',
    },
    title: {
      text: 'Milestone Progress',
      align: 'center',
    },
    grid: {
      row: {
        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
        opacity: 0.5,
      },
    },
    xaxis: {
      categories: milestonesSorted.map(milestone => milestone.name),
      // categories: ['No Milestones'],
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
      data: milestonesSorted.map(t => t.progress),
    },
  ]

  return (
    <div style={{ marginTop: '1rem', padding: '0 200px' }}>
      <Chart options={options} series={series} type='bar' width='1000' height='370' />
    </div>
  )
}
