import { CLEAR_POLL_DATA, GET_POLL_DATA, LOAD_POLL_DATA } from "../actions/types";

const initialState = {
    pollDetails : {
        "id": 0,
        isLoading : true,
        title: "",
        content: "",
        createdAt: "",
        createdBy: {
            id: 0,
            username: ""
        },
        totalVotes: 0,
        userHasVoted: false,
        options: []
    }
}

export default function(state = initialState,action){
    switch(action.type){
        case LOAD_POLL_DATA : return {
            ...state,
            pollDetails : {...state.pollDetails,isLoading : true}
        }
        case GET_POLL_DATA : return {
            ...state,
            pollDetails : {...action.payload,isLoading : false}
        }

        case CLEAR_POLL_DATA : return {
            ...state,
            pollDetails : {...initialState.pollDetails,isLoading : false}
        }

        default : return state
    }
}