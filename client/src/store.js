import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { blogDetailsReducer, blogListReducer } from "./redux/reducers/blogReducers";
import { cartReducer } from "./redux/reducers/cartReducers";
import {
  orderCreateReducer, orderDataReducer, orderListReducer, orderSaleDataReducer
} from "./redux/reducers/orderReducers";
import {
  productCreateReducer, productCreateReviewReducer, productDeleteReducer, productDetailsReducer,
  productListReducer, productUpdateReducer
} from "./redux/reducers/productReducers";
import {
  userDeleteReducer, userDetailsReducer, userListReducer, userLoginReducer,
  userProfileUpdateReducer,
  userRegisterReducer
} from "./redux/reducers/userReducers";


const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  productCreateReview: productCreateReviewReducer,
  productDelete: productDeleteReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userProfileUpdate: userProfileUpdateReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  cart: cartReducer,
  orderCreate: orderCreateReducer,
  orderList: orderListReducer,
  orderData: orderDataReducer,
  orderSaleData: orderSaleDataReducer,
  blogList: blogListReducer,
  blogDetails: blogDetailsReducer
});

const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;
const shippingAddressFromStorage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : {};

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
  },
  userLogin: { userInfo: userInfoFromStorage },
};

const middlewares = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middlewares))
);

export default store;
