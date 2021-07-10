import axios from 'axios'
import { USER_DETAILS_FAIL, USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, USER_LIST_FAIL, USER_LIST_REQUEST, USER_LIST_SUCCESS, USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT, USER_PROFILE_UPDATE_FAIL, USER_PROFILE_UPDATE_REQUEST, USER_PROFILE_UPDATE_SUCCESS, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS } from '../../constants/userConstants'

export const login = (email,password) => async (dispatch) => {

    try {
        dispatch({
            type:USER_LOGIN_REQUEST
        })
        
        const config = {
            headers: {
                'Content-Type':'application/json'
            }
        }

        const { data } = await axios.post('/api/users/login',
            {email, password },config)

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload:data
        })

        localStorage.setItem('userInfo',JSON.stringify(data))
        
    } catch (error) {
        console.log(error);
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
            
        })
        
    }
    
}

export const googleLogin = (data) => async (dispatch) => {
    try {
        dispatch({
            type:USER_LOGIN_REQUEST
        })

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload:data
        })

        localStorage.setItem('userInfo',JSON.stringify(data))
        
    } catch (error) {
        console.log(error);
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
            
        })
    }
}


export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo')
    dispatch({
        type:USER_LOGOUT
    })
}


export const register = (name,email,password,confirmPassword) => async (dispatch) => {

    try {
        dispatch({
            type:USER_REGISTER_REQUEST
        })
        
        const config = {
            headers: {
                'Content-Type':'application/json'
            }
        }

        const { data } = await axios.post('/api/users/register',
            {name,email,password,confirmPassword},config)

        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload:data
        })
        
    } catch (error) {
        console.log(error);
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
            
        })
        
    }
    
}


export const getUserDetails = (id) => async (dispatch,getState) => {

    try {
        dispatch({
            type:USER_DETAILS_REQUEST
        })

        const { userLogin: { userInfo } } = getState()
        
        
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(`api/users/${id}`, config)

        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload:data
        })
        
    } catch (error) {
        console.log(error);
        dispatch({
            type: USER_DETAILS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
            
        })
        
    }
    
}


export const updateUserProfile = (user) => async (dispatch,getState) => {

    try {
        dispatch({
            type:USER_PROFILE_UPDATE_REQUEST
        })

        const { userLogin: { userInfo } } = getState()
        
        
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.put(`api/users/profile`,user, config)
        
        console.log(data);

        dispatch({
            type: USER_PROFILE_UPDATE_SUCCESS,
            payload:data
        })
        
    } catch (error) {
        console.log(error);
        dispatch({
            type: USER_PROFILE_UPDATE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
            
        })
        
    }
    
}

export const getUserList = () => async (dispatch,getState) => {

    try {
        dispatch({
            type:USER_LIST_REQUEST
        })

        const { userLogin: { userInfo } } = getState()
        
        
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(`/api/users`,config)

        dispatch({
            type: USER_LIST_SUCCESS,
            payload:data
        })
        
    } catch (error) {
        console.log(error);
        dispatch({
            type: USER_LIST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
            
        })
        
    }
    
}