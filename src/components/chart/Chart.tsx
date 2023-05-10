import React, { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import Statistics from '../../core/types/statistics';

interface ChartProps {
  statistics: Statistics[];
}

const Chart = (props: ChartProps) => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Authors rating',
      },
    },
  };

  const labels = props.statistics.map((item) => item.author);
  const points = props.statistics.map((item) => item.points);

  const data = {
    labels,
    datasets: [
      {
        label: 'author points',
        data: points,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  return <Bar options={options} data={data} />;
};

export default Chart;
