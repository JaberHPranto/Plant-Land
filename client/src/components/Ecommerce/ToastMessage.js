import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

toast.configure()

export const toastSuccessMessage = (message) => {
    toast.success(message,{
        autoClose: 3000,
    })
}

export const toastInfoMessage = (message) => {
    toast.info(message,{
        autoClose: 4000,
    })
}

export const toastErrorMessage = (message) => {
    toast.error(message, {
        autoClose: 3000,
        position:'bottom-right'
    })
}