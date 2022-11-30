import React, { useState } from 'react'
import { TextField } from '@mui/material';
import ListOfPolls from './ListOfPolls';

import withData from './withData';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { setSearchedPolls } from '../actions/data';
import withLoading from './withLoading';

function Search(props) {

  const {isLoggedIn} = props;
  const [term,setTerm] = useState('');
  const [searchTerm,setSearchTerm] = useState('');

  const datasource = (dispatch,username,pageNumber,term) => {
    dispatch(setSearchedPolls(term,pageNumber-1));
  }

  const handleKeyDown = (e) => {
    if(e.key === 'Enter'){
      setSearchTerm(term);
    }
  }

  const SearchedPolls = withData(withLoading(ListOfPolls),datasource);

  if(!isLoggedIn){
    return <Navigate replace to='/'/>
  }
  else return (
    <div>
        <div className='center green'>
            <div>
                <h2>Search Polls</h2>
            </div>
        </div>
        <div className='search center'>
            <TextField id="outlined-basic" fullWidth variant="outlined" color="success" placeholder='Search polls' value={term} onChange={(e) => setTerm(e.target.value)} onKeyDown={handleKeyDown}/>
        </div>
        <SearchedPolls datasource={datasource} slice="searchedPolls" term={searchTerm}/>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn : state.auth.isLoggedIn
  }
}

export default connect(mapStateToProps)(Search);