import axios from "axios"
import { BLOG_DETAILS_REQUEST, BLOG_DETAILS_SUCCESS, BLOG_FETCH_FAIL, BLOG_FETCH_REQUEST, BLOG_FETCH_SUCCESS } from "../../constants/blogConstant"
import { PRODUCT_DETAILS_FAIL } from "../../constants/productConstants"

const baseUrl = 'https://plantland.herokuapp.com'
// @ GET blogs
export const fetchBlogs = () => async (dispatch) => {
    try {
        dispatch({ type:BLOG_FETCH_REQUEST})

        const { data } = await axios.get(`${baseUrl}/api/blogs`)

        dispatch({
            type: BLOG_FETCH_SUCCESS,
            payload: data
        })
        
    } catch (error) {
        console.log(error);
        dispatch({
            type: BLOG_FETCH_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

// Get a blog by id
export const fetchBlogById = (id) => async (dispatch) => {
    try {
        dispatch({ type: BLOG_DETAILS_REQUEST })

        const { data } = await axios.get(`${baseUrl}/api/blogs/${id}`)
        dispatch({
            type: BLOG_DETAILS_SUCCESS,
            payload: data
        })
        
    } catch (error) {
        console.log(error);
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }

}

// Create blog
export const createBlog = (blogData) => async (dispatch,getState) => {

    try {
        // dispatch({
        //     type:BLOG_CREATE_REQUEST
        // })

        const { userLogin: { userInfo } } = getState()
        
        
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.post(`${baseUrl}/api/blogs`,blogData,config)

        console.log(data);
        // dispatch({
        //     type: BLOG_CREATE_SUCCESS,
        //     payload:data
        // })
        
    } catch (error) {
        console.log(error);
        // dispatch({
        //     type: PRODUCT_CREATE_FAIL,
        //     payload: error.response && error.response.data.message ? error.response.data.message : error.message
            
        // })
        
    }
    
}