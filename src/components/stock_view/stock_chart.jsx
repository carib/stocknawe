import React from 'react';

import { Line } from 'react-chartjs-2';
import _ from 'lodash';


const StockChart = (props) => {
  const { chart, quote } = props.stock;
  const cLength = chart.length
  const data = {
    labels: chart.slice(cLength - 7, cLength).map(date => `${date.label}`),
    datasets: [
      {
        label: `High`,
        data: Object.values(chart).slice(0,7).map(date => _.round(date.high, 2)),
        fill: true,
        borderColor: '#00FF7F',
        pointBorderColor: '#00FF7F',
        pointStyle: 'cross',
        pointRadius: 5,
        borderWidth: 1,
        showLine: false,
      },
      {
        label: `Low`,
        data: Object.values(chart).slice(0,7).map(date => _.round(date.low, 2)),
        fill: true,
        borderColor: 'tomato',
        pointBorderColor: 'tomato',
        pointStyle: 'cross',
        pointRadius: 5,
        borderWidth: 1,
        showLine: false,
      }
    ]
  }
  console.log(data);
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 100,
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
      // position: 'bottom',
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
          display: true,
          scaleLabel: {
            show: true,
            labelString: 'Day'
          }
        }
      ],
      yAxes: [
        {
          display: true,
          scaleLabel: {
            show: true,
            labelString: '$$$'
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
    <Line data={data} options={options} width={600} height={400} redraw={true}/>
  )
}

export default StockChart;
