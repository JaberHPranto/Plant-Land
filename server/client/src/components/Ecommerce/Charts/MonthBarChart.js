import React from 'react';
import { Bar } from 'react-chartjs-2';

function BarChart({ monthSaleData }) {
    
    const saleByMonth = []
    if (monthSaleData) {
        for (let i = 1; i <= monthSaleData.length;i++) {
            saleByMonth.push(monthSaleData[i])
        }
    }

    const daysOfMonthLabel = []
    const colorArray = []
    const colorArrayBorder = []

    for (let i = 0; i < monthSaleData.length; i++) {
        daysOfMonthLabel[i] = i + 1
        colorArray[i] = 'rgba(0,158,96, 0.2)'
        colorArrayBorder[i]='rgba(0,158,96, 0.8)'
    }

    const data = {
      labels: daysOfMonthLabel,
      datasets: [
        {
          label: 'Sale per day',
          data: saleByMonth,
              backgroundColor: colorArray,
              borderColor: colorArrayBorder,
              
          borderWidth: 1,
        },
      ],
    };
    
    const options = {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    };
    return (
        <div>
            <Bar data={data} options={options} />
        </div>
    )
}

export default BarChart
