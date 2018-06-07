import React from 'react';

import { Line } from 'react-chartjs-2';
import _ from 'lodash';


const StockChart = (props) => {
  const { chart, quote } = props.stock;
  const cLength = chart.length
  console.log(props);
  // debugger
  const data = {
    labels: chart.slice(cLength - 7, cLength).map(date => `${date.label}`),
    datasets: [
      {
        label: `High`,
        data: Object.values(chart).slice(0,7).map(date => _.round(date.high, 2)),
        fill: true,
        pointBorderColor: '#00FF7F',
        pointStyle: 'cross',
        borderWidth: 1,
        showLine: true,
      },
      {
        label: `Low`,
        data: Object.values(chart).slice(0,7).map(date => _.round(date.low, 2)),
        fill: true,
        pointBorderColor: 'tomato',
        pointStyle: 'cross',
        borderWidth: 1,
        showLine: true,
      }
    ]
  }
  console.log(data);
  const options = {
    maintainAspectRatio: false,
    responsive: true,
    title: {
      display: true,
      text: `${props.stock.quote.symbol} Daily Performance`
    },
    tooltips: {
      mode: 'label'
    },
    legend: {
      display: true,
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
    <Line data={data} options={options} width={600} height={400}/>
  )
}

export default StockChart;
