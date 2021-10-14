import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getOrderData } from '../../../redux/actions/orderActions'

function OrderDataScreen({history}) {

    const dispatch = useDispatch()
    const { userInfo: { user } } = useSelector(state => state.userLogin)

    const order = useSelector(state => state.orderData)
    const { loading, error, orderData } = order

    if(orderData) console.log(orderData)

    useEffect(() => {
        if (user && user.isAdmin) {
            dispatch(getOrderData())
        } else {
            history.push("/login")
        }
    }, [dispatch,history,user])

    return (
        <div>
            hello
        </div>
    )
}

export default OrderDataScreen
