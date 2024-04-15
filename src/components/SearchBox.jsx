import React, { useState } from 'react';

function SearchBox({ searchMovies }) {
  const [searchInput, setSearchInput] = useState('');

  const handleSearch = () => {
    searchMovies(searchInput);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <section id="search-box">
      <div id="input">
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Search for a movie"
        />
        <button onClick={handleSearch}>Search</button>
      </div>
    </section>
  );
}

export default SearchBox;
