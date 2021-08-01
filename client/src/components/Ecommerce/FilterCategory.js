import React from 'react'
import { Dropdown, DropdownButton } from 'react-bootstrap'

function FilterCategory({ handleCategoryChange }) {
    const categoryList = ["Plant","Flower","Seed","Pesticides","Tools"]
    return (
        <>
            <DropdownButton  
                alignRight
                title="Product Category"          
                id="dropdown-menu-align-right"
                onSelect={handleCategoryChange}
            >
                {categoryList.map(category => (
                    <Dropdown.Item key={category} eventKey={category}>{category}</Dropdown.Item>
                ))}

            </DropdownButton>
        </>

    )
}

export default FilterCategory
