import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_RESET } from '../../constants/cartConstants';

export const cartReducer = (state = { cartItems: [] }, action) => {
    switch (action.type) {
        case CART_ADD_ITEM:
            const item = action.payload

            const isItemExist = state.cartItems.find(p => p.productId === item.productId)
            if (isItemExist) {
                return {
                    ...state,
                    cartItems: state.cartItems.map(p => p.productId === item.productId ? item : p)
                }
                
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item]
                    
                }
            }
        case CART_REMOVE_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter(p=>p.productId !== action.payload)
            }
        
        case CART_RESET:
            return {
                ...state,
                cartItems:[]
            }
            
        default:
            return state
    }
    
}

