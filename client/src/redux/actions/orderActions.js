import axios from "axios";
import {
  ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_DATA_FAIL, ORDER_DATA_REQUEST, ORDER_DATA_SUCCESS, ORDER_LIST_FAIL, ORDER_LIST_REQUEST, ORDER_LIST_SUCCESS, ORDER_SALE_DATA_FAIL, ORDER_SALE_DATA_REQUEST, ORDER_SALE_DATA_SUCCESS
} from "../../constants/orderConstants";


export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_CREATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/orders`, order, config);

    dispatch({
      type: ORDER_CREATE_SUCCESS,
      payload: data,
    });
    /*   dispatch({
        type: CART_CLEAR_ITEMS,
        payload: data,
      }) */
    /*    localStorage.removeItem('cartItems') */
  } catch (error) {
    console.log(error);
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
    /* if (message === 'Not authorized, token failed') {
        dispatch(logout())
      }
      dispatch({
        type: ORDER_CREATE_FAIL,
        payload: message,
      }) */
  }
};


export const getOrderList = () => async (dispatch,getState) => {

    try {
        dispatch({
            type:ORDER_LIST_REQUEST
        })

        const { userLogin: { userInfo } } = getState()
        
        
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(`/api/orders`,config)

        dispatch({
            type: ORDER_LIST_SUCCESS,
            payload:data
        })
        
    } catch (error) {
        console.log(error);
        dispatch({
            type: ORDER_LIST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
            
        })
        
    }
    
}


export const getOrderData = () => async (dispatch,getState) => {

    try {
        dispatch({
            type:ORDER_DATA_REQUEST
        })

        const { userLogin: { userInfo } } = getState()
        
        
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

      const { data } = await axios.get(`/api/orders/order-data`, config)

        dispatch({
            type: ORDER_DATA_SUCCESS,
            payload:data
        })
        
    } catch (error) {
        console.log(error);
        dispatch({
            type: ORDER_DATA_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
            
        })
        
    }
    
}


export const getSaleData = () => async (dispatch,getState) => {

    try {
        dispatch({
            type:ORDER_SALE_DATA_REQUEST
        })

        const { userLogin: { userInfo } } = getState()
        
        
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

      const { data } = await axios.get(`/api/orders/saleDataByYear`, config)

        dispatch({
            type: ORDER_SALE_DATA_SUCCESS,
            payload:data
        })
        
    } catch (error) {
        console.log(error);
        dispatch({
            type: ORDER_SALE_DATA_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
            
        })
        
    }
    
}