import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
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
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: false,
      text: 'Progress Line Chart',
    },
  },
  scales: {
    y: {
      display: false, // Hide y-axis
    },
    x: {
      grid: {
        color: ['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0)', '#000000', 'rgba(0, 0, 0, 0)'],
        drawTicks: false,
    },
      border: {
        dash: [5, 5],
      }
    },
  },
};

const labels = ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'];

export const data = {
  labels,
  datasets: [
    {
      label: '',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 5 })),
      borderColor: 'rgba(8, 255, 13, 0.8)',
      // backgroundColor: 'rgb(255, 99, 132)',
      fill: false,
    },
  ],
};

function ProgressChart() {
  return (
    <>
      <Line data={data} options={options} />
    </>
  );
}

export default ProgressChart;