import React, { useEffect } from 'react'
import Carousel from './Carousel'
import Toggle from './Toggle'

import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';


function Welcome(props) {
  const {isLoggedIn} = props;

  if(isLoggedIn){
    return <Navigate replace to='/home'/>;
  }
  else return (
    <>
        <div className='banner purple welcomebanner'>
            <h2></h2>
        </div>
        <div className='center welcome'>
            <div className='left'>
                <Carousel/>
            </div>
            <div className='right'>
                <Toggle/>
            </div>
        </div>
    </>
  )
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn : state.auth.isLoggedIn
    }
}

export default connect(mapStateToProps)(Welcome);