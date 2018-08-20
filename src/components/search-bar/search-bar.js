import React from "react";
import "./search-bar.css";

const SearchBar = ({ onSearchChange, onButtonSubmit }) => {
  return (
    <div id="search-and-button">
      <input
        id="search"
        type="search"
        placeholder="Search Boardgames"
        onChange={onSearchChange}
        className="shadow-5"
      />
      <button id="submit-btn" onClick={onButtonSubmit} className="shadow-5">
        SEARCH
      </button>
      <div>
        <h2>Use "QUOTES" to search for exact phrases</h2>
      </div>
    </div>
  );
};

export default SearchBar;
