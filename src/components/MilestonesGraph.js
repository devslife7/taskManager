import React, { useState } from "react"
import Chart from "react-apexcharts"

function MilestonesGraph() {
  const [options] = useState({
    chart: {
      background: "#f4f4f4",
      // foreColor: "#333"
    },
    xaxis: {
      categories: ["date", "date", "date", "date"],
    },
  })
  const [series] = useState([
    {
      name: "Progress",
      data: [20, 10, 30, 50, 80],
    },
  ])

  return (
    <div style={{ width: "50vw", marginTop: "2vh", marginLeft: "10vw" }}>
      <Chart options={options} series={series} type='line' heigth='100' width='100%' />
    </div>
  )
}

export default MilestonesGraph
