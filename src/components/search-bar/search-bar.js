import React from 'react';
import './search-bar.css';

const SearchBar = ({onSearchChange, onButtonSubmit}) => {
    return (
        <div>
        <input 
        id='search'
        type = 'search' 
        placeholder = 'Search Boardgames'
        onChange={onSearchChange}
        />
        <button
        id = 'submit-btn'
        onClick = {onButtonSubmit}
        />
        </div>
    );
}

export default SearchBar;