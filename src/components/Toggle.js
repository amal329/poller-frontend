import { Stack } from '@mui/system'
import { Button, ButtonGroup } from '@mui/material'
import React from 'react'
import { useState } from 'react';
import LogIn from './LogIn';
import Register from './Register';

export default function Toggle() {

    const [option,setOption] = useState('signin');

    const selected = {
        boxShadow : 'none',
        backgroundColor : "green",
        "&:hover": {
          backgroundColor: 'green',
          boxShadow : 'none'
        },
      };

    const unselected = {
        boxShadow : 'none',
        backgroundColor : "white",
        border : '1px solid green',
        color : 'green',
        "&:hover": {
          color : 'white',
          backgroundColor: 'green',
          boxShadow : 'none'
        },
    }

    const formStyle = {
        border : '2px solid green',
        borderRadius : '7px',
        padding : '15px 20px',
        width : "fit-content"
    }

  return (
    <div className='toggle'>
        <Stack justifyContent="center" alignItems="center" sx={formStyle}>
            <ButtonGroup variant="outlined" aria-label="outlined button group">
                <Button variant="contained" sx={() => option==='signin' ? selected : unselected} onClick={() => setOption('signin')}>Sign In</Button>
                <Button variant="contained" sx={() => option==='register' ? selected : unselected}onClick={() => setOption('register')}>Register</Button>
            </ButtonGroup>
            <div>
                {option==='signin' ? <LogIn/> : <Register/>}
            </div>
        </Stack>
    </div>
  )
}
