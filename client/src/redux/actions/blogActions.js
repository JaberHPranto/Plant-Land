import axios from "axios"
import { BLOG_FETCH_FAIL, BLOG_FETCH_REQUEST, BLOG_FETCH_SUCCESS } from "../../constants/blogConstant"
// @ GET blogs
export const fetchBlogs = () => async (dispatch) => {
    try {
        dispatch({ type:BLOG_FETCH_REQUEST})

        const { data } = await axios.get(`/api/blogs`)

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