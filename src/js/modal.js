import * as basicLightbox from 'basiclightbox';

import modalCard from '../templates/modal.hbs';

import { onModalButtons } from './addToWatchedQueue'

const apiKey = 'b4c2f63def68e49abedf5a34ac5e443b';

const cardFilm = document.querySelector(".movies-list");

cardFilm.addEventListener('click', openModal);

function fetchOneMovieInfo(movie_id) {
  const url = `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${apiKey}`;
  return fetch(url)
    .then(response => response.json())
    .then(data => ({
      ...data,
      popularity: data.popularity.toFixed(1),
    }));
}

function openModal(e) {
  e.preventDefault();

  fetchOneMovieInfo(e.target.dataset.id)
    .then(data => {
        if (e.target.nodeName !== 'IMG') 
            return;
        
      const markup = modalCard(data);
      const modal = basicLightbox.create(markup);

      modal.show();

      const modalDisabled = document.querySelector('.basicLightbox');

      if (openTrailerModal()) {
        modalDisabled.hidden = true;
      }

      //  onModalButtons();

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

function openTrailerModal() {
  const trailerBtn = document.querySelector('.youtube');
  trailerBtn.addEventListener("click", (e) => {
    modalForTrailler(e.target.dataset.id);
  });
  
}

function modalForTrailler(id) {
  const url = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apiKey}&language=en-US`;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        const id = data.results[0].key;
        const instance = basicLightbox.create(`
  <iframe width="515" height="315" src='https://www.youtube.com/embed/${id}'frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
`);
        instance.show();
        modalClTrailer(instance);
      })
      .catch(() => {
        const instance = basicLightbox.create(`
    <iframe width="515" height="315" src='http://www.youtube.com/embed/zwBpUdZ0lrQ' frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      `);

        instance.show();
        modalClTrailer(instance);
      });
  }

function modalClTrailer(instance) {
  window.addEventListener('keydown', closeModal);
  
  function closeModal(e) {
    if (e.code === 'Escape') {
    instance.close();
        window.removeEventListener('keydown', closeModal);
        }
    }
  }


