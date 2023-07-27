import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  // Title,
  Tooltip,

);

function ProgressChart({ linecolor , listofvalues }) {

  const labels = ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'];

  const options = {
    maintainAspectRatio: false,
    tooltips: {
      enabled: false,
    },
    responsive: true,
    plugins: {
          // tooltip: {
          //   callbacks: {
          //     label: (context) => {
          //       const label = context.dataset.label || '';
          //       const dataPoint = context.parsed.y;
          //       return `${label}: ${dataPoint}`;
          //     },
          //   },
          // },
          verticalLine: {
            display: true,
            color: 'rgba(111, 111, 111, 1)',
            dash: [3, 3],
            width: 1,
            xValue:'Day 7',
          },

      legend: {
        position: 'top',
      },
      title: {
        display: false,
        text: '',
      },
    },
    scales: {
      y: {
        display: false, // Hide y-axis
        suggestedMin: -1,
        suggestedMax: 6,
        grid: {
          drawBorder: false,
          drawOnChartArea: false,
        },
      },
      x: {
        grid: {
          // color: ['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0)', '#000'],
          drawTicks: false,
          display: false, // Hide x-axis grid lines

      },
      ticks: {
        color: (context) => {
          const index = context.index;
          console.log(index);
          return index === listofvalues.length - 1 ? linecolor : 'rgba(0,0,0, 1)';
        },
      },
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        label: '',
        data: listofvalues,
        borderColor: `${linecolor}`,
        // backgroundColor: 'rgb(255, 99, 132)',
        fill: false,
      },
    ],
  };

  const customPlugin = {
      id: 'verticalLine',
      afterDatasetsDraw: (chart) => {
        const linePlugin = chart.options.plugins.verticalLine;
        if (linePlugin.display) {
          const ctx = chart.ctx;
          const xScale = chart.scales['x'];
          const yScale = chart.scales['y'];
          const dataset = chart.data.datasets[0];
          const lastIndex = dataset.data.length - 1;
          const x = xScale.getPixelForValue(lastIndex);
          const height = yScale.getPixelForValue(dataset.data[lastIndex]) - yScale.getPixelForValue(dataset.data[lastIndex]);
          // score for Day 7 is the last datapoint
          const y = dataset.data[lastIndex];
          ctx.save();
          ctx.beginPath();
          ctx.setLineDash(linePlugin.dash);
          ctx.lineWidth = linePlugin.width;
          ctx.strokeStyle = linePlugin.color;
          // draw score text at the contact point of the first datapoint use the y value of the first dataset
          ctx.font = 'bold .45em Arial';
          // add margin to the left of the text
          // ctx.textBaseline = 'bottom';
                // Check if the current label is for the highlighted day and set the color accordingly
                // if (label === linePlugin.xValue)
   
          ctx.fillStyle = `${linecolor}`;
          ctx.textAlign = 'center';
          // text is placed on top of the contact point and offset it top of contact point by 20px
          ctx.fillText(parseFloat(y), x, yScale.getPixelForValue(dataset.data[lastIndex]) + height - 10);
          // move line to the contact point of the first datapoint
          ctx.moveTo(x,yScale.getPixelForValue(dataset.data[lastIndex]) + height);
          // ctx.moveTo(x, yScale.top - );
          ctx.lineTo(x, yScale.bottom);
          ctx.stroke();
          ctx.restore();
  
        console.log(lastIndex);
        }
      },
    };
    
  
    React.useEffect(() => {
      ChartJS.register(customPlugin);
    // eslint-disable-next-line
    }, []);
      
  return (
    <div style={{width: '100%', height: '100%', overflow:'visible'}}>
      <Line data={data} options={options} />
    </div>
  );
}

export default ProgressChart;