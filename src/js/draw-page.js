// const API_KEY = 'bb47a995514a49758140b073ef1103f5';
// const BASE_URL = 'https://developers.themoviedb.org/3';

import moviePosterTpl from '../templates/movie-card.hbs';
import apiService from './api-service';

const refs = {
  moviesContainer: document.querySelector('.js-card'),
};
const newApiService = new apiService();

render();

function render() {
  newApiService.fetchTrendingMovies().then(renderMoviesCard);
}

function renderMoviesCard(articles) {
    refs.moviesContainer.insertAdjacentHTML('beforeend', moviePosterTpl(articles));
}