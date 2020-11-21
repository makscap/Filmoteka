import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';

import modalCard from '../templates/modal.hbs';

const apiKey = 'b4c2f63def68e49abedf5a34ac5e443b';

const cardFilm = document.querySelector(".movies-list");
console.log(cardFilm)
cardFilm.addEventListener('click', openModal);


function fetchOneMovieInfo(movie_id) {
  const url = `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${apiKey}`;
  return fetch(url).then(response => response.json());
}

function openModal(e) {
  e.preventDefault();

  fetchOneMovieInfo(e.target.dataset.id)
    .then(data => {
        if (e.target.nodeName !== 'IMG') {
            return;
        }
      const modal = basicLightbox.create(modalCard(data));

      modal.show();

    window.addEventListener('keydown', closeModal);
        
    function closeModal(e) {
    if (e.code === 'Escape') {
    modal.close();
        window.removeEventListener('keydown', closeModal);
        }
        }
    })
    .then(data => {})
    .catch(error => {
      console.log('oops!');
    });
}


