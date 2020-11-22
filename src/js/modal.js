import * as basicLightbox from 'basiclightbox';

import modalCard from '../templates/modal.hbs';

import { onModalButtons } from './initStorage'

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
      openTrailerModal();

    window.addEventListener('keydown', closeModal);
        
    function closeModal(e) {
    if (e.code === 'Escape') {
    modal.close();
        window.removeEventListener('keydown', closeModal);
        }
    }
      
       onModalButtons();
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

function modalForTrailler(movie_id) {
  const url = `https://api.themoviedb.org/3/movie/${movie_id}/videos?api_key=${apiKey}&language=en-US`;
  // console.log(url)
    fetch(url)
      .then(response => response.json())
      .then(data => {
        const id = data.results[0].key;
        const instance = basicLightbox.create(`
  <iframe width="560" height="315" src='https://www.youtube.com/embed/${id}'frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
`);
        instance.show();
        modalClBtTrailer(instance);
      })
      .catch(() => {
        const instance = basicLightbox.create(`
    <iframe width="560" height="315" src='http://www.youtube.com/embed/zwBpUdZ0lrQ' frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      `);

        instance.show();
        modalClBtTrailer(instance);
      });
  }

  function modalClBtTrailer(instance) {
    const modalBox = document.querySelector('.basicLightbox--iframe');
    modalBox.insertAdjacentHTML(
      'afterbegin',
      `<button
        type="button"
        class="lightbox__button"
        data-action="close-lightbox"
        ></button>
    `
    );
    const modalCloseBtn = document.querySelector(
      '[data-action="close-lightbox"]'
    );
    modalCloseBtn.addEventListener('click', () => instance.close());
  }

  
