import React from 'react';
import './search-bar.css';

const SearchBar = ({searchChange}) => {
    return (
        <div className = ''>
        <input 
        id="search"
        type = 'search' 
        placeholder = 'Search Boardgames'
        onChange={searchChange}
        />
        </div>
    );
}

export default SearchBar;