# SBA-320H React Application

Vite Express Javascript application that displays Movies based on titles that a user can type into a search box.

Source of movie data:

OMDb API via  `https://www.omdbapi.com/`

Background image based on "Milky way" By 24Novembers from Adobe Stock
`https://as1.ftcdn.net/v2/jpg/03/37/57/74/1000_F_337577487_VpfpvGTSY1rNGDWM7p4pKfMUxgIxqq3C.jpg`

# To run code from this Github:

1. Run `npm install'

2. Obtain an API key from OMDB `https://www.omdbapi.com/apikey.aspx`

3. Create a .env file that contains the following:
`VITE_OMDB_URL_WITH_KEY=http://www.omdbapi.com/?apikey=YOUR_API_KEY`

# To use the application:

1. Run 'npm run dev'

2. Enter a title of a movie into the search box.

3. Click on the Search button.

4. Click on the Add to Favorites button if you would like to add the movie to your favorites list. These favorites are stored in localStorage. 

5. Click on the Show Favorites button to see the items you have added to your favorites.