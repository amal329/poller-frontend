import { CLEAR_PROFILE_DATA, LOAD_USER_POLLS, SET_PROFILE_DATA } from "../actions/types";

const initialState = {
    profileData : {
        currentPage : 0,
        totalPages : 0,
        isLoading : true,
        polls:  []
    }
}

export default function(state = initialState,action){
    switch(action.type){
        case LOAD_USER_POLLS : return {
            ...state,
            isLoading : true
        }

        case SET_PROFILE_DATA : return {
            ...state,
            profileData : {...action.payload,isLoading : false}
        }

        case CLEAR_PROFILE_DATA : return {
            ...state,
            profileData : {...initialState.profileData,isLoading : false}
        }

        default : return state;
    }
}