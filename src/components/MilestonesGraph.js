import React, { useState } from "react"
import Chart from "react-apexcharts"

function MilestonesGraph() {
  const [options, setOptions] = useState({
    chart: {
      // background: "#f4f4f4"
      // foreColor: "#333"
    },
    xaxis: {
      categories: ["date", "date", "date", "date"]
    }
  })
  const [series, setSeries] = useState([
    {
      name: "Progress",
      data: [20, 10, 30, 50, 80]
    }
  ])

  return (
    <div>
      {/* <h2>Chart Here</h2> */}
      <Chart options={options} series={series} type='line' heigth='450' width='100%' />
    </div>
  )
}

export default MilestonesGraph
