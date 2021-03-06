import axios from "axios";
import {
    ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_DATA_FAIL, ORDER_DATA_REQUEST, ORDER_DATA_SUCCESS, ORDER_DELIVER_FAIL, ORDER_DELIVER_REQUEST, ORDER_DELIVER_SUCCESS, ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_LIST_FAIL, ORDER_LIST_REQUEST, ORDER_LIST_SUCCESS, ORDER_MY_LIST_FAIL, ORDER_MY_LIST_REQUEST, ORDER_MY_LIST_SUCCESS, ORDER_PAY_FAIL, ORDER_PAY_REQUEST, ORDER_PAY_SUCCESS, ORDER_SALE_DATA_FAIL, ORDER_SALE_DATA_REQUEST, ORDER_SALE_DATA_SUCCESS
} from "../../constants/orderConstants";

const baseUrl = 'https://plantland.herokuapp.com'

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

    const { data } = await axios.post(`${baseUrl}/api/orders`, order, config);

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

        const { data } = await axios.get(`${baseUrl}/api/orders`,config)

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

export const getMyOrders = () => async (dispatch,getState) => {

    try {
        dispatch({
            type:ORDER_MY_LIST_REQUEST
        })

        const { userLogin: { userInfo } } = getState()
        
        
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(`${baseUrl}/api/orders/my-orders`,config)

        dispatch({
            type: ORDER_MY_LIST_SUCCESS,
            payload:data
        })
        
    } catch (error) {
        console.log(error);
        dispatch({
            type: ORDER_MY_LIST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
            
        })
        
    }
    
}

export const getOrderDetails = (id) => async (dispatch,getState) => {

  try {
      
        dispatch({
            type:ORDER_DETAILS_REQUEST
        })

        const { userLogin: { userInfo } } = getState()
        
        
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
      
    }
    

        const { data } = await axios.get(`${baseUrl}/api/orders/${id}`,config)
        dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload:data
        })
        
    } catch (error) {
        console.log(error);
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
            
        })
        
    }
}

export const payOrder = (id,paymentResult) => async (dispatch,getState) => {

  try {
        dispatch({
            type:ORDER_PAY_REQUEST
        })

        const { userLogin: { userInfo } } = getState()
        
        
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
      
    }

        const { data } = await axios.put(`${baseUrl}/api/orders/${id}/pay`,paymentResult,config)

      console.log(data);
        dispatch({
            type: ORDER_PAY_SUCCESS,
            payload:data
        })
        
    } catch (error) {
        console.log(error);
        dispatch({
            type: ORDER_PAY_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
            
        })
        
    }
    
}

export const deliverOrder = (order) => async (dispatch,getState) => {

  try {
        dispatch({
          type: ORDER_DELIVER_REQUEST
        })

        const { userLogin: { userInfo } } = getState()
        
        
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
      
    }

        const { data } = await axios.put(`${baseUrl}/api/orders/${order._id}/deliver`,{},config)

      console.log(data);
        dispatch({
            type: ORDER_DELIVER_SUCCESS,
            payload:data
        })
        
    } catch (error) {
        console.log(error);
        dispatch({
            type: ORDER_DELIVER_FAIL,
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

      const { data } = await axios.get(`${baseUrl}/api/orders/order-data`, config)

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

      const { data } = await axios.get(`${baseUrl}/api/orders/saleDataByYear`, config)

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