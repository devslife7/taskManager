import React, { useState } from "react"
import Chart from "react-apexcharts"

function TasksGraph() {
  const [options] = useState({
    chart: {
      // background: "#f4f4f4"
      // foreColor: "#333"
    },
    xaxis: {
      categories: ["date one", "date two", "date three", "date four", "date five"]
    }
  })
  const [series] = useState([
    {
      name: "Progress",
      data: [10, 40, 30, 70, 80]
    }
  ])

  return (
    <div>
      {/* <h2>Chart Here</h2> */}
      <Chart options={options} series={series} type='line' heigth='450' width='90%' />
    </div>
  )
}

export default TasksGraph
