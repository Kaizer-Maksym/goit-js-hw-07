import { galleryItems } from './gallery-items.js';
// Change code below this line

// console.log(galleryItems);

const galleryContainer = document.querySelector('.gallery');
const galleryMarkup = createGalleryCardsMarkup(galleryItems);

galleryContainer.insertAdjacentHTML('afterbegin', galleryMarkup);

galleryContainer.addEventListener('click', clickOnGalleryContainer);

function createGalleryCardsMarkup(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `
      <div class="gallery__item">
      <a class="gallery__link" href="large-image.jpg">
      <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</div>`;
    })
    .join('');
}

let instance = {};

function clickOnGalleryContainer(e) {
  e.preventDefault();
  window.addEventListener('keydown', closeModalOnEscape);

  instance = basicLightbox.create(`<img class="original-image" src="${e.target.dataset.source}">`, {
    onClose: instance => {
      window.removeEventListener('keydown', closeModalOnEscape);
    },
  });

  instance.show();
}

function closeModalOnEscape(e) {
  if (e.code === 'Escape') {
    window.removeEventListener('keydown', closeModalOnEscape);
    instance.close();
  }
  console.log(e);
}
