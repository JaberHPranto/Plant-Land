import React from 'react'
import "../../styles/ecommerce.css"
function Sidebar() {
    return (
        <div className="s-layout__sidebar">
            <a className="s-sidebar__trigger" href="#0">
            <i className="fa fa-bars" />
            </a>
            <nav className="s-sidebar__nav">
            <ul>
                <li>
                <a className="s-sidebar__nav-link" href="/market" style={{marginTop:"-5px"}}>
                    <i className="fa fa-home" /><em>Market</em>
                </a>
                </li>
                <li>
                <a className="s-sidebar__nav-link" href="/admin/orderData">
                    <i className="fas fa-th-large"></i><em>Dashboard</em>
                </a>
                </li>
                <li>
                <a className="s-sidebar__nav-link" href="/admin/orderList">
                    <i className="fas fa-shopping-cart"></i><em>Orders</em>
                </a>
                </li>
                <li>
                <a className="s-sidebar__nav-link" href="/admin/productList">
                    <i className="fas fa-shopping-bag"></i><em>Products</em>
                </a>
                </li>
                <li>
                <a className="s-sidebar__nav-link" href="/admin/saleData">
                    <i className="fas fa-chart-line"></i><em>Analytics</em>
                </a>
                </li>
                <li>
                <a className="s-sidebar__nav-link" href="/admin/userList">
                    <i className="fas fa-users"></i><em>Users</em>
                </a>
                </li>
            </ul>
            </nav>
        </div>
    )
}

export default Sidebar
