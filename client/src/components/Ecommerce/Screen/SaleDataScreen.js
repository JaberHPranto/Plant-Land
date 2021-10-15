import React, { useEffect, useState } from 'react';
import { Col, Dropdown, DropdownButton, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getSaleData } from '../../../redux/actions/orderActions';
import "../../../styles/ecommerce.css";
import BarChart from '../Charts/BarChart';
import LineChart from '../Charts/LineChart';
import Sidebar from '../Sidebar';

function SaleDataScreen({ history }) {
    
    const [graphType, setGraphType] = useState("line")

    const dispatch = useDispatch()
    const { userInfo: { user } } = useSelector(state => state.userLogin)

    const order = useSelector(state => state.orderSaleData)
    const { loading, error, orderSaleData } = order

    if (orderSaleData) console.log(orderSaleData)


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
                        


                    </>
                </Col>
            </Row>
        </>
    )
}

export default SaleDataScreen
