import React, { Component } from 'react';
import { Button, CircularProgress } from '@mui/material';
import Option from './Option';
import { Navigate, useNavigate, useParams } from 'react-router-dom';

import { connect } from 'react-redux';
import { getPollData } from '../actions/data';
import dataService from '../services/dataService';

function withParams(Component){
    return props => <Component {...props} params={useParams()} navigate={useNavigate()}/>;
}

class PollDetail extends Component {

  constructor(props){
    super(props);

    this.state = {
        isLoading : false,
        selectedOption : -1
    };
  }

  componentDidMount(){
    this.props.dispatch(getPollData(this.props.params.id));
  }

  selectOption = (optionID) => {
    this.setState({selectedOption : optionID});
  }

  goToTheirProfile = () => {
    this.props.navigate(`/profile/${this.props.data.createdBy.username}`);
  }

  handleVote = async () => {
    if(!this.props.data.userHasVoted){
        if(this.state.selectedOption === -1){
            console.log("Please select an option first");
        }
        else{
            console.log("Voting for option "+this.state.selectedOption);
            let response = await dataService.vote(this.state.selectedOption);

            if(response && response.status === 200){
                window.location.reload(true);
            }
        }
    }
  }

  deletePoll = async () => {
    let response = await dataService.deletePoll(this.props.data.id);
    console.log(response);

    if(response && response.status === 200){
        this.props.navigate('/home');
    }
  }

  render() {
    if(!this.props.isLoggedIn){
        return <Navigate replace to='/home'/>;
    }
    else if(this.props.isLoading){
        return <div className='center'>
            <CircularProgress color='success'/>
        </div>
    }
    else return (
        <div className='center'>
            <div className='poll'>
                <div className='content'>
                    <div className='title'><h3>{this.props.data.title}</h3></div>
                    <div className='description'><p>{this.props.data.content}</p></div>
                    <div className='statistics'>
                        <div className='cell'>
                            <i class="bi bi-people-fill"></i><p>{this.props.data.totalVotes}</p>
                        </div>
                        <div className='cell link' onClick={this.goToTheirProfile}>
                            <i class="bi bi-person-circle"></i><p>{this.props.data.createdBy.username}</p>
                        </div>
                        <div className='cell'>
                            <i class="bi bi-clock-fill"></i><p>{this.props.data.createdAt.substring(0,10)}</p>
                        </div>
                    </div>
                    <div className='options'>
                        {this.props.data.options.map(option => <Option key={option.id} userHasVoted={this.props.data.userHasVoted} id={option.id} name={option.name} voteCount={option.voteCount} selected={option.castByUser===true || option.id === this.state.selectedOption} totalVotes={this.props.data.totalVotes} selectOption={this.selectOption}/>)}
                    </div>
                    <div className='controls'>
                        <Button color = {this.props.data.userHasVoted ? 'grey' : 'primary'} variant="contained" fullWidth={true} onClick={this.handleVote}>{this.props.data.userHasVoted ? "You have already voted" : "Vote"}</Button>
                        {this.props.data && this.props.data.createdBy.username === this.props.user && <Button color='error' variant='contained' fullWidth={true} onClick={this.deletePoll}>Delete Poll</Button>}
                    </div>
                </div>
            </div>
        </div>
    )
  }
}

const mapStateToProps = (state) => {
    return {
        data : state.pollDetails.pollDetails,
        user : state.auth.user,
        isLoggedIn : state.auth.isLoggedIn
    }
}

export default withParams(connect(mapStateToProps)(PollDetail));