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
    setShowFavorites(!showFavorites); // Toggle the state to show/hide FavoritesGallery
    // console.log('Searching for:', title);
    try {
      const response = await axios.get(`${OMDB_URL}&s=${title}&type=movie`);
      // console.log('API Response:', response);
      setMovies(response.data.Search || []);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    // Retrieve favorites from localStorage
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    // console.log('Stored favorites:', storedFavorites);
    setFavorites(storedFavorites);
  }, []); // Load favorites only once on component mount

  const addToFavorites = (imdbID) => {
    try {
      let updatedFavorites = [...favorites, imdbID]; // Add new favorite to the favorites array
      setFavorites(updatedFavorites);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites)); // Update localStorage
      // console.log('Favorites after adding:', updatedFavorites);
      alert('Movie added to favorites!');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const toggleFavorites = async () => {
    // console.log('Toggle favorites button clicked');
    await setShowFavorites(!showFavorites); // Toggle the state to show/hide FavoritesGallery
    console.log('showFavorites:', showFavorites); // Check if showFavorites state is updated
  };

  return (
    <div>
      <div className="search-container">
        <SearchBox searchMovies={searchMovies} toggleFavorites={toggleFavorites} />
      </div>
      <MoviesList movies={movies} addToFavorites={addToFavorites} showFavorites={showFavorites}/>
      <FavoritesGallery favorites={favorites} OMDB_URL={OMDB_URL} showFavorites={showFavorites} />
    </div>
  );
}

export default App;
