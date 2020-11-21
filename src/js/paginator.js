import Pagination from "tui-pagination";

const container = document.getElementById('tui-pagination-container');

export default function runPaginator(self) { 
    if (!container) { 
        console.log('Error! Pagination container is not fined');
        return 0;
    }
    const { total_pages, total_results, page, lastMethod} = self;

    const paginatorOptions = {
        totalItems: total_results,
        itemsPerPage: 20,
        visiblePages: 5,
        page: page,
        centerAlign: true,
        totalPage: total_pages,
    }
    const Paginator = new Pagination(container, paginatorOptions);
    
    Paginator.on('beforeMove', e => {
        self.page = e.page;
        lastMethod();
    });


    return Paginator;
}

  