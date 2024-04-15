function initializeEnvironment() {
  // Initialize dotenv
  dotenv.config();

  // Access environment variables
  const OMDB_URL = process.env.OMDB_URL;

  // Call setupSearch() when the page initially loads
  setupSearch();
}

// Call initializeEnvironment() when the DOM is ready
document.addEventListener('DOMContentLoaded', initializeEnvironment);

// Function to search for movies
async function searchMovies() {
  const title = document.getElementById('searchInput').value;
  try {
    // Access environment variable
    const OMDB_URL = process.env.OMDB_URL;
    
    // Send request to OMDB API
    const response = await axios.get(`${OMDB_URL}&s=${title}&type=movie`);
    
    // Display search results
    displayMovies(response.data.Search);
  } catch (error) {
    console.error('Error:', error);
  }
}

// Function to display movies
function displayMovies(movies) {
  const moviesList = document.getElementById('moviesList');
  moviesList.innerHTML = '';
  
  movies.forEach(movie => {
    const movieDiv = document.createElement('div');
    movieDiv.innerHTML = `
      <h3>${movie.Title}</h3>
      <p>Year: ${movie.Year}</p>
      <p>IMDb ID: ${movie.imdbID}</p>
      <img src="${movie.Poster}" alt="${movie.Title}">
      <button onclick="addToFavorites('${movie.imdbID}')">Add to Favorites</button>
    `;
    moviesList.appendChild(movieDiv);
  });
}

// Function to setup search functionality
function setupSearch() {
  const searchButton = document.getElementById('search-button');
  const searchInput = document.getElementById('searchInput');

  searchButton.addEventListener('click', searchMovies);

  searchInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
      searchMovies();
    }
  });
}

// Function to add movie to favorites
function addToFavorites(imdbID) {
  try {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (!favorites.includes(imdbID)) {
      favorites.push(imdbID);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      alert('Movie added to favorites!');
    } else {
      alert('Movie is already in favorites!');
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

// Function to display favorites gallery
function displayFavoritesGallery() {
  try {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const favoritesGallery = document.getElementById('favoritesGallery');
    const moviesList = document.getElementById('moviesList');

    moviesList.innerHTML = '';

    if (favorites.length === 0) {
      favoritesGallery.innerHTML = 'No favorites added yet.';
      return;
    }

    favoritesGallery.innerHTML = '';

    favorites.forEach(async (imdbID) => {
      try {
        const OMDB_URL = process.env.OMDB_URL;
        const response = await axios.get(`${OMDB_URL}&i=${imdbID}`);
        const movie = response.data;

        const galleryItem = document.createElement('div');
        galleryItem.innerHTML = `
          <h3>${movie.Title}</h3>
          <p>Year: ${movie.Year}</p>
          <p>IMDb ID: ${movie.imdbID}</p>
          <img src="${movie.Poster}" alt="${movie.Title}">
        `;

        favoritesGallery.appendChild(galleryItem);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    });
  } catch (error) {
    console.error('Error:', error);
  }
}

// Call setupSearch when the page initially loads
document.addEventListener('DOMContentLoaded', setupSearch);
