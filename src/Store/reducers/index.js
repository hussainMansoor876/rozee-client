import { combineReducers } from 'redux'
// import {dummy_reducer} from './dummy_reducer'
import { authReducer } from './authReducer'

export const rootReducer = combineReducers({
    auth: authReducer
})