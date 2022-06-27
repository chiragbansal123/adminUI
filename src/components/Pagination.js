import React from 'react'

const Pagination = ({userPerPage,totalUsers,paginate}) => {
    const pageNumbers= [];

    for(let i=1;i<=Math.ceil(totalUsers/userPerPage);i++){
        pageNumbers.push(i)
    }

    return (
        <nav>
            <ul className='pagination pg-blue justify-content-center'>
                
                    <li key={1} className="page-item">
                    <a onClick={()=>paginate(1)}  href='!#' className='page-link'>
                        First
                    </a>
                    </li>
            
                
                    <li key={-1} className="page-item">
                    <a onClick={()=>paginate(-1)}  href='!#' className='page-link'>
                        Previous
                    </a>
                    </li>
                {pageNumbers.map(number=>(
                    <li key={number} className="page-item">
                    <a onClick={()=>paginate(number)}  href='!#' className='page-link'>
                        {number}
                    </a>
                    </li>
                ))}
                <li key={1}>
                <a onClick={()=>paginate(6)}  href='!#' className='page-link'>
                        Next
                    </a>
                </li>
                <li key={1}>
                <a onClick={()=>paginate(5)}  href='!#' className='page-link'>
                        Last
                    </a>
                </li>
            </ul>
        </nav>
  )
}

export default Pagination