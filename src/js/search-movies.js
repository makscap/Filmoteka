import NewsApiService from './api-service';
import moviesList from '../templates/movies-list.hbs';
import loaderToggle from './loader';

const searchForm = document.querySelector('#searchForm');
const moviesContainer = document.querySelector('.js-movies-container');

const newApiService = new NewsApiService();

searchForm.addEventListener('submit', onSearch);

function onSearch(e) {
    e.preventDefault();

    newApiService.query = e.currentTarget.elements.query.value;
    newApiService.lastMethodCall = onSearch;
    if (newApiService.query !== '') {
        loaderToggle();
        newApiService.insertSearchGenresOfMovie()
            .then(films => {
                loaderToggle();
                renderMoviesCard(films);
            })
    }
     else {
        clearMarkup();
    };
};

function renderMoviesCard(movies) {
    const allMoviesMarkup = moviesList(movies);
    moviesContainer.innerHTML = allMoviesMarkup;
};

function clearMarkup() {
    moviesContainer.innerHTML = '';
}


