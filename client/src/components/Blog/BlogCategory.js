import React from "react";
const { useState} = React;

const data = [{ id: "plant", label: "Plant" },
    { id: "garden", label: "Gardening" },
    { id: "diseases", label: "Plant Diseases" },
    { id: "green", label: "Green Living" },
    { id: "tools", label: "Gardening Tools" },
    { id: "others", label: "Others" },
];

const BlogCategory = ({onCategorySelect}) => {
  const [isOpen, setOpen] = useState(false);
  const [items] = useState(data);
  const [selectedItem, setSelectedItem] = useState(null);
  
  const toggleDropdown = () => setOpen(!isOpen);
  
    const handleItemClick = (id) => {
    onCategorySelect(id)
    selectedItem === id ? setSelectedItem(null) : setSelectedItem(id);
  }
  
  return (
    <div className='dropdown'>
      <div className='dropdown-header' onClick={toggleDropdown}>
        {selectedItem ? items.find(item => item.id === selectedItem).label : "Select Blog Category"}
        <i className={`fa fa-chevron-right icon ${isOpen && "open"}`}></i>
      </div>
      <div className={`dropdown-body ${isOpen && 'open'}`}>
        {items.map(item => (
          <div className="dropdown-item" key={item.id}  onClick={e => handleItemClick(e.target.id)} id={item.id}>
            <span className={`dropdown-item-dot ${item.id === selectedItem && 'selected'}`}>• </span>
            {item.label}
          </div>
        ))}
      </div>
    </div>
  )
}

export default BlogCategory