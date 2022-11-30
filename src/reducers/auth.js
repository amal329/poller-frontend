import { LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT, REGISER_SUCCESS, REGISTER_FAIL } from "../actions/types";

const token = localStorage.getItem('token');
const user = localStorage.getItem('user');

const initalState = token ? {
    user : user,
    isLoggedIn : true
} : {
    user : null,
    isLoggedIn : false
}

export default function(state = initalState,action){

    switch(action.type){
        case LOGIN_SUCCESS :
        return {
            ...state,
            isLoggedIn : true,
            user : action.payload.user
        }

        case LOGIN_FAIL : return {
            ...state,
            user : null,
            isLoggedIn : false
        }

        case LOGOUT : return {
            ...state,
            user : null,
            isLoggedIn : false
        }

        case REGISER_SUCCESS : return {
            ...state,
            user : null,
            isLoggedIn : false
        };

        case REGISTER_FAIL : return {
            ...state,
            user : null,
            isLoggedIn : false
        }
        default : 
            return state;
    }
}