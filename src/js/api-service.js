const API_KEY = 'b4c2f63def68e49abedf5a34ac5e443b';
const BASE_URL = 'https://developers.themoviedb.org/3';


export default class apiService {
  constructor() {
    this.searchQuery = "";
    this.page = 1;
  }
  fetchTrendingMovies() {
    const url = `${BASE_URL}/trending/all/day?api_key=${API_KEY}`;
    return fetch(url)
      .then(response => response.json())
      .then(({ results }) => {
        return results;
      });
  }
  fetchMoviesSearch() {
    const url = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${this.searchQuery}`;
    return fetch(url)
      .then(response => response.json())
      .then(({ results }) => {
        return results;
      });
  }
  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}