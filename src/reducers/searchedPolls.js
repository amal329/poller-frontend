import { CLEAR_HOTTEST_POLLS, LOAD_SEARCHED_POLLS, SET_SEARCHED_POLLS } from "../actions/types";

const initialState = {
    searchedPolls : {
        currentPage : 0,
        totalPages : 0,
        isLoading : true,
        polls:  []
    }
}

export default function(state = initialState,action){
    switch(action.type){

        case LOAD_SEARCHED_POLLS : return {
            ...state,
            isLoading : true
        }

        case SET_SEARCHED_POLLS : return {
            ...state,
            searchedPolls : {...action.payload,isLoading : false}
        }

        case CLEAR_HOTTEST_POLLS : return {
            ...state,
            searchedPolls : {...initialState.searchedPolls,isLoading : false}
        }

        default : return state
    }
}