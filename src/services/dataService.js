import axios from 'axios';
import addHeader from './addHeader';

const BASE_URL = 'http://ec2-3-239-192-225.compute-1.amazonaws.com:8080/';

const getProfilePolls = async (username,page) => {
    let response = await axios.get(BASE_URL+`poll/createdBy?username=${username}&page=${page}`,{
        headers : addHeader()
    });

    return response;
}

const getHottestPolls = async (page) => {
    let response = await axios.get(BASE_URL+`poll?page=${page}`,{
        headers : addHeader()
    });

    return response;
}

const getSearchedPolls = async (term,page) => {
    let response = await axios.get(BASE_URL+`poll/title?title=${term}&page=${page}`,{
        headers : addHeader()
    });

    return response;
}

const savePoll = async (poll) => {
    let response = await axios.post(BASE_URL+'poll',poll,{
        headers : addHeader()
    });

    console.log(response);
    return response;
}

const getPollData = async (id) => {
    let response = await axios.get(BASE_URL+`poll/result/${id}`,{
        headers : addHeader()
    });

    return response;
}

const vote = async (option) => {
    let response = await axios.post(BASE_URL+`vote/${option}`,null,{
        headers : addHeader()
    });

    return response;
}

const deletePoll = async (id) => {
    let response = await axios.delete(BASE_URL+`poll/${id}`,{
        headers : addHeader()
    });

    return response;
}

const deleteUser = async () => {
    let response = await axios.delete(BASE_URL+'user',{
        headers : addHeader()
    });

    return response;
}

export default {
    getProfilePolls,
    getHottestPolls,
    getSearchedPolls,
    savePoll,
    getPollData,
    vote,
    deletePoll,
    deleteUser
}