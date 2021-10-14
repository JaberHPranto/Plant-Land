import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getSaleData } from '../../../redux/actions/orderActions'

function SaleDataScreen({history}) {

    const dispatch = useDispatch()
    const { userInfo: { user } } = useSelector(state => state.userLogin)

    const order = useSelector(state => state.orderSaleData)
    const { loading, error, orderSaleData } = order

    if(orderSaleData) console.log(orderSaleData)

    useEffect(() => {
        if (user && user.isAdmin) {
            dispatch(getSaleData())
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

export default SaleDataScreen
