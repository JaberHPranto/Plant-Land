import React from 'react';
import { Line } from 'react-chartjs-2';

function LineChart({ orderData }) {
    const saleByMonth=[]
    if (orderData) {
        for (let od of orderData) {
            saleByMonth.push(od.numOfOrder)
        }
    }
    const data = {
            
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [
            {
                label: '# of Sales By Month',
                data: saleByMonth,
                fill: false,
                pointRadius:5,
                backgroundColor: 'rgb(0,158,96)',
                borderColor: 'rgba(0,158,96, 0.2)',
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
            <Line data={data} options={options} />
        </div>
    )
}

export default LineChart
