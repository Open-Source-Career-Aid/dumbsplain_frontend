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
import { faker } from '@faker-js/faker';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  // Title,
  Tooltip,

);

export const options = {
  maintainAspectRatio: false,
  tooltips: {
    enabled: false,
  },
  responsive: true,
  plugins: {
        tooltip: {
          callbacks: {
            label: (context) => {
              const label = context.dataset.label || '';
              const dataPoint = context.parsed.y;
              return `${label}: ${dataPoint}`;
            },
          },
        },
        verticalLine: {
          display: true,
          color: 'red',
          dash: [5, 5],
          width: 2,
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
      suggestedMin: 0,
      suggestedMax: 7,
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
    border: {
      dash: [5, 5],
    },
    },
  },
};

const labels = ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'];

export const data = {
  labels,
  datasets: [
    {
      label: '',
      data: labels.map(() => faker.datatype.number({ min: 1.0, max: 5.0 })),
      borderColor: 'rgba(50, 188, 163, 1)',
      // backgroundColor: 'rgb(255, 99, 132)',
      fill: false,
    },
  ],
};



function ProgressChart() {
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
            ctx.font = 'bold .5em Arial';
            // add margin to the left of the text
            // ctx.textBaseline = 'bottom';
            ctx.fillStyle = 'red';
            ctx.textAlign = 'left';
            // text is placed on top of the contact point and offset it top of contact point by 20px
            ctx.fillText(parseFloat(y), x, yScale.getPixelForValue(dataset.data[lastIndex]) + height - 20);
            // move line to the contact point of the first datapoint
            ctx.moveTo(x,yScale.getPixelForValue(dataset.data[lastIndex]) + height);
            // ctx.moveTo(x, yScale.top - );
            ctx.lineTo(x, yScale.bottom);
            ctx.stroke();
            ctx.restore();
          }
        },
      };
    
      React.useEffect(() => {
        ChartJS.register(customPlugin);
      }, []);
      
  return (
    <div style={{width: '100%', height: '100%'}}>
      <Line data={data} options={options} />
    </div>
  );
}

export default ProgressChart;