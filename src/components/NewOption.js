import React, { useState } from 'react'
import { TextField,IconButton } from '@mui/material';

export default function NewOption(props) {
  
  const id = props.id;
  const name = props.name;
  const updateOption = props.updateOption;
  const deleteOption = props.deleteOption;
  const setOptionError = props.setOptionError;
  const error = props.error;
  const pattern = '^.{1,25}$';

  const handleChange = (e) => {
    updateOption(id,e.target.value);
  }

  const validate = () => {
    if(name.match(pattern)){
      setOptionError(id,false);
    }
    else{
      setOptionError(id,true);
    }
  }

  return (
    <div className='option' key={name}>
        <div className='flexrow'>
            <div className='input'>
                <TextField id="outlined-basic" variant="outlined" color="success" autoFocus fullWidth value={name} onChange={handleChange} onBlur={validate} error={error} helperText={error ? 'Options must be between 1 and 25 characters' : ''}/>
            </div>
            <div className='button'>
                <IconButton aria-label="delete" size="large" onClick={() => deleteOption(id)}>
                    <i class="bi bi-trash-fill"></i>
                </IconButton>   
            </div>
        </div>
    </div>
  )
}
