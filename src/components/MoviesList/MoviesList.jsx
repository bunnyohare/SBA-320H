import React from 'react';
import './moviesList.css';

function MoviesList({ movies, addToFavorites, showFavorites }) {

  return (
    <div id="moviesList" style={{ display: showFavorites ? 'none' : 'block' }}>
      {/* Conditionally render the movieList based on showFavorites */}
      {movies.map(movie => (
        <div key={movie.imdbID}>
          <h3>{movie.Title}</h3>
          <p>Year: {movie.Year}</p>
          <p>IMDb ID: {movie.imdbID}</p>
          <img src={movie.Poster} alt={movie.Title} />
          <button onClick={() => addToFavorites(movie.imdbID)}>Add to Favorites</button>
        </div>
      ))}
    </div>
  );
}

export default MoviesList;
