import dataService from "../services/dataService";
import { CLEAR_HOTTEST_POLLS, CLEAR_POLL_DATA, CLEAR_PROFILE_DATA, CLEAR_SEARCHED_POLLS, CREATE_POLL, GET_POLL_DATA, LOAD_HOTTEST_POLLS, LOAD_POLL_DATA, LOAD_SEARCHED_POLLS, LOAD_USER_POLLS, SET_HOTTEST_POLLS, SET_PROFILE_DATA, SET_SEARCHED_POLLS } from "./types";

export const setProfileData = (username,page) => async (dispatch) => {
    try{

        dispatch({
            type : LOAD_USER_POLLS
        });

        let response = await dataService.getProfilePolls(username,page);

        if(response && response.status===200 && response.data){
            dispatch({
                type : SET_PROFILE_DATA,
                payload : response.data
            });
        }
        else{
            dispatch({
                type : CLEAR_PROFILE_DATA,
                payload : {}
            });
        }
    }
    catch(err){
        console.log(err);
        dispatch({
            type : CLEAR_PROFILE_DATA,
            payload : {}
        });
    }
}

export const setHottestPolls = (page) => async (dispatch) => {
    try{

        dispatch({
            type : LOAD_HOTTEST_POLLS
        });

        let response = await dataService.getHottestPolls(page);

        if(response && response.status===200 && response.data){
            dispatch({
                type : SET_HOTTEST_POLLS,
                payload : response.data
            });
        }
        else{
            dispatch({
                type : CLEAR_HOTTEST_POLLS,
                payload : {}
            });
        }
    }
    catch(err){
        console.log(err);
        dispatch({
            type : CLEAR_HOTTEST_POLLS,
            payload : {}
        });
    }
}

export const setSearchedPolls = (term,page) => async (dispatch) => {
    try{

        dispatch({
            type : LOAD_SEARCHED_POLLS
        });

        let response = await dataService.getSearchedPolls(term,page);

        if(response && response.status===200 && response.data){
            dispatch({
                type : SET_SEARCHED_POLLS,
                payload : response.data
            });
        }
        else{
            dispatch({
                type : CLEAR_SEARCHED_POLLS,
                payload : {}
            });
        }
    }
    catch(err){
        console.log(err);
        dispatch({
            type : CLEAR_SEARCHED_POLLS,
            payload : {}
        });
    }
}

export const getPollData = (id) => async (dispatch) => {
    try{

        dispatch({
            type : LOAD_POLL_DATA
        });

        let response = await dataService.getPollData(id);

        if(response && response.status===200 && response.data){
            dispatch({
                type : GET_POLL_DATA,
                payload : response.data
            });
        }
        else{
            dispatch({
                type : CLEAR_POLL_DATA,
                payload : {}
            });
        }
    }
    catch(err){
        console.log(err);
        dispatch({
            type : CLEAR_POLL_DATA,
            payload : {}
        });
    }
}