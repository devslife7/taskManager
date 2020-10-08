import { format, fromUnixTime } from "date-fns"
import React, { useState } from "react"
import Chart from "react-apexcharts"
import { useSelector } from "react-redux"

function TasksGraph() {
  const currentMilestone = useSelector(state => state.milestones.currentMilestone)
  const currentMilestoneTasksSorted = currentMilestone.tasks.sort((a, b) => b.end_date - a.end_date).reverse()
  const timelineSeries = currentMilestoneTasksSorted.map(t => ({
    x: format(fromUnixTime(t.end_date), "PP"),
    y: t.progress,
  }))

  console.log(timelineSeries)

  const [options] = useState({
    chart: {
      height: 350,
      type: "line",
      zoom: {
        enabled: true,
      },
    },
    dataLabels: {
      enabled: true,
    },
    stroke: {
      curve: "straight",
    },
    title: {
      text: "Task Progress over Time",
      align: "center",
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
    <div style={{ width: "65vw", marginTop: "2vh", marginLeft: "10vw" }}>
      <Chart options={options} series={series} type='line' heigth='100' width='100%' />
    </div>
  )
}

export default TasksGraph
