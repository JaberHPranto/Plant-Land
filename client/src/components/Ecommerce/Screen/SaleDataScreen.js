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
import { monthData } from "../EcommSeedData";
import SaleDataCategory from '../SaleDataCategory';
import Sidebar from '../Sidebar';

function SaleDataScreen({ history }) {
    
    const [graphType, setGraphType] = useState("line")
    const [monthSale, setMonthSale] = useState("")
    const [productSale, setProductSale] = useState("")
    const [search, setSearch] = useState("")

    const dispatch = useDispatch()
    const { userInfo: { user,token } } = useSelector(state => state.userLogin)

    const order = useSelector(state => state.orderSaleData)
    const { loading, error, orderSaleData } = order

    // if (orderSaleData) console.log(orderSaleData)


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
            console.log(data);
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
                        
                    </>
                </Col>
            </Row>
        </>
    )
}

export default SaleDataScreen
