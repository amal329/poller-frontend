import React from 'react'
import ListOfPolls from './ListOfPolls';
import { Button } from '@mui/material';

import { connect } from 'react-redux';
import { Navigate, useParams } from 'react-router-dom';
import { setProfileData } from '../actions/data';
import withData from './withData';
import dataService from '../services/dataService';
import { logout } from '../actions/auth';
import withLoading from './withLoading';

function Profile(props) {

  const {isLoggedIn, user, dispatch} = props;
  const {username} = useParams();

  const myProfile = user===username; 

  const deleteUser = async () => {
    let response = await dataService.deleteUser();

    if(response && response.status === 200){
      dispatch(logout());
    }
  }

  const datasource = (dispatch,username,pageNumber) => {
    dispatch(setProfileData(username,pageNumber-1));
  }

  const PollsWithProfileData = withData(withLoading(ListOfPolls),datasource);

  const buttonStyle = {
    backgroundColor : 'white',
    color : '#D2001A',
    fontSize : '1em'
  };

  if(!isLoggedIn){
    return <Navigate replace to='/'/>
  }
  else return (
    <div>
        <div className='center green'>
          <h2>{myProfile ? 'My polls' : `${username}'s polls`}</h2>
        </div>
        <PollsWithProfileData datasource={datasource} user={username} slice="profileData"/>
        {myProfile && <div className='banner red'>
            <div>
                <h3>Want to delete your account and all its data?</h3>
            </div>
            <div className='button'>
                <Button style={buttonStyle} onClick={deleteUser}>Delete</Button>
            </div>
        </div>}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn : state.auth.isLoggedIn,
    user : state.auth.user
  }
}

export default connect(mapStateToProps)(Profile);
