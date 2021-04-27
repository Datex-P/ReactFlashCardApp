import React, {useEffect, useRef} from 'react'
import Chart from "chart.js";

export default function ChartComp() {

  let ctx = useRef(null)

  useEffect(() => {


    var config = {
      type: 'doughnut',
      data: {
        labels: [
          "Red",
          "Green",
          "Yellow"
        ],
        datasets: [{
          data: [300, 50, 100],
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56"
          ],
          borderColor: [
            'rgba(184, 156, 110, 0.95)',
            'rgba(184, 156, 110, 0.95)',
            'rgba(184, 156, 110, 0.95)'
          ],
          borderWidth: 1,
          hoverBackgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56"
          ]
        }]
      },
      options: {
        elements: {
          // center: {
          //   text: `Data from ${new Date().toLocaleString('de-DE', {
          //     day: 'numeric',
          //     month: 'numeric',
          //     year: 'numeric',
          //   })}`,

        //   center:{
        // text: 
        // //!dataBase.openedToday ? 
        // 'No cards studied today' : `Data from ${todayDate.toLocaleString('de-DE', {

        //     day: 'numeric',
        //     month: 'numeric',
        //     year: 'numeric',
        //   })}`
        //   ,
        //     //color: '#FF6384', // Default is #000000
        //     color: 'black',
        //     fontStyle: 'Arial', // Default is Arial
        //     sidePadding: 2, // Default is 20 (as a percentage)
        //     minFontSize: 14, // Default is 20 (in px), set to false and text will not wrap.
        //     lineHeight: 19,
        //     // Default is 25 (in px), used for when text wraps
        //   }
        },
        legend: {
          position: 'bottom',
          labels: {
            fontColor: 'black'
          }

        },
        cutoutPercentage: 81,
        maintainAspectRatio: false,
        layout: {
          padding: {
            top: 10
          },
          border: 'none'
        }
      }
    };

    function updateChart() {

      config.data.datasets[0].data = [10, 20, 30, 40, 50];
      config.data.datasets[0].backgroundColor = ['green', 'blue', 'yellow',
        'purple', 'red'];
      config.data.datasets[0].borderColor = ['green', 'blue', 'yellow',
        'purple', 'red']
      config.data.hoverBackgroundColor = ['green', 'blue', 'yellow',
        'purple', 'red']
      config.data.labels = ['green', 'blue', 'yellow',
        'purple', 'red']

      //config.update()
    }
    updateChart()

    new Chart(ctx.current, config);

  }, [])


  return (
    <canvas 
        ref={ctx} 
        className='pieChart'
        style={{ width: '270px', height: '200px', overflow: 'hidden', borderRadius: '5px' }} 
    >

    </canvas>

  )
}

// document.querzSelector('canvas').value == ctx.current.value