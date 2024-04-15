import React, { useState } from "react";
import "./searchBox.css";

function SearchBox({ searchMovies, toggleFavorites }) {
  const [searchInput, setSearchInput] = useState("");

  const handleSearch = () => {
    searchMovies(searchInput);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch(); // Call handleSearch function when Enter key is pressed
    }
  };

  return (
    <section id="search-box">
      <div id="input">
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search for a movie"
        />

        <button onClick={handleSearch}>Search</button>
        <button onClick={toggleFavorites}>Show Favorites</button>
      </div>
    </section>
  );
}

export default SearchBox;
