async function searchMovies() {
    const title = document.getElementById('searchInput').value;
    try {
      const response = await axios.get(`http://www.omdbapi.com/?apikey=f9b7975f&s=${title}&type=movie`);
      displayMovies(response.data.Search);
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
  function displayMovies(movies) {
    const moviesList = document.getElementById('moviesList');
    moviesList.innerHTML = '';
  
    movies.forEach(movie => {
      const movieDiv = document.createElement('div');
      movieDiv.innerHTML = `
        <h3>${movie.Title}</h3>
        <p>Year: ${movie.Year}</p>
        <p>IMDb ID: ${movie.imdbID}</p>
        <img src="http://img.omdbapi.com/?apikey=f9b7975f&i=${movie.imdbID}&h=400" alt="${movie.Title}">
        <button onclick="addToFavorites('${movie.imdbID}')">Add to Favorites</button>
      `;
      moviesList.appendChild(movieDiv);
    });
  }
  
  async function addToFavorites(imdbID) {
    try {
      const response = await axios.post('http://localhost:3000/favorites', { imdbID });
      alert('Movie added to favorites!');
    } catch (error) {
      console.error('Error:', error);
    }
  }
  