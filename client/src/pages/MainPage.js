import React from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route } from "react-router-dom";
// Blog Section
import Blog from "../components/Blog/Blog";
import BlogDetails from "../components/Blog/BlogDetails";
import NewBlog from "../components/Blog/NewBlog";
// E-Commerce Section
import Footer from "../components/Ecommerce/Footer";
import Header from '../components/Ecommerce/Header';
import CartScreen from '../components/Ecommerce/Screen/CartScreen';
import ForgetPasswordScreen from '../components/Ecommerce/Screen/ForgetPasswordScreen';
import HomeScreen from '../components/Ecommerce/Screen/HomeScreen';
import LoginScreen from '../components/Ecommerce/Screen/LoginScreen';
import OrderDataScreen from "../components/Ecommerce/Screen/OrderDataScreen";
import OrderListScreen from "../components/Ecommerce/Screen/OrderListScreen";
import PasswordResetScreen from '../components/Ecommerce/Screen/PasswordResetScreen';
import PaymentScreen from "../components/Ecommerce/Screen/PaymentScreen";
import PlaceOrderScreen from "../components/Ecommerce/Screen/PlaceOrderScreen";
import ProductEditScreen from "../components/Ecommerce/Screen/ProductEditScreen";
import ProductListScreen from "../components/Ecommerce/Screen/ProductListScreen";
import ProductScreen from '../components/Ecommerce/Screen/ProductScreen';
import ProfileScreen from '../components/Ecommerce/Screen/ProfileScreen';
import RegisterScreen from '../components/Ecommerce/Screen/RegisterScreen';
import SaleDataScreen from "../components/Ecommerce/Screen/SaleDataScreen";
import ShippingScreen from "../components/Ecommerce/Screen/ShippingScreen";
import UserListScreen from "../components/Ecommerce/Screen/UserListScreen";
import PlantIdentify from "../components/PlantIdentify/PlantIdentify";
import PlantDetails from "../components/PlantSearch/PlantDetails";
// Plant Search Page
import PlantSearch from "../components/PlantSearch/PlantSearch";
import '../styles/ecommerce.css';
// Landing Page
import LandingPage from './LandingPage';


function MainPage() {
  return (
    <Router>
        <Header />
      <main>
      <Route path="/" exact component={LandingPage} />
        <Container>
          {/* Ecommerce Routes */}
          <Route path="/market" exact component={HomeScreen}/>
          <Route path="/search/:keyword" component={HomeScreen} exact />
          <Route path="/search/:keyword/page/:pageNumber" component={HomeScreen} />
          <Route path="/page/:pageNumber?" component={HomeScreen} />
          <Route path="/login" component={LoginScreen} />
          <Route path="/register" component={RegisterScreen} />
          <Route path="/forget-password" component={ForgetPasswordScreen} />
          <Route path="/reset-password/:resetToken" component={PasswordResetScreen} />
          <Route path="/profile" component={ProfileScreen} />
          <Route path="/admin/userlist" component={UserListScreen} />
          <Route path="/admin/productlist" component={ProductListScreen} />
          <Route path="/admin/orderlist" component={OrderListScreen} />
          <Route path="/admin/orderData" component={OrderDataScreen} />
          <Route path="/admin/saleData" component={SaleDataScreen} />
          <Route path="/admin/product/:id/edit" component={ProductEditScreen} />
          <Route path="/product/:id" component={ProductScreen} />
          <Route path="/cart/:id?" component={CartScreen} />
          <Route path="/shipping" component={ShippingScreen} />
          <Route path="/placeorder" component={PlaceOrderScreen} />
          <Route path="/payment" component={PaymentScreen} />
        </Container>
        {/* Blog Routes */}
        <Route path="/blog" exact component={Blog} />
        <Route path="/newblog" component={NewBlog} />
        <Route path="/blog/:id" component={BlogDetails} />
        {/* Plant Search */}
        <Route path="/search-plant" exact component={PlantSearch} />
        <Route path="/search-plant/:id" exact component={PlantDetails} />
        {/* Plant Identify */}
        <Route path="/identify-plant" exact component={PlantIdentify} />

      </main>
        <Footer />
    </Router>
  )
}
export default MainPage;
