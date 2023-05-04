// імпортую Notify
import { Notify } from 'notiflix';
// імпортую SimpleLightbox
import SimpleLightbox from 'simplelightbox';
// Додатковий імпорт стилів
import 'simplelightbox/dist/simple-lightbox.min.css';
// імпортую Helpers
import { fetchPictures } from './helpers/fetchPictures';
import { createCards } from './helpers/createCards';

// отримую HTML елементи
const form = document.querySelector('#search-form');
const galleryContainer = document.querySelector('.gallery');
// додаю таргет для observer

const target = document.querySelector('.js-guard');

let currentPage = 1;
// застосовую SimpleLightbox
let gallery = new SimpleLightbox('.gallery a', {
  captionDelay: 250,
});
// вішаю слухач на форму
form.addEventListener('submit', onSearch);

function onSearch(evt) {
  // скидую рандомні налаштуваня
  evt.preventDefault();
  const { searchQuery } = evt.currentTarget.elements;

   fetchPictures(searchQuery.value)
    .then(datas => {
      const { hits, totalHits, total } = datas.data;
    
      if (!hits.length) {
       return Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      } else {
        galleryContainer.innerHTML = createCards(datas.data.hits);
        document.body.backgroundSize = 'contain';
        observer.observe(target);
        gallery.refresh();
        Notify.info(`Hooray! We found ${totalHits} images.`);
        // плавний скрол
        const { height: cardHeight } = document
          .querySelector('.gallery')
          .firstElementChild.getBoundingClientRect();

        window.scrollBy({
          top: cardHeight * 2,
          behavior: 'smooth',
        });
      } 
      if (total === hits.length) {
        observer.unobserve(target);
        return Notify.failure(
          "We're sorry, but you've reached the end of search results."
        );
      }
    })
    .catch(err => console.log(err));
}
// створюю об'єкт-спостерігач
let options = {
  root: null,
  rootMargin: '200px',
  threshold: 1.0,
};
let observer = new IntersectionObserver(onLoad, options);

function onLoad(entries, observer) {
  console.log(entries);
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      currentPage += 1;
      fetchPictures(form.searchQuery.value, currentPage)
        .then(datas => {
          
          const { hits } = datas.data;
        
          galleryContainer.insertAdjacentHTML('beforeend', createCards(hits));
          observer.observe(target);

          if (hits.length < 40) {
            observer.unobserve(target);
            Notify.failure(
              "We're sorry, but you've reached the end of search results."
            );
           
          }
          
          gallery.refresh();
        })
        .catch(err => {
          if ((err.status = 400)) {
            Notify.failure(
              "We're sorry, but you've reached the end of search results."
            );
            
          }
        });
    }
  });
}