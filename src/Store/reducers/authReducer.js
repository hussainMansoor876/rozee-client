import * as actionTypes from '../actions/Types'

const initialAuthState = {
    isLoading: false, 
    isError: false, 
    isLoggedIn: false, 
    currentUser: null, 

}

export const authReducer = (state = initialAuthState, action) => {
    switch(action.type){
        case actionTypes.USER_LOGIN:
            return {
                ...state, 
                isLoading: true,
                isError: false, 
                isLoggedIn: false, 
                currentUser: null, 
            }

        default:
            return state
    }
}