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
      suggestedMax: 5,
      grid: {
        drawBorder: false,
        drawOnChartArea: false,
      },
    },
    x: {
      grid: {
        color: ['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0)', '#000000', 'rgba(0, 0, 0, 0)'],
        drawTicks: false,
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
      data: labels.map(() => faker.datatype.number({ min: 1, max: 5 })),
      borderColor: 'rgba(50, 188, 163, 1)',
      // backgroundColor: 'rgb(255, 99, 132)',
      fill: false,
    },
  ],
};

function ProgressChart() {
  return (
    <div style={{width: '100%', height: '100%'}}>
      <Line data={data} options={options} />
    </div>
  );
}

export default ProgressChart;