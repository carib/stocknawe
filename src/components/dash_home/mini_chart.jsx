import React from 'react';

import { Line } from 'react-chartjs-2';

import * as Util from '../util/util';

const MiniChart = ({ stock }) => {
  const { quote } = stock;
  const parsedData = Util.parseStockData(stock, ['close']);
  let color = 'black';
  const data = {
    labels: parsedData.dates,
    datasets: [
      {
        label: `Close`,
        data: parsedData.prices['close'],
        fill: true,
        borderColor: color,
        pointBorderColor: color,
        pointStyle: 'cross',
        pointRadius: 3,
        borderWidth: 1,
        showLine: true,
        cubicInterpolationMode: 'monotone'
      },
    ]
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
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
          // type: 'time',
          display: true,
          ticks: {
            fontSize: 9,
          },

          scaleLabel: {
            fontFamily: 'Lato'
          },
          gridLines: {
            display: false,
            tickMarkLength: 7
          },
        },
      ],
      yAxes: [
        {
          type: 'linear',
          display: true,
          position: 'right',
          scaleLabel: {
            fontFamily: 'Lato'
          },
          gridLines: {
            drawBorder: false,
            tickMarkLength: 3
          },
          ticks: {
            major: {
              display: true,
            },
            fontSize: 9,
          }
        }
      ]
    }
  }

  return (
    <Line data={data} options={options} width={100} redraw={true}/>
  )
}

export default MiniChart;
