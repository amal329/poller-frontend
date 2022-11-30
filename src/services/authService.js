import axios from 'axios';

const BASE_URL = 'http://ec2-3-239-192-225.compute-1.amazonaws.com:8080/';

const login = async (username,password) => {
    let response = await axios.post(BASE_URL+'auth/authenticate',{username,password});

    console.log(response);

    if(response && response.status===200 && response.data && response.data.jwt){
        localStorage.setItem('token',response.data.jwt);
        localStorage.setItem('user',response.data.username);
    }

    return response;
}

const register = async (username,email,password) => {
    let response = await axios.post(BASE_URL+'user/register',{username,email,password});
    return response;
}

const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
}

export default {
    login,
    logout,
    register
}