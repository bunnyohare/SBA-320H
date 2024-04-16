import React, { useState, useEffect } from 'react';
import SearchBox from './components/SearchBox/SearchBox';
import MoviesList from './components/MoviesList/MoviesList';
import FavoritesGallery from './components/FavoritesGallery/FavoritesGallery';
import axios from 'axios';
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true); // Track initial load

  const OMDB_URL = import.meta.env.VITE_OMDB_URL_WITH_KEY;

  const searchMovies = async (title) => {
    setShowFavorites(false); // Hide FavoritesGallery when searching for movies
    try {
      const response = await axios.get(`${OMDB_URL}&s=${title}&type=movie`);
      setMovies(response.data.Search || []);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
    // Update initialLoad based on whether there are favorites on component mount
    setInitialLoad(storedFavorites.length === 0);
  }, []);

  const addToFavorites = (imdbID) => {
    try {
      let updatedFavorites = [...favorites, imdbID];
      setFavorites(updatedFavorites);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      alert('Movie added to favorites!');
      setInitialLoad(false);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const toggleFavorites = async () => {
    setShowFavorites(!showFavorites);
  };

  return (
    <div>
      <div className="search-container">
        <SearchBox searchMovies={searchMovies} toggleFavorites={toggleFavorites} initialLoad={initialLoad} />
      </div>
      {movies.length < 1 && initialLoad ? (
        <div id="Welcome-Box">
          <h3 id="Welcome">Welcome to the Movie Finder</h3>
          <p id="No-Favs">Please search for a movie title to add to favorites.</p>
        </div>
      ) : (
        <div>
          <MoviesList movies={movies} addToFavorites={addToFavorites} showFavorites={showFavorites} initialLoad={initialLoad}/>
          <FavoritesGallery favorites={favorites} OMDB_URL={OMDB_URL} showFavorites={showFavorites} />
        </div>
      )}
    </div>
  );
}

export default App;
