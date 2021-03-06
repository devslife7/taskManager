import { format, fromUnixTime } from 'date-fns'
import React, { useState } from 'react'
import Chart from 'react-apexcharts'
import { useSelector } from 'react-redux'

function MilestonesGraph() {
  const currentProject = useSelector(state => state.projects.currentProject)
  const currentProjectMilestonesSorted = currentProject.milestones
    .sort((a, b) => b.end_date - a.end_date)
    .reverse()

  const timelineSeries = currentProjectMilestonesSorted.map(t => ({
    x: format(fromUnixTime(t.end_date), 'PP'),
    y: t.progress,
  }))

  const [options] = useState({
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
      categories: currentProjectMilestonesSorted.map(milestone => milestone.name),
      title: {
        // text: "Date",
      },
    },
    yaxis: {
      title: {
        text: 'Progress %',
      },
      min: 0,
      max: 100,
    },
  })
  const [series] = useState([
    {
      name: 'Progress',
      // data: [
      //   [1486684800000, 34],
      //   [1486771200000, 43],
      //   [1486857600000, 31],
      //   [1486944000000, 43],
      //   [1487030400000, 33],
      //   [1487116800000, 52],
      // ],
      data: timelineSeries,
    },
  ])

  return (
    <div style={{ marginTop: '1rem', padding: '0 200px' }}>
      <Chart options={options} series={series} type='bar' width='1000' height='370' />
    </div>
  )
}

export default MilestonesGraph
