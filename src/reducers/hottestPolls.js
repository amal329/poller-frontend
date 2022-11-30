import { CLEAR_HOTTEST_POLLS, LOAD_HOTTEST_POLLS, SET_HOTTEST_POLLS } from "../actions/types";

const initialState = {
    hottestPolls : {
        currentPage : 0,
        totalPages : 0,
        isLoading : true,
        polls:  []
    }
}

export default function(state = initialState,action){
    switch(action.type){
        case LOAD_HOTTEST_POLLS : return {
            ...state,
            hottestPolls : {...state.hottestPolls,isLoading : true}
        }

        case SET_HOTTEST_POLLS : return {
            ...state,
            hottestPolls : {...action.payload,isLoading : false}
        }

        case CLEAR_HOTTEST_POLLS : return {
            ...state,
            hottestPolls : {...initialState.hottestPolls,isLoading : false}
        }

        default : return state
    }
}