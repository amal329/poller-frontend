import React, { useState } from "react";
import { TextField, Button, Alert } from "@mui/material";
import { Stack } from "@mui/system";
import { buttonStyle } from "../styles/muistyles";

import authService from "../services/authService";
import {connect} from 'react-redux';
import { useNavigate } from "react-router-dom";
import { LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT} from "../actions/types";

const LogIn = (props) => {

    const {dispatch} = props;

    const [values,setValues] = useState({
        username : '',
        password : '',
        errors : [false,false],
        errorMessage : ''
    });

    const navigate = useNavigate();

    const inputs = [
        {
            id : 0,
            type : 'text',
            name : 'username',
            label : 'Username',
            placeholder : 'Enter username',
            variant : 'outlined',
            color : 'success',
            pattern : "^[A-Za-z0-9]{4,8}$",
            required : true,
            error : false,
            errorText : 'Username must be between 4 and 8 characters and inlcude only alphanumerc characters',
            helperText : ''
        },
        {
            id : 1,
            type : 'password',
            name : 'password',
            label : 'Password',
            placeholder : 'Enter password',
            color : 'success',
            pattern : '^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{5,15}$',
            required : true,
            error : false,
            errorText : 'Password must be between 5 and 15 characters and inlcude atleast one digit and special character',
            helperText : ''
        }
    ]

    const submitHandler = async (e) => {
        e.preventDefault();

        try{

            let errorFound = false;

            values.errors.forEach((error) => {
                if(error){
                    
                    console.log("OOPS error");
                    setValues({...values,errorMessage : "Ugly data"});
                    errorFound = true;
                    return;
                }
            });

            if(errorFound)
                return;

            let username = values.username;
            let password = values.password;
            
            let response = await authService.login(username,password);
    
            if(response && response.status===200 && response.data && response.data.jwt){
                dispatch({
                    type : LOGIN_SUCCESS,
                    payload : {
                        user : response.data.username
                    }
                });

                setValues({
                    username : '',
                    password : '',
                    errors : [false,false],
                    errorMessage : ''
                });
            }
            else{
                handleLoginFailure(response);
                dispatch({
                    type : LOGIN_FAIL
                });
            }
        }
        catch(err){
            handleLoginFailure(err);
            dispatch({
                type : LOGIN_FAIL
            });
        };
    }

    const handleLoginFailure = (res) => {
        let msg = 'Please try again';

        if(res && res.response && res.response.data && res.response.data.message.length>0){
            msg = res.response.data.message;
        }

        setValues({...values,errorMessage : msg});
    }

    const handleChange = (e) => {
        setValues({...values,[e.target.name] : e.target.value});
    }

    const validate = (e,input) => {
        if(!e.target.value.match(input.pattern)){
            let newErrors = [...values.errors];
            newErrors[input.id] = true;
            setValues({...values,errors : newErrors});
        }
        else{
            let newErrors = [...values.errors];
            newErrors[input.id] = false;
            setValues({...values,errors : newErrors});
        }
    }

    return (
        <div className="form">
            <form>
                <Stack spacing={3} m={[3,4]}>
                    {inputs.map((input) => {
                        let isError = values.errors[input.id];
                        return <TextField id={input.id} {...input} value={values[input.name]} onChange={handleChange} onBlur={(e) => validate(e,input)} inputProps={{pattern : input.pattern}} error={isError} helperText={isError ? input.errorText : ''}/>
                    })}
                    <Button variant="contained" onClick={submitHandler} sx={buttonStyle}>Log In</Button>
                    {values.errorMessage.length>0 && <Alert severity="error">{values.errorMessage}</Alert>}
                </Stack>
            </form>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn : state.auth.isLoggedIn
    }
}

export default connect(mapStateToProps)(LogIn);