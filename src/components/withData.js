import React from "react";
import { useEffect } from "react";
import { connect } from "react-redux";

const PollsWithData = (ListOfPolls) => {
  const withData = ({...props}) => {

    const {dispatch,datasource} = props;
    const changeCurrentPage = (pageNumber) => {
      datasource(dispatch,props.user ? props.user : null,pageNumber,props.term ? props.term : null);
    }

    useEffect(() => {
      datasource(dispatch,props.user ? props.user : null,1,props.term ? props.term : '');
    },[]);

    return (
      <ListOfPolls datasource={datasource} {...props} changeCurrentPage={changeCurrentPage}/>
    )
  }

  const mapStateToProps = (state,{slice}) => {
    return {
      data : state[slice][slice]
    }
  }

  return connect(mapStateToProps)(withData);
}

export default PollsWithData;