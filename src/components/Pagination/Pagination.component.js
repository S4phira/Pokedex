import React, { useState } from 'react';
import './paginationStyle.css';

import Pagination from 'react-bootstrap/Pagination'

const Paginations = ({ pokemonListPerPage, totalCards, paginate, currentPage }) => {

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalCards / pokemonListPerPage); i++) {
        pageNumbers.push(i);
    }
    return (
        <div className="pagination">
            <Pagination>
                {pageNumbers.map(number => (
                    <Pagination.Item onClick={() => paginate(number)} key={number} active={number === currentPage}>
                        {number}
                    </Pagination.Item>
                ))}
            </Pagination>
        </div>
    )
}

export default Paginations;