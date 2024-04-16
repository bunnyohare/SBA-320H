import React from 'react';
import './moviesList.css';

function MoviesList({ movies, addToFavorites, showFavorites }) {
  if ( movies.length <1 && !showFavorites ){
    return (
      <div id="moviesList">
        <h3 id="Movie-List-Heading">Welcome to the Movie Finder</h3>
        <p id="Welcome">Please search for a movie title to add to favorites.</p>
      </div>
    );

  }

  return (
    <div id="moviesList" style={{ display: showFavorites ? 'none' : 'block' }}>
      <h3 id="Movie-List-Heading">Found Movies List</h3>
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
