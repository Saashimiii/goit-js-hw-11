import axios from 'axios';

async function fetchPictures(namePic, page = 1) {
  const BASE_URL = 'https://pixabay.com/api/';
  const KEY_API = '35864662-5c3b2f3ed57b7580b501bec47';

  return await axios.get(
    `${BASE_URL}?key=${KEY_API}&q=${namePic}&orientation=horizontal&safesearch=true&image_type=photo&per_page=40&page=${page}`
  );
 
}
export { fetchPictures };