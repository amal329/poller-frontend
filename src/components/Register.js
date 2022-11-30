import React, { useState } from "react";
import { TextField, Button, Box, Alert } from "@mui/material";
import { Stack } from "@mui/system";
import { buttonStyle } from "../styles/muistyles";

import authService from "../services/authService";
import { LOGIN_FAIL, REGISER_SUCCESS, REGISTER_FAIL} from "../actions/types";
import { connect } from "react-redux";
import { register } from "../actions/auth";
import { useNavigate } from "react-router-dom";

const Register = (props) => {

    const {dispatch} = props;

    const [values,setValues] = useState({
        username : '',
        email : '',
        password : '',
        errors : [false,false,false],
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
            type : 'email',
            name : 'email',
            label : 'Email',
            placeholder : 'Enter email',
            color : 'success',
            pattern : '(.+)@(.+){2,}\.(.+){2,}',
            required : true,
            error : false,
            errorText : 'Not a valid email address',
            helperText : ''
        },
        {
            id : 2,
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

        let errorFound = false;

        values.errors.forEach((error) => {
            if(error){
                setValues({...values,errorMessage : "Ugly data"});
                errorFound = true;
                return;
            }
        });

        if(errorFound)
            return;

        try{

            let username = values.username;
            let email = values.email;
            let password = values.password;

            let response = await authService.register(username,email,password);
    
            if(response && response.status===200){
                dispatch({
                    type : REGISER_SUCCESS
                });

                setValues({
                    username : '',
                    email : '',
                    password : '',
                    errors : [false,false,false],
                    errorMessage : ''
                });

                navigate('/home');
            }
            else{
                handleFailure(response);
                dispatch({
                    type : REGISTER_FAIL
                });
            }
        }
        catch(err){
            handleFailure(err);
            dispatch({
                type : REGISTER_FAIL
            });
        }
    }

    const handleFailure = (res) => {
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
                    <Button variant="contained" onClick={submitHandler} sx={buttonStyle}>Register</Button>
                    {values.errorMessage.length>0 && <Alert severity="error">{values.errorMessage}</Alert>}
                </Stack>
            </form>
        </div>
    );
}

export default connect()(Register);