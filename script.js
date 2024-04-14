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
  
  function addToFavorites(imdbID) {
    try {
      // Check if favorites array exists in localStorage
      let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  
      // Check if the movie is already in favorites
      if (!favorites.includes(imdbID)) {
        // Add the movie to favorites
        favorites.push(imdbID);
        // Update localStorage
        localStorage.setItem('favorites', JSON.stringify(favorites));
        alert('Movie added to favorites!');
      } else {
        alert('Movie is already in favorites!');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
  function displayFavoritesGallery() {
    try {
      // Retrieve favorites from localStorage
      const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  
      // Get the containers for full movies list and favorites gallery
      const moviesList = document.getElementById('moviesList');
      const favoritesGallery = document.getElementById('favoritesGallery');
  
      // Clear any existing content in movies list
      moviesList.innerHTML = '';
  
      // Check if there are favorites to display
      if (favorites.length === 0) {
        favoritesGallery.innerHTML = 'No favorites added yet.';
        return;
      }
  
      // Hide the full movies list
      moviesList.style.display = 'none';
  
      // Show the favorites gallery
      favoritesGallery.style.display = 'block';
  
      // Loop through favorites and create HTML elements for each
      favorites.forEach(async (imdbID) => {
        try {
          // Fetch movie details using IMDb ID
          const response = await axios.get(`http://www.omdbapi.com/?apikey=f9b7975f&i=${imdbID}`);
          const movie = response.data;
  
          // Create HTML elements to display movie information
          const galleryItem = document.createElement('div');
          galleryItem.innerHTML = `
            <h3>${movie.Title}</h3>
            <p>Year: ${movie.Year}</p>
            <p>IMDb ID: ${movie.imdbID}</p>
            <img src="http://img.omdbapi.com/?apikey=f9b7975f&i=${movie.imdbID}&h=400" alt="${movie.Title}">
          `;
  
          // Append gallery item to the favorites gallery
          favoritesGallery.appendChild(galleryItem);
        } catch (error) {
          console.error('Error fetching movie details:', error);
        }
      });
    } catch (error) {
      console.error('Error:', error);
    }
  }
  