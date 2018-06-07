import React from 'react';
import { Line } from 'react-chartjs-2';

const StockChart = ({props}) => {
  const data = {
    labels: Object.keys(props.stock).slice(0,7),
    datasets: [
      {
        label: `${props.term} Closing Price`,
        data: Object.values(props.stock).slice(0,7).map(date => parseFloat(date['4. close'])),
        fill: true,
        borderDash: [5, 5],
        pointBorderColor: 'tomato'

      }
    ]
  }

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    title: {
      display: true,
      text: `${props.term} Daily Performance`
    },
    tooltips: {
      mode: 'label'
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
        }
      ]
    }
  }

  return (
    <Line data={data} options={options} width={600} height={400}/>
  )
}

export default StockChart;
