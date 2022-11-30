import React, { useState } from 'react';
import { Button,TextField, IconButton, Alert } from '@mui/material';
import NewOption from './NewOption';
import dataService from '../services/dataService';
import { Navigate, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { buttonStyle } from '../styles/muistyles';

function CreatePoll({isLoggedIn}) {

  const [values,setValues] = useState({
    title : '',
    description : '',
    options : [],
    errors : [false,false],
    optionErrors : [],
    errorMessage : ''
  });

  const navigate = useNavigate(); 

  const inputs = [
    {
        id : 0,
        type : 'text',
        name : 'title',
        label : 'Title',
        fullWidth : true,
        placeholder : 'Enter poll title',
        variant : 'outlined',
        color : 'success',
        pattern : "^.{3,50}$",
        required : true,
        error : false,
        errorText : 'Title must be between 3 and 50 characters.',
        helperText : ''
    },
    {
      id : 1,
      type : 'text',
      multiline : true,
      name : 'description',
      label : 'Description',
      fullWidth : true,
      placeholder : 'Enter poll description',
      variant : 'outlined',
      color : 'success',
      pattern : "^.{3,50}$",
      required : true,
      error : false,
      errorText : 'Title must be between 3 and 80 characters.',
      helperText : ''
    },
  ];

  const updateTitle = (e) => {
    setValues({...values,title : e.target.value});
  }

  const updateDescription = (e) => {
    setValues({...values,description : e.target.value});
  }

  const createPoll = async (e) => {

    e.preventDefault();

    let errorFound = false;

    values.errors.forEach((error) => {
        if(error){
          setValues({...values,errorMessage : "Ugly data"});
          errorFound = true;
          return;
        }
    });

    values.optionErrors.forEach((error) => {
      if(error){
        setValues({...values,errorMessage : "Ugly data"});
        errorFound = true;
        return;
      }
    });

    if(errorFound)
        return;

    if(values.options.length<=1){
      setValues({...values,errorMessage : "The poll must have atleast 2 options"});
      return;
    }

    let title = values.title;
    let description = values.description;
    let options = values.options;

    const poll = {
      title : title.toString().trim(),
      content : description.toString().trim(),
      options
    }

    let response = await dataService.savePoll(poll);

    if(response && response.status === 201){
      console.log("Poll created successfully!");
      clearForm();
      //Redirect to the poll page
      //response.data.id contains the id of the created poll
      navigate(`/poll/view/${response.data.id}`);
    }
  }

  const addOption = () => {
    if(values.options.length<7){
        let newOptions = [...values.options,{name : ''}];
        let newOptionErrors = [...values.optionErrors,false];
        setValues({...values,options : newOptions, optionErrors : newOptionErrors});

        if(values.errorMessage.length>0){
          setValues({...values,errorMessage : ''});
        }
    }
  }

  const updateOption = (i,name) => {
    let newOptions = [...values.options];
    newOptions[i] = {name : name};
    setValues({...values,options : newOptions});
  }

  const deleteOption = (i) => {
    let newOptions = [...values.options];
    let newOptionErrors = [...values.optionErrors];
    newOptions.splice(i,1);
    newOptionErrors.splice(i,1);
    setValues({...values,options : newOptions, optionErrors : newOptionErrors});
  }

  const setOptionError = (i,value) => {
    let newOptionErrors = [...values.optionErrors];
    newOptionErrors[i] = value;
    setValues({...values,optionErrors : newOptionErrors});
  }

  const clearForm = () => {
    setValues({
      title : '',
      description : '',
      options : [],
      errors : [false,false],
      optionErrors : [],
      errorMessage : ''
    });
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

  if(!isLoggedIn){
    return <Navigate replace to="/home"/>;
  }
  else return (
    <div className='center'>
      <div className='poll'>
              <div className='content'>
                  <form>
                    <div className='heading'>
                        <h1>Create Poll</h1>
                    </div>
                    {inputs.map((input) => {
                        let isError = values.errors[input.id];
                        return (
                          <div className={input.name}>
                            <TextField id={input.id} {...input} value={values[input.name]} onChange={handleChange} onBlur={(e) => validate(e,input)} inputProps={{pattern : input.pattern}} error={isError} helperText={isError ? input.errorText : ''}/>
                          </div>
                        );
                    })}
                    <div>
                        <h3>Add Options</h3>
                    </div>
                    <div className='options'>
                        {values.options.map((option,ind) =>
                            <NewOption id={ind} name={option.name} updateOption={updateOption} deleteOption={deleteOption} setOptionError={setOptionError} error={values.optionErrors[ind]}/>
                        )}
                    </div>
                    <div className='add'>
                        <IconButton aria-label="delete" size="large" onClick={addOption}>
                            <i class="bi bi-plus-circle"></i>
                        </IconButton>
                    </div>
                    <div className='controls'>
                        <Button variant="contained" sx={buttonStyle} fullWidth={true} onClick={createPoll}>Create Poll</Button>
                        {values.errorMessage.length>0 && <Alert severity="error">{values.errorMessage}</Alert>}
                    </div>
                  </form>
              </div>
          </div>
        </div>
  )
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn : state.auth.isLoggedIn
  }
}

export default connect(mapStateToProps)(CreatePoll);
