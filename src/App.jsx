import React, { useState, useEffect } from 'react';
import SearchBox from './components/SearchBox';
import MoviesList from './components/MoviesList';
import FavoritesGallery from './components/FavoritesGallery';
import axios from 'axios';
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const OMDB_URL = 'YOUR_OMDB_URL_HERE'; // Replace 'YOUR_OMDB_URL_HERE' with your actual OMDB URL

  const searchMovies = async (title) => {
    console.log('Searching for:', title);
    try {
      const response = await axios.get(`${OMDB_URL}s=${title}&type=movie`);
      console.log('API Response:', response);
      setMovies(response.data.Search || []);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  useEffect(() => {
    // Your existing setup code
  }, []);

  const addToFavorites = (imdbID) => {
    // Your existing addToFavorites function
  };

  return (
    <div>
      <SearchBox searchMovies={searchMovies} />
      <MoviesList movies={movies} addToFavorites={addToFavorites} />
      <FavoritesGallery favorites={favorites} OMDB_URL={OMDB_URL} />
    </div>
  );
}

export default App;
