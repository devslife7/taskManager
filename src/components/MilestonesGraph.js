import { format, fromUnixTime } from "date-fns"
import React, { useState } from "react"
import Chart from "react-apexcharts"
import { useSelector } from "react-redux"

function MilestonesGraph() {
  const currentProject = useSelector(state => state.projects.currentProject)
  const currentProjectMilestonesSorted = currentProject.milestones
    .sort((a, b) => b.end_date - a.end_date)
    .reverse()

  const timelineSeries = currentProjectMilestonesSorted.map(t => ({
    x: format(fromUnixTime(t.end_date), "PP"),
    y: t.progress,
  }))
  console.log("Milestone timelineSeries: ", timelineSeries)

  const [options] = useState({
    chart: {
      // height: "50vw",
      // width: "50vw",
      // heigth: 100,
      type: "line",
      zoom: {
        enabled: true,
      },
      animations: {
        // enabled: false,
      },
    },
    dataLabels: {
      enabled: true,
    },
    stroke: {
      curve: "smooth",
    },
    title: {
      text: "Task Progress",
      align: "left",
    },
    grid: {
      row: {
        colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
        opacity: 0.5,
      },
    },
    xaxis: {
      // categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"],
      type: "datetime",
      title: {
        // text: "Date",
      },
    },
    yaxis: {
      title: {
        text: "Progress(%)",
      },
    },
  })
  const [series] = useState([
    {
      name: "Progress",
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
    <div style={{ width: "50rem", margin: "2vh auto" }}>
      <Chart options={options} series={series} type='bar' />
    </div>
  )
}

export default MilestonesGraph
