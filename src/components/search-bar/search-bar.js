import React from 'react';
import './search-bar.css';

const SearchBar = ({onSearchChange}) => {
    return (
        <div className = ''>
        <input 
        id="search"
        type = 'search' 
        placeholder = 'Search Boardgames'
        onChange={onSearchChange}
        />
        </div>
    );
}

export default SearchBar;