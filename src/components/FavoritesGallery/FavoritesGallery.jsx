import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './favoritesGallery.css';

function FavoritesGallery({ favorites, OMDB_URL, showFavorites }) {
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  useEffect(() => {
    const fetchFavoriteMovies = async () => {
      try {
        const favoriteMoviesData = await Promise.all(favorites.map(async (imdbID) => {
          const response = await axios.get(`${OMDB_URL}&i=${imdbID}`);
          return response.data;
        }));
        setFavoriteMovies(favoriteMoviesData);
      } catch (error) {
        console.error('Error fetching favorite movie details:', error);
      }
    };

    if (showFavorites) {
      // console.log('Fetching favorite movies...');
      fetchFavoriteMovies();
    }
  }, [favorites, OMDB_URL, showFavorites]);

  return (
    <div id="favoritesGallery" style={{ display: showFavorites ? 'block' : 'none' }}>
    <h3 id="Fav-List-Heading">Favorite Movie List</h3>
      {/* Conditionally render the gallery based on showFavorites */}
      {favoriteMovies.map(movie => (
        <div key={movie.imdbID}>
          <h3>{movie.Title}</h3>
          <p>Year: {movie.Year}</p>
          <p>IMDb ID: {movie.imdbID}</p>
          <img src={movie.Poster} alt={movie.Title} />
        </div>
      ))}
    </div>
  );
}

export default FavoritesGallery;
