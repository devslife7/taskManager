import React, { useState } from 'react'
import Chart from 'react-apexcharts'
import { useSelector } from 'react-redux'

export default function OverviewGraph() {
  const allProjects = useSelector(state => state.projects.allProjects)

  const filteredProjects = allProjects.sort((a, b) => b.end_date - a.end_date).reverse()

  const projectNames = filteredProjects.map(proj => proj.name)
  const projectProgress = filteredProjects.map(proj => proj.progress)

  const [options] = useState({
    chart: {
      // background: '#dcdcdc',
      // background: '#f4f4f4',
      // foreColor: "#333",
    },
    xaxis: {
      categories: projectNames,
    },
    yaxis: {
      title: {
        text: 'Progress %',
        style: {
          fontSize: '1.1rem',
          fontWeight: 400,
        },
      },
      min: 0,
      max: 100,
    },
    fill: {
      // colors: ["#345183"]
    },
    dalaLabels: {
      enabled: false,
    },
    title: {
      text: 'Projects Overview',
      align: 'center',
      // margin: 10,
      offsetY: 30,
      style: {
        fontSize: '1.6rem',
        fontWeight: 400,
      },
    },
  })
  const [series] = useState([
    {
      name: 'Progress',
      data: projectProgress,
    },
  ])

  return (
    <div>
      <Chart options={options} series={series} type='bar' width='1600' height='500' />
    </div>
  )
}
