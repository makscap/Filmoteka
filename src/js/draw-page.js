
// const API_KEY = 'bb47a995514a49758140b073ef1103f5';
// const BASE_URL = 'https://developers.themoviedb.org/3';
import loaderToggle from './loader';
import moviePosterTpl from '../templates/movies-list.hbs';
import apiService from './api-service';



const listElement = document.querySelector('.js-movies-container');

const newApiService = new NewsApiService();

render();

function render() {
 loaderToggle();
  newApiService.fetchTrendingMovies().then(renderMoviesCard).then(loaderToggle());

}

// для разметки
function renderMoviesCard(articles) {
  listElement.innerHTML = moviePosterTpl(articles);
}

