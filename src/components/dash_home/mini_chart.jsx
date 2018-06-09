import React from 'react';

import { Line } from 'react-chartjs-2';
import _ from 'lodash';

const MiniChart = ({ stock }) => {
  const { quote } = stock;
  const parsedData = parseStockData(stock)
  let color = 'black';
  // let color = quote.change < 0 ? '#F03A3A' : '#00FF7F';

  const data = {
    labels: parsedData.dates,
    datasets: [
      {
        label: `Close`,
        data: parsedData.prices,
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

function parseStockData({ chart, quote }) {
  let dates = _.reverse(chart.map(data => data.date));
  let prices = _.reverse(Object.values(chart));
  let latestDate = `${new Date().getMonth() + 1}/${new Date().getDate()}`;
  let latestPrice = _.round(quote.latestPrice, 2);

  prices = prices.slice(0, new Date().getDay() - 1)
  prices = prices.map(date => _.round(date.close, 2));
  _.reverse(prices)
  prices.push(latestPrice);

  dates = dates.slice(0, new Date().getDay() - 1).map(date => {
    date = date.slice(5).split('-')
    date = date.map(num => parseInt(num, 10).toString())
    return date.join('/')
  });
  _.reverse(dates)
  dates.push(latestDate);

  return { prices, dates };
}

export default MiniChart;
