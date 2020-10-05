import React, { useState } from "react"
import Chart from "react-apexcharts"
// import { useSelector } from "react-redux"

export default function OverviewGraph() {
  // const allProjects = useSelector(state => state.projects.allProjects)
  const [options] = useState({
    chart: {
      background: "#dcdcdc",
      foreColor: "#333"
    },
    xaxis: {
      categories: ["date one", "date two", "date three", "date four", "date five"]
    },
    fill: {
      // colors: ["#345183"]
    },
    dalaLabels: {
      enabled: false
    },
    title: {
      text: "Projects Overview",
      align: "center",
      margin: 40,
      offsetY: 20,
      style: {
        fontSize: "1.6rem"
      }
    }
  })
  const [series] = useState([
    {
      name: "Progress",
      data: ["0%", 40, 30, 70, 80]
    }
  ])

  return (
    <div>
      <Chart
        options={options}
        series={series}
        type='bar'
        heigth='450'
        width='900'
        style={{ margin: "5vh 0 0 10vw" }}
      />
    </div>
  )
}
