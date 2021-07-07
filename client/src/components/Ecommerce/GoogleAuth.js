import React from 'react'
import { Button } from 'react-bootstrap'
import { GoogleLogin } from 'react-google-login'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { googleLogin } from '../../redux/actions/userActions'

function GoogleAuth() {
    
    const dispatch = useDispatch()
    const history = useHistory()

    const googleSuccess = async (res) => {
    // console.log(res);
    const user = res?.profileObj;
    const token = res?.tokenId
    
    try {
        const data = { user, token }
        dispatch(googleLogin(data))
        history.push("/")
    } catch (error) {
        console.log(error);
    }
  
    }
    const googleFailure = () => {
        console.log("Google Sign in was unsuccessful. Try again later");
    }
    return (
        <div>
            <GoogleLogin
                clientId="194822757324-85cbm8js64av331n4ouf1aqr4ot4veju.apps.googleusercontent.com"
                render={(renderProps) => (
                    <Button color="primary"
                        onClick={renderProps.onClick} disabled={renderProps.disabled}
                    >
                        Google Sign in
                    </Button>
                )}
                onSuccess={googleSuccess}
                onFailure={googleFailure}
                cookiePolicy="single_host_origin"
            />            
        </div>
    )
}

export default GoogleAuth
