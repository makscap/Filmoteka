import Pagination from "tui-pagination";
import NewsApiService from './api-service';
const container = document.getElementById('tui-pagination-container');

const apiService = new NewsApiService();

// const getFilms = apiService.insertSearchGenresOfMovie().then((res) => { 
//     console.log(res);
// });
const paginatorOptions = {
    totalItems: 100,
    itemsPerPage: 20,
    visiblePages: 10,
    centerAlign: true,
    totalPage: 5,
}

const newPagination = new Pagination(container, paginatorOptions);
 
newPagination.getCurrentPage();

  