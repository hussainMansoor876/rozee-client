import { add_user } from "../actions/add_user";
import axios from 'axios'

export const AsyncAddUser = (data) => {
  return dispatch => {
    // Do Async Work
    axios.get('https://express-heroku-dev.herokuapp.com/users').then(res => {
      dispatch(add_user(res.data.data))
    }).catch(err => {
      console.log(err.message)
    })
  }
}