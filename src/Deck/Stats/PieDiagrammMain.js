import React, {useEffect, useRef, useContext} from 'react'
import Chart from "chart.js";
import {Context} from '../../Context'

export default function ChartComp() {

  const { dataBase, setDataBase } = useContext(Context);
  let ctx = useRef(null)

 // console.log(dataBase.openedToday, 'openedToday')

  useEffect(() => {


    var config = {
      type: 'doughnut',
      data: {
        legend:{
          labels:{
            generateLabels: function(){
              return ''
            }
          }
        }
        ,
        datasets: [{
          data: [
            300, 50, 100
          ],
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56"
          ],
          borderColor: [
            "#5aaa95", "#FF6384"
          ],
          borderWidth: 0,
          // hoverBackgroundColor: [
          //   "#FF6384",
          //   "#36A2EB",
          //   "#FFCE56"
          // ]
        }]
      },
      options: {
        center:{
        elements: {

          // text: `Daily Goal \n ${(dataBase.deckCompleted * 100) /
          //   Object.keys(dataBase.DeckNames).length} %`,

          fontStyle: "Times", // Default is Arial
          // sidePadding: 2, // Default is 20 (as a percentage)
          minFontSize: 12, // Default is 20 (in px), set to false and text will not wrap.

          // lineHeight: 19,
          // Default is 25 (in px), used for when text wraps
         
        },
      },
        tooltips: false, //removes the tooltips from the diagram that are present in the diagram in stats
        hover: {mode: null}, //when hovered over the diagram sections, nothing flashes or highlights
      
     
        
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
   // updateChart()

    new Chart(ctx.current, config);

  }, [])


  return (
    <canvas 
        ref={ctx} 
        className='pieChart'
        style={{ width: '110px', height: '110px', overflow: 'hidden', borderRadius: '5px' }} 
    >

    </canvas>

  )
}
