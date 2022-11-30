import React, { useState } from 'react'

export default function Option(props) {

  const {id,name,userHasVoted,totalVotes=100,voteCount,selected,locked = true} = props;
  const width = (voteCount/totalVotes)*100;
  const selectOption = props.selectOption;

  let displayName = userHasVoted ? `${name} (${Math.round(width)}%)` : name;

  const selectedStyle = {
    backgroundColor : '#5FD068'
  };

  const resultStyle = {
    width : `${width}%`
  }

  let styles = {
  }

  if(selected){
    styles = {
      ...styles,
      ...selectedStyle
    }
  }

  if(userHasVoted){
    styles = {
      ...styles,
      ...resultStyle
    }
  }

  return (
    <div className='option'>
        <div className='parent'>
            <div className='child' style={styles} onClick={!userHasVoted ? () => selectOption(id) : null}>
                <input className='optionValue' type='text' value={displayName} readOnly={locked}></input>
            </div>
        </div>
    </div>
  )
}
