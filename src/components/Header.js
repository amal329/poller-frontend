import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo.png';

import { connect } from 'react-redux';
import { logout } from '../actions/auth';

const Header = (props) => {

    const {dispatch,isLoggedIn,user} = props;

    const handleLogOut = () => {
        dispatch(logout());
    }

    return (
        <header>
            <div className='left'>
                <div className='logo'>
                    <Link to={isLoggedIn ? '/home' : '/'}>
                        <img src={logo} alt='logo'/>
                    </Link>
                </div>
            </div>
            <div className='right'>
                <div className='item'>
                    <Link to={isLoggedIn ? '/home' : '/'}>Home</Link>
                </div>
                {isLoggedIn && <div className='item'>
                    <Link to='/search'>Search</Link>
                </div>}
                {isLoggedIn && <div className='item'>
                    <Link to={`/profile/${user}`}>Profile</Link>
                </div>}
                <div className='item'>
                    <Link to='/about'>About</Link>
                </div>
                {isLoggedIn && <div className='item'>
                    <a onClick={handleLogOut}>Log Out</a>
                </div>}
            </div>
        </header>
    );
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn : state.auth.isLoggedIn,
        user : state.auth.user
    }
}

export default connect(mapStateToProps)(Header);