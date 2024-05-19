/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */

import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip
);

type ChartProps = {
  data: [number, string][] | null;
  height: number;
  gain: number | undefined;
  loss: number | undefined;
};

const Chart: React.FC<ChartProps> = ({ data, height, gain, loss }) => {
  const [formattedData, setFormattedData] = useState<
    { x: string; y: number }[]
  >([]);

  useEffect(() => {
    if (data) {
      const formatted = data.map(([value, time]) => ({
        x: time, // Horário
        y: value // Valor
      }));
      setFormattedData(formatted);
    }
  }, [data]);

  const verticalLine = {
    id: 'verticalLine',
    afterDraw: (chart: any) => {
      if (chart.tooltip?._active?.length) {
        let x = chart.tooltip._active[0].element.x;
        let yAxis = chart.scales.y as any;
        let ctx = chart.ctx as any;
        ctx.save();
        ctx.beginPath();
        ctx.setLineDash([5, 5]);
        ctx.moveTo(x, yAxis.top);
        ctx.lineTo(x, yAxis.bottom);
        ctx.lineWidth = 1;
        ctx.strokeStyle = 'rgba(99, 216, 242, 1)';
        ctx.stroke();
        ctx.restore();
      }
    }
  };

  const options: any = {
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.05)'
        },
        ticks: {
          font: {
            family: 'sans-serif'
          },
          color: 'rgba(166, 177, 180, 0.5)'
        }
      },
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(255, 255, 255, 0.05)'
        },
        ticks: {
          font: {
            family: 'sans-serif'
          },
          color: 'rgba(99, 216, 242, 0.5)'
        }
      }
    },
    plugins: {
      tooltip: {
        displayColors: false,
        titleColor: 'transparent',
        bodyColor: 'rgba(99, 216, 242, 1)',
        caretPadding: 4,
        bodyFont: {
          family: 'sans-serif',
          weight: '700'
        },
        yAlign: 'bottom',
        backgroundColor: 'transparent',
        fontFamily: 'sans-serif'
      }
    },
    responsive: true,
    interaction: {
      intersect: false
    },
    radius: 0
  };

  const labels = formattedData.map((item) => item.x);

  const backgroundColor = (context: any) => {
    const bgColor = ['rgba(99, 216, 242, 0.2)', 'rgba(99, 216, 242, 0)'];

    if (!context.chart.chartArea) return;

    const {
      ctx,
      chartArea: { top, bottom }
    } = context.chart;

    const gradientBg = ctx.createLinearGradient(0, top, 0, bottom);
    gradientBg.addColorStop(0, bgColor[0]);
    gradientBg.addColorStop(1, bgColor[1]);
    return gradientBg;
  };

  const dataChart: any = {
    labels,
    datasets: [
      {
        data: formattedData.map((item) => item.y),
        borderColor: 'rgba(99, 216, 242, 1)',
        pointBackgroundColor: 'rgba(99, 216, 242, 1)',
        backgroundColor,
        borderWidth: 3,
        fill: 'origin'
      },
      {
        data: Array(formattedData.length).fill(gain),
        borderColor: '#8fd439',
        borderWidth: 2,
        borderDash: [5, 5],
        label: 'Para ganhar'
      },
      {
        data: Array(formattedData.length).fill(loss ? -loss : 0),
        borderColor: '#c70039',
        borderWidth: 2,
        borderDash: [5, 5],
        label: `Para perder`
      }
    ]
  };

  if (!data) return null;
  return (
    <div style={{ height }}>
      <Line options={options} data={dataChart} plugins={[verticalLine]} />
    </div>
  );
};

export default Chart;
