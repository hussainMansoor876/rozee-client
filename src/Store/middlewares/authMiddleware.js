// import { add_user } from "../actions/add_user";
// import { userLogin, userLoginFail, userLoginSuccess } from '../actions/authActions'
import * as AuthActions from '../actions/authActions'
import axios from 'axios'
import Path from '../../Config/Path'
import { SHA256 } from 'crypto-js'

// export const AsyncAddUser = (data) => {
//   return dispatch => {
//     // Do Async Work
//     axios.get('https://express-heroku-dev.herokuapp.com/users').then(res => {
//       dispatch(add_user(res.data.data))
//     }).catch(err => {
//       console.log(err.message)
//     })
//   }
// }


export const loginMiddleware = data => {
    return dispatch => {
        dispatch(AuthActions.userLogin())
        console.log("Middleware data", data)
        axios.post(Path.USER_LOGIN, {
            email: data.email,
            password: SHA256(data.password)
        }).then(response => {
            console.log(response)
        }).catch(err => console.log(err))

    }
}