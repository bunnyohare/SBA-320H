import React from 'react';

function MoviesList({ movies, addToFavorites }) {
  return (
    <div id="moviesList">
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
