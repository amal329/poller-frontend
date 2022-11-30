import React, { useEffect, useState } from 'react'
import Pagination from './Pagination'
import PollView from './PollView';

function ListOfPolls(props) {
  const {currentPage,totalPages} = props.data;

  const createPolls = () => {
    let polls = [];
    
    if(props.data && props.data.polls.length>0){
      props.data.polls.map(poll => {
        polls.push(<PollView key={poll.id} id={poll.id} title={poll.title} options={poll.options}/>)
      });
    }

    return polls;
  }

  return (
    <div className='center'>
      <div className='listofpolls'>
        <div className='polls'>
          {createPolls()}
        </div>
        {totalPages>0 && <Pagination totalPages={totalPages} currentPage={currentPage+1} setCurrentPage={props.changeCurrentPage}/>}
        {totalPages==0 && <h3 className='nopolls'>There are no polls here.</h3>}
      </div>
    </div>
  )
}

export default ListOfPolls;
