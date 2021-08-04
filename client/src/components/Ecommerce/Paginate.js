import React from 'react';
import { Pagination } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

function Paginate({ page, numOfPages, keyword = '', sort = '', isAdmin = false }) {
    return (
        numOfPages > 1 && (
            <Pagination>
                {[...Array(numOfPages).keys()].map(p => (
                    <LinkContainer
                        key={p + 1}
                        to={keyword ? `/search/${keyword}/page/${p + 1}` : `/page/${p + 1}`} >
                        <Pagination.Item key={p + 1} active={page === (p + 1)} >{p + 1}</Pagination.Item>
                    </LinkContainer>
                ))}
            </Pagination>
        )

    )
}

export default Paginate
