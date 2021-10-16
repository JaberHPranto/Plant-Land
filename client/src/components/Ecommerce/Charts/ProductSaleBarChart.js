import React from 'react';
import { Bar } from 'react-chartjs-2';

function ProductSaleBarChart({ monthWiseQty,productName}) {


    const data = {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      datasets: [
        {
          label: `Sale of ${productName} by each month`,
          data: monthWiseQty,
              backgroundColor: [
                  'rgba(0,158,96, 0.2)',
                  'rgba(0,158,96, 0.2)',
                  'rgba(0,158,96, 0.2)',
                  'rgba(0,158,96, 0.2)',
                  'rgba(0,158,96, 0.2)',
                  'rgba(0,158,96, 0.2)',
                  'rgba(0,158,96, 0.2)',
                  'rgba(0,158,96, 0.2)',
                  'rgba(0,158,96, 0.2)',
                  'rgba(0,158,96, 0.2)',
                  'rgba(0,158,96, 0.2)',
                  'rgba(0,158,96, 0.2)',
                  
              ],
              
              borderColor: [
                  'rgba(0,158,96, 0.8)',
                  'rgba(0,158,96, 0.8)',
                  'rgba(0,158,96, 0.8)',
                  'rgba(0,158,96, 0.8)',
                  'rgba(0,158,96, 0.8)',
                  'rgba(0,158,96, 0.8)',
                  'rgba(0,158,96, 0.8)',
                  'rgba(0,158,96, 0.8)',
                  'rgba(0,158,96, 0.8)',
                  'rgba(0,158,96, 0.8)',
                  'rgba(0,158,96, 0.8)',
                  'rgba(0,158,96, 0.8)',
                  'rgba(0,158,96, 0.8)',
              ],
              
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

export default ProductSaleBarChart
