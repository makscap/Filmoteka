import moviesList from '../templates/movies-list.hbs'
const searchForm = document.querySelector('#searchForm');
const moviesContainer = document.querySelector('.js-movies-container');

searchForm.addEventListener('submit', onSearch)


function onSearch(e) {
    e.preventDefault();

    try {
    const searchQuery = e.currentTarget.elements.query.value;
      const url = `https://api.themoviedb.org/3/search/movie?api_key=b4c2f63def68e49abedf5a34ac5e443b&language=en-US&query=${searchQuery}&page=1&include_adult=false`

      const response = await fetch(url);
      const dataMovies = await response.json();
      return listMoviesMarkup(dataMovies);
    }
  catch (error) {
    console.log('Error');
  }
}

function listMoviesMarkup(movies) {
  moviesContainer.insertAdjacentHTML('beforeend', moviesList(movies));
}