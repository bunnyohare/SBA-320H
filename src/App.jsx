import React, { useState, useEffect } from 'react';
import SearchBox from './components/SearchBox';
import MoviesList from './components/MoviesList';
import FavoritesGallery from './components/FavoritesGallery';
import axios from 'axios';
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const OMDB_URL = import.meta.env.VITE_OMDB_URL_WITH_KEY;

  const searchMovies = async (title) => {
    console.log('Searching for:', title);
    try {
      const response = await axios.get(`${OMDB_URL}&s=${title}&type=movie`);
      console.log('API Response:', response);
      setMovies(response.data.Search || []);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    const searchMovies = async (title) => {
      try {
        const response = await axios.get(`${OMDB_URL}&s=${title}&type=movie`);
        setMovies(response.data.Search || []);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    // Call searchMovies function immediately after component mounts
    searchMovies('');
  
    return () => {
      document.removeEventListener('DOMContentLoaded', searchMovies);
    };
  }, []); 
  

  const addToFavorites = (imdbID) => {
    try {
      let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
      if (!favorites.includes(imdbID)) {
        favorites.push(imdbID);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        alert('Movie added to favorites!');
        setFavorites(favorites);
      } else {
        alert('Movie is already in favorites!');
      }
    } catch (error) {
      console.error('Error:', error);
    }
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
