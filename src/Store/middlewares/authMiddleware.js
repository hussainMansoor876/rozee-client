import * as AuthActions from '../actions/authActions'
import axios from 'axios'
import Path from '../../Config/Path'
import shajs from 'sha.js'

export const loginMiddleware = data => {
    return dispatch => {
        dispatch(AuthActions.userLogin())
        axios.post(Path.USER_LOGIN, {
            email: data.email,
            password: shajs('sha256').update(data.password).digest('hex').toUpperCase()
        }).then(response => {
            console.log("RESPONSE", response.data)

            if (!response.data.success) {
                return dispatch(AuthActions.userLoginFail({ success: false, message: response.data.message }))
            }
            dispatch(AuthActions.userLoginSuccess({ success: true, message: response.data.message, currentUser: response.data.data }))


        }).catch(err => {
            dispatch(AuthActions.userLoginFail({ success: false, message: "Something went wrong please try again" }))
        })

    }
}