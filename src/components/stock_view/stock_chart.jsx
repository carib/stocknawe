import React from 'react';

import { Line } from 'react-chartjs-2';

import * as Util from '../util/util';

const StockChart = (props) => {
  const { quote } = props.stock;
  const parsedData = Util.parseStockData(props.stock, ['high', 'low']);
  const data = {
    labels: parsedData.dates,
    datasets: [
      {
        label: `Low`,
        data: parsedData.prices['low'],
        fill: true,
        borderColor: 'tomato',
        pointBorderColor: 'tomato',
        backgroundColor: 'tomato',
        pointStyle: 'rectRot',
        pointRadius: 5,
        borderWidth: 1,
        showLine: false,
      },
      {
        label: `High`,
        data: parsedData.prices['high'],
        fill: true,
        borderColor: '#00FF7F',
        pointBorderColor: '#00FF7F',
        backgroundColor: '#00FF7F',
        pointStyle: 'rectRot',
        pointRadius: 5,
        borderWidth: 1,
        showLine: false,
      }
    ]
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 15,
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
      display: true,
      position: 'bottom',
      labels: {
        usePointStyle: true,
        fontSize: 10
      }
    },
    hover: {
      mode: 'dataset'
    },
    scales: {
      xAxes: [
        {
          display: true,
          gridLines: {
            // color: 'black'
          },
          scaleLabel: {
            show: true,
            labelString: 'Day'
          }
        }
      ],
      yAxes: [
        {
          type: 'linear',
          display: true,
          position: 'right',
          gridLines: {
            // color: 'black'
          },
          scaleLabel: {
            show: true,
            fontFamily: 'Lato'
          },
          ticks: {
            callback: function (value, index, values) {
              return '$' + value;
            }
          }
        }
      ]
    }
  }

  return (
    <Line data={data} options={options} />
  )
}

export default StockChart;
