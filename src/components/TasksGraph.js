import React, { useState } from "react"
import Chart from "react-apexcharts"
import { useSelector } from "react-redux"

function TasksGraph() {
  const currentMilestone = useSelector(state => state.milestones.currentMilestone)
  const currentMilestoneSorted = currentMilestone.tasks.sort((a, b) => b.end_date - a.end_date)
  const timelineSeries = currentMilestoneSorted.map(t => [t.end_date, t.progress])

  console.log(timelineSeries)

  const [options] = useState({
    chart: {
      height: 380,
      width: "100%",
      type: "area",
      animations: {
        initialAnimation: {
          enabled: false,
        },
      },
    },
    xaxis: {
      type: "datetime",
    },
  })
  const [series] = useState([
    {
      name: "Progress",
      data: timelineSeries, //[[1324508400000, 34], [1324594800000, 54] , ... , [1326236400000, 43]]
    },
  ])

  return (
    <div style={{ width: "65vw", marginTop: "2vh", marginLeft: "10vw" }}>
      <Chart options={options} series={series} type='line' heigth='100' width='100%' />
    </div>
  )
}

export default TasksGraph
