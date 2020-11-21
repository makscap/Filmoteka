// const API_KEY = 'bb47a995514a49758140b073ef1103f5';
// const BASE_URL = 'https://developers.themoviedb.org/3';
import loaderToggle from './loader';
import moviePosterTpl from '../templates/movie-card.hbs';
import apiService from './api-service';

const refs = {
  moviesContainer: document.querySelector('.js-card'),
};
const newApiService = new apiService();

render();

//добавила спинер

function render() {
 loaderToggle();
  newApiService.fetchTrendingMovies().then(renderMoviesCard).then(loaderToggle());
}

function renderMoviesCard(articles) {
    refs.moviesContainer.insertAdjacentHTML('beforeend', moviePosterTpl(articles));
}