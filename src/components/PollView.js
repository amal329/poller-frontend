import React from 'react'
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

export default function PollView(props) {

  const {id,title,options} = props;

  return (
    <div className='poll'>
        <div className='content'>
            <div className='title'><h3>{title}</h3></div>
            <div className='options'>
                {options.map(option => {
                    return (
                        <div className='option' key={option.id}>
                            <div className='left'><i className="bi bi-circle"></i></div>
                            <div className='right'><p>{option.name}</p></div>
                        </div>
                    );
                })}
            </div>
            <div className='controls'>
                    <Link to={`/poll/view/${id}`}>
                        <Button variant="contained" color="success" fullWidth={true} >Vote</Button>
                    </Link>
            </div>
        </div>
    </div>
  )
}
