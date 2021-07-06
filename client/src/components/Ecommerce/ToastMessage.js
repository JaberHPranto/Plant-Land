import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

toast.configure()

export const toastSuccessMessage = (message) => {
    toast.success(message)
}

export const toastWarningMessage = (message) => {
    toast.warn(message)
}

export const toastErrorMessage = (message) => {
    toast.error(message, {
        autoClose: 3000,
        position:'bottom-right'
    })
}