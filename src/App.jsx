import React, { useState, useEffect } from 'react';
import SearchBox from './components/SearchBox/SearchBox';
import MoviesList from './components/MoviesList/MoviesList';
import FavoritesGallery from './components/FavoritesGallery/FavoritesGallery';
import axios from 'axios';
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false); // Define showFavorites state
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
      let updatedFavorites = [...favorites, imdbID]; // Add new favorite to the favorites array
      setFavorites(updatedFavorites);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites)); // Update localStorage
      alert('Movie added to favorites!');
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const toggleFavorites = () => {
    setShowFavorites(!showFavorites); // Toggle the state to show/hide FavoritesGallery
  };

  return (
    <div>
      <div className="search-container">
        <SearchBox searchMovies={searchMovies} />
        <button onClick={toggleFavorites}>Show Favorites</button> {/* Button to toggle FavoritesGallery */}
      </div>
      <MoviesList movies={movies} addToFavorites={addToFavorites} />
      {showFavorites && <FavoritesGallery favorites={favorites} OMDB_URL={OMDB_URL} />} {/* Render FavoritesGallery conditionally */}
    </div>
  );
}

export default App;
