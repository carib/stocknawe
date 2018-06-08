import React from 'react';

import { Line } from 'react-chartjs-2';
import _ from 'lodash';

const MiniChart = (props) => {
  const { chart, quote } = props.stock;
  const cLength = chart.length;
  const slicedChart = chart.slice(cLength - 7, cLength);
  const data = {
    labels: slicedChart.map(date => date.date.slice(5).split('-').join('/')),
    datasets: [
      {
        label: `High`,
        data: Object.values(chart).slice(0,7).map(date => _.round(date.high, 2)),
        fill: true,
        borderColor: '#00FF7F',
        pointBorderColor: '#00FF7F',
        pointStyle: 'cross',
        pointRadius: 3,
        borderWidth: 1,
        showLine: true,
      },
    ]
  }

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    layout: {
      padding: {
        top: 5,
        bottom: 0,
        right: 0,
        left: 0,
      }
    },
    title: {
      display: false,
      text: `${quote.symbol}`
    },
    tooltips: {
      mode: 'label'
    },
    legend: {
      display: false,
      labels: {
        usePointStyle: true
      }
    },
    hover: {
      mode: 'dataset'
    },
    scales: {
      xAxes: [
        {
          ticks: {
            fontSize: 9
          },
          display: false,
          scaleLabel: {
            show: true,
            labelString: 'Day'
          },
          gridLines: {
            display: false
          },
        },
      ],
      yAxes: [
        {
          type: 'linear',
          display: true,
          position: 'right',
          scaleLabel: {
            show: true,
            labelString: '$$$'
          },
          gridLines: {
            drawBorder: false
          },
          ticks: {
            fontSize: 9,
          }
        }
      ]
    }
  }

  return (
    <Line data={data} options={options} />
  )
}

export default MiniChart;
