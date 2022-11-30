import React from 'react'
import ListOfPolls from './ListOfPolls'
import { Button } from '@mui/material'
import withData from './withData'
import withLoading from './withLoading'
import { Link, Navigate } from 'react-router-dom'

import { connect } from 'react-redux';
import { setHottestPolls } from '../actions/data';

function Home(props) {

  const {isLoggedIn} = props;

  const buttonStyle = {
    backgroundColor : '#FDFDBD',
    color : 'black',
    fontSize : '1em'
  }

  const datasource = (dispatch,username,pageNumber) => {
    dispatch(setHottestPolls(pageNumber-1));
  }

  const HottestPolls = withData(withLoading(ListOfPolls));

  if(!isLoggedIn){
    return <Navigate replace to='/'/>
  }
  else return (
    <div>
        <div className='banner purple'>
            <div>
                <h3>Create a poll now and get your questions answered!</h3>
            </div>
            <div className='button'>
              <Link to="/poll/new">
                <Button style={buttonStyle}>Create a Poll now!</Button>
              </Link>
            </div>
        </div>
        <div className='center'>
            <h4>Here are the hottest polls on Poller today!</h4>
        </div>
        <HottestPolls datasource={datasource} slice="hottestPolls"/>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn : state.auth.isLoggedIn
  }
}

export default connect(mapStateToProps)(Home);