import React from 'react'
import { Dropdown, DropdownButton } from 'react-bootstrap'

function FilterCategory({handleSortChange}) {
    return (
        <>
            <DropdownButton  
                alignRight
                title="Sort By"          
                id="dropdown-menu-align-right"
                onSelect={handleSortChange}
            >
                <Dropdown.Item key="rating" eventKey="rating">Highest Rated</Dropdown.Item>
                <Dropdown.Item key="newest" eventKey="newest">Newest</Dropdown.Item>
                <Dropdown.Item key="lowest" eventKey="lowest">Price: Low to High</Dropdown.Item>
                <Dropdown.Item key="highest" eventKey="highest">Price: High to Low</Dropdown.Item>
            </DropdownButton>
        </>

    )
}

export default FilterCategory
