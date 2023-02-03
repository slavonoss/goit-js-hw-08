// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line
import '../css/common.css';
import '../css/01-gallery.css';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryEl = document.querySelector('.gallery');
galleryEl.insertAdjacentHTML('afterbegin', createGalleryMarkup(galleryItems));
new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

function createGalleryMarkup(gallery) {
  return gallery
    .map(({ original, preview, description }) => {
      return `<a class="gallery__item" href="${original}">
        <img class="gallery__image" src="${preview}" alt="${description}" />
        </a>`;
    })
    .join('');
}
