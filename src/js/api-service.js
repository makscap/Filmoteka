const API_KEY = 'b4c2f63def68e49abedf5a34ac5e443b';
const BASE_URL = 'https://api.themoviedb.org/3';


export default class ApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

   TrendingMovies() {
   const url = `${BASE_URL}/trending/all/day?api_key=${API_KEY}`;
   return this.onFetch(url);
  }
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

  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }

  incrementPage() {
    this.page += 1;
  }
  resetPage() {
    this.page = 1;
  }
}