import NewsApiService from './api-service';
import moviesList from '../templates/movies-list.hbs';
import loaderToggle from './loader';

const searchForm = document.querySelector('#searchForm');
const moviesContainer = document.querySelector('.js-movies-container');
const notification = document.querySelector('.notification');

const newApiService = new NewsApiService();

searchForm.addEventListener('submit', onSearch);

function onSearch(e) {
    e.preventDefault();

    newApiService.query = e.currentTarget.elements.query.value;
    newApiService.lastMethodCall = onSearch;
    if (newApiService.query !== '') {
        loaderToggle();
        renderMovies()
    }
     else {
        clearMarkup();
    };
};

function renderMovies() {
newApiService.insertSearchGenresOfMovie()
            .then(films => {
                loaderToggle();
                MarkupMoviesCard(films);
                if (films.length === 0) {
      notification.classList.add('active');
    }
            })
};

function MarkupMoviesCard(movies) {
    const allMoviesMarkup = moviesList(movies);
    moviesContainer.innerHTML = allMoviesMarkup;
};

function clearMarkup() {
    moviesContainer.innerHTML = '';
}


