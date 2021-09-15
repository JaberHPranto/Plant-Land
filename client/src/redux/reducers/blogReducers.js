import { BLOG_FETCH_FAIL, BLOG_FETCH_REQUEST, BLOG_FETCH_SUCCESS } from "../../constants/blogConstant"

export const blogListReducer = ( blogs=[], action) => {
    switch (action.type) {
        case BLOG_FETCH_REQUEST:
            return { loading: true, blogs: [] }
        
        case BLOG_FETCH_SUCCESS:
            return { loading: false, blogs: action.payload}
        
        case BLOG_FETCH_FAIL:
            return { loading: false, error: action.payload }
        
        default:
            return blogs
    }
}