const API_KEY = 'b4c2f63def68e49abedf5a34ac5e443b';
const BASE_URL = 'https://developers.themoviedb.org/3';


export default class apiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }
   TrendingMovies() {
    const url = `${BASE_URL}/trending/all/day?api_key=${API_KEY}`;
    onFetch(url);
  }
   MoviesSearch() {
    const url = `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${this.searchQuery}&page=${this.page}&include_adult=false`
    onFetch(url);
  }

  async onFetch(url) {
  try {
      const response = await fetch(url);
    const results = await response.json();
    
      return results;
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