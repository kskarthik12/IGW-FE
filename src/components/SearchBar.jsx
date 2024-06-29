import React, { useState } from 'react';


const SearchBar = ({ onSearch }) => {
  const [keyword, setKeyword] = useState('');
  

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(keyword);
  };

  return (
    <div className="search-bar-container">
      <form onSubmit={handleSearch} className="search-bar-form">
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Search for images..."
          className="search-bar-input"
        />
        <button type="submit" className="search-bar-button">Search</button>
      </form>
    </div>
  );
};

export default SearchBar;
