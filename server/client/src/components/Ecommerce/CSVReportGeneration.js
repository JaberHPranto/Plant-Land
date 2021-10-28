import React from 'react';
import { CSVLink } from 'react-csv';

function CSVReportGeneration({ data }) {
    
    const csv_data = data
    const headers = [
        { label: "Date", key: "date" },
        { label: "Product ID", key: "product_id" },
        { label: "Product Name", key: "product_name" },
        { label: "Price/Per unit", key: "product_price" },
        { label: "Quantity", key: "product_qty" },
        { label: "Total", key: "total" },
    ]

    const csvReport = {
        filename: 'SalesReport.csv',
        headers,
        data:csv_data
    }
    

    return (
        <div style={{ marginTop: '2rem', textAlign: 'center', fontSize: '1.7rem', marginBottom: '5rem', fontFamily: 'Poppins' }} >
            <CSVLink {...csvReport} >Export to CSV</CSVLink>
        </div>
    )
}

export default CSVReportGeneration
