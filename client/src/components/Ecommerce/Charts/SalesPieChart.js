import React from 'react';
import { Pie } from 'react-chartjs-2';

function SalesPieChart({ pie_data }) {
    

    const dataLabel = []
    const dataValues = []

    for (let pd of pie_data) {
        const val = parseInt(pd.value)
        dataLabel.push(pd.name)
        dataValues.push(val)
    }

    const bgColPalette = [
        'rgba(255, 99, 132, 0.2)', //Red
        'rgba(54, 162, 235, 0.2)', //Blue
        'rgba(255, 206, 86, 0.2)', // Yellow
        'rgba(75, 192, 192, 0.2)', // Green
        'rgba(153, 102, 255, 0.2)', // Purple
        'rgba(255, 159, 64, 0.2)', // Orange
        'rgba(255, 99, 132, 0.8)', //Red
        'rgba(54, 162, 235, 0.8)', //Blue
        'rgba(255, 206, 86, 0.8)', // Yellow
        'rgba(75, 192, 192, 0.8)', // Green
        'rgba(153, 102, 255, 0.8)', // Purple
        'rgba(255, 159, 64, 0.8)', // Orange
        'rgba(255, 99, 132,1)', //Red
        'rgba(54, 162, 235, 1)', //Blue
        'rgba(255, 206, 86, 1)', // Yellow
        'rgba(75, 192, 192, 1)', // Green
        'rgba(153, 102, 255, 1)', // Purple
        'rgba(255, 159, 64, 1)', // Orange
    ]
    const borderColPalette = [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
    ]


    const background = []
    const border = []

    for (let i = 0; i < pie_data.length; i++){
        background[i] = bgColPalette[i]
        border[i] = borderColPalette[i]
    }

    const data = {
        labels: dataLabel,
        datasets: [
            {
                label: 'Contribution of each product',
                data: dataValues,
                backgroundColor:background ,
                borderColor:border,
                borderWidth: 1,
            },
         ],
        
    };
    
    return (
                
        <div style={{ width: '50%', margin: 'auto' }}>
            <Pie data={data} />
        </div>
    )
}

export default SalesPieChart
