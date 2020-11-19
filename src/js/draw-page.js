
import moviePosterTpl from '../templates/movies-list.hbs';
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