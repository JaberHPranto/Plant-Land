import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Col, Dropdown, DropdownButton, Form, FormControl, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getSaleData } from '../../../redux/actions/orderActions';
import "../../../styles/ecommerce.css";
import BarChart from '../Charts/BarChart';
import LineChart from '../Charts/LineChart';
import MonthBarChart from '../Charts/MonthBarChart';
import ProductSaleBarChart from '../Charts/ProductSaleBarChart';
import SalesPieChart from '../Charts/SalesPieChart';
import CSVReportGeneration from '../CSVReportGeneration';
import { monthData } from "../EcommSeedData";
import SaleDataCategory from '../SaleDataCategory';
import Sidebar from '../Sidebar';

function SaleDataScreen({ history }) {
    
    const [graphType, setGraphType] = useState("line")
    const [monthSale, setMonthSale] = useState("")
    const [productSale, setProductSale] = useState("")
    const [search, setSearch] = useState("")
    const [reportData, setReportData] = useState("")
    const [salesPieData, setSalesPieData] = useState("")

    const dispatch = useDispatch()
    const { userInfo: { user,token } } = useSelector(state => state.userLogin)

    const order = useSelector(state => state.orderSaleData)
    const { orderSaleData } = order


    useEffect(() => {
        if (user && user.isAdmin) {
            dispatch(getSaleData())
        } else {
            history.push("/login")
        }
    }, [dispatch, history, user])
    
    const handleSelect = (e) => {
        setGraphType(e)
    }

    const onSalesMonthSelect = (e) => {
        const { totalOrder } = orderSaleData?.find(el => el.month === e)
        const saleData = []
        const salesPieData = []

        for (let data of totalOrder) {
            for (let pd of data.orderedItems) {
                const date = data.createdAt.substring(0, 10);
                const product_id = pd._id;
                const product_name = pd.name;
                const product_price = pd.price;
                const product_qty = pd.qty;
                const total = pd.price * pd.qty
                saleData.push({ date, product_id, product_name, product_price, product_qty, total })

                // for pie chart
                salesPieData.push({ name: product_name, value: total })
                
            }
        }

        // console.log(salesPieData);

        // for pie chart
        const res = Array.from(salesPieData.reduce(
            (m, { name, value }) => m.set(name, (m.get(name) || 0) + value), new
            Map()), ([name, value]) => ({ name, value }));
        
        setSalesPieData(res)
        setReportData(saleData)
    }

    const onMonthSelect = async (e) => {
         try {
             const selectedMonth = e;

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        }
             const { data } = await axios.post(`/api/orders/saleDataByMonth`, { selectedMonth }, config)
             setMonthSale(data)
            
        } catch (error) {
            console.log(error)
        }
    }

    const handleSearchSubmit = async(e) => {
        e.preventDefault()
        console.log(search);
        // 60ee9cc0da14312998e1a300
        try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        }
             const { data } = await axios.post(`/api/orders/saleByAProduct`, {product_id:search }, config)
            setProductSale(data)
            
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <Row>
                <Col md={2}><Sidebar /></Col>
                <Col md={10}>
                    <>
                        <div className="sale-month-wise">
                            <h2>Month wise sale</h2>
                            <div className="sale-dw-info">
                                <DropdownButton  
                                    alignRight
                                    title="Select Graph Type"          
                                    id="dropdown-menu-align-right"
                                    onSelect={handleSelect}
                                >
                                    <Dropdown.Item key="line" eventKey="line">Line Graph</Dropdown.Item>
                                    <Dropdown.Item key="bar" eventKey="bar">Bar Graph</Dropdown.Item>
                                </DropdownButton>
                            </div>
                        </div>
                        {orderSaleData && <>{graphType === 'line' ? <LineChart orderData={orderSaleData} /> : <BarChart orderData={orderSaleData} />} </>}
                        

                        <h3 className='sale-day-heading'>Day wise Sales of a Month</h3>
                        <SaleDataCategory onSelect={onMonthSelect} data={monthData} />
                        {monthSale && <MonthBarChart monthSaleData={monthSale} />}

                        <div className="sale-product">
                            <h3 className='sale-day-heading'>Sale of a product by each month</h3>
                            <Form className="d-flex sale-product-form" onSubmit={handleSearchSubmit}>
                                <FormControl                              
                                    type="search"
                                    placeholder="ID of the product"
                                    className="me-2"
                                    aria-label="Search"
                                    onChange={(e)=>setSearch(e.target.value)}
                                />
                                
                                <Button className="bg-col-primary" type="submit" >Search</Button>
                            </Form>
                        </div>
                        {productSale && <ProductSaleBarChart monthWiseQty={productSale.monthWiseQty} productName={productSale.productName} />}
                        
                        <div className="sales-report">
                            <h3 className='sale-day-heading'>Sales Report Generation</h3>
                            <SaleDataCategory onSelect={onSalesMonthSelect} data={monthData} />
                            {reportData && <CSVReportGeneration data={reportData} />}
                            {salesPieData &&
                                <div>
                                <h4 className='pie-heading'>Contribution of sold products</h4>
                                <SalesPieChart pie_data={salesPieData} />
                                </div>
                            }
                        </div>

                        
                    </>
                </Col>
            </Row>
        </>
    )
}

export default SaleDataScreen
