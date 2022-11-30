import React, { useState } from 'react'

export default function Pagination(props) {

  const {totalPages,currentPage,setCurrentPage} = props;

  const renderPage = (number) => {
    return (
        <div key={number} className={number===currentPage ? 'page selected' : 'page'} onClick={() => setCurrentPage(number)}>
            <a>{number}</a>
        </div>
    );
  }

  const increment = () => {
    if(currentPage<totalPages){
        setCurrentPage(currentPage+1);
    }
  }

  const decrement = () => {
    if(currentPage>1){
        setCurrentPage(currentPage-1);
    }
  }

  const renderPages = () => {

    let pages = [];
    let l = -1;
    let r = -1;

    if(totalPages<=5){
        l = 1;
        r = totalPages;
    }
    else if(currentPage-2<=0){
        l = 1;
        r = l+4;
    }
    else if(currentPage+2>=totalPages){
        l = totalPages-4;
        r = totalPages;
    }
    else{
        l = currentPage - 2;
        r = currentPage + 2;
    }

    for(let i=l;i<=r;i++){
        pages.push(renderPage(i));
    }

    return pages;
  }

  return (
    <div className='pagination'>
        <div className='pages'>
            <div className={currentPage===1 ? 'page disabled' : 'page'} onClick={decrement}>
                <i className="bi bi-caret-left-fill"></i>
            </div>
            {renderPages()}
            <div className={currentPage===totalPages ? 'page disabled' : 'page'} onClick={increment}>
            <i className="bi bi-caret-right-fill"></i>
            </div>
        </div>
    </div>
  )
}
