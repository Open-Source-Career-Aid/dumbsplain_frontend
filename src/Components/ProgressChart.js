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
import { useRef } from 'react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  // Title,
  Tooltip,

);


function ProgressChart({ linecolor, listofvalues }) {
  const labels = ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'];

  const options = {
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
        display: false,
        suggestedMin: -1,
        suggestedMax: 6,
        grid: {
          drawBorder: false,
          drawOnChartArea: false,
        },
      },
      x: {
        grid: {
          drawTicks: false,
          display: false,
        },
        ticks: {
          callback: (value, index) => {
            // Highlight the label on hover
            const isHovered = index === hoverIndex;
            return isHovered ? `Day ${index + 1}` : value;
          },
        },
      },
    },
    onHover: (event, elements) => {
      const chart = event.chart;
      const xScale = chart.scales['x'];
      if (elements.length > 0) {
        const index = elements[0].index;
        setHoverIndex(index);
        xScale._update();
      } else {
        setHoverIndex(null);
        xScale._update();
      }
    },
  };

  const data = {
    labels,
    datasets: [
      {
        label: '',
        data: listofvalues,
        borderColor: `${linecolor}`,
        fill: false,
      },
    ],
  };

  const [hoverIndex, setHoverIndex] = React.useState(null);

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
        const y = dataset.data[lastIndex];
        ctx.save();
        ctx.beginPath();
        ctx.setLineDash(linePlugin.dash);
        ctx.lineWidth = linePlugin.width;
        ctx.strokeStyle = linePlugin.color;
        ctx.font = 'bold .45em Arial';
        ctx.fillStyle = `${linecolor}`;
        ctx.textAlign = 'center';
        ctx.fillText(parseFloat(y), x, yScale.getPixelForValue(dataset.data[lastIndex]) + height - 10);
        ctx.moveTo(x, yScale.getPixelForValue(dataset.data[lastIndex]) + height);
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
    <div style={{ width: '100%', height: '100%', overflow: 'visible' }}>
      <Line data={data} options={options} />
    </div>
  );
}


export default ProgressChart;