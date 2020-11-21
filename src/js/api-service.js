const API_KEY = 'b4c2f63def68e49abedf5a34ac5e443b';
const BASE_URL = 'https://api.themoviedb.org/3';

import Paginator from './paginator'; 

export default class NewsApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.results = []
    this.total_pages = 0;
    this.total_results = 0;
    this.lastMethod = () => { };
  }
  fetchPopularArticles() {
    const url = `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=${this.page}`;
    return fetch(url)
      .then(response => response.json())
      .then(({ total_results, total_pages, results }) => {
        this.results = results;
        this.total_pages = total_pages;
        this.total_results = total_results;
        Paginator(this);
        return results;
      });
  }
  fetchSearchArticles() {
    const url = `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&page=${this.page}&query=${this.searchQuery}`;
    return fetch(url)
      .then(response => response.json())
      .then(({ total_results, total_pages, results }) => {
        this.results = results;
        this.total_pages = total_pages;
        this.total_results = total_results;
  
        Paginator(this);
        return results;
      });
  }
  
  fetchGenres() {
    const url = `${BASE_URL}/genre/movie/list?api_key=${API_KEY}`;
    return fetch(url)
      .then(response => response.json())
      .then(data => {
        return data.genres;
      });
  }
  insertGenresOfMovie() {
    return this.fetchPopularArticles().then(data => {
      return this.fetchGenres().then(genresList => {
        return data.map(movie => ({
          ...movie,
          release_date: movie.release_date.split('-')[0],
          genres: movie.genre_ids
            .map(id => genresList.filter(el => el.id === id))
            .flat(),
        }));
      });
    });
  }
//  TrendingMovies() {
//    const url = `${BASE_URL}/trending/all/day?api_key=${API_KEY}`;
//    return this.onFetch(url);
//   }
   MoviesSearch() {
    const url = `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${this.searchQuery}&page=${this.page}&include_adult=false`
    return this.onFetch(url);
  }

  async onFetch(url) {
     try {
      const response = await fetch(url);
      const data = await response.json();
      return data.results;
    } catch (err) {
      return console.log('Some error in fetch');
    }
  }
insertSearchGenresOfMovie() {
    return this.fetchSearchArticles().then(data => {
      return this.fetchGenres().then(genresList => {
        return data.map(movie => ({
          ...movie,
          release_date: movie.release_date.split('-')[0],
          genres: movie.genre_ids
            .map(id => genresList.filter(el => el.id === id))
            .flat(),
        }));
      });
    });
  }

  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }
  set lastMethodCall(link) {
    this.lastMethod = link;
  }
  get lastMethodCall() {
    return this.lastMethod;
  }
  incrementPage() {
    this.page += 1;
  }
  resetPage() {
    this.page = 1;
  }
}
