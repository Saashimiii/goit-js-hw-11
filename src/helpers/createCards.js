function createCards(arr) {
    return arr
      .map(
        ({
          webformatURL,
          largeImageURL,
          tags,
          likes,
          views,
          comments,
          downloads,
        }) =>
          `<div class="photo-card">
            <a class="gallery__link" href="${largeImageURL}">
    <img src="${webformatURL}" alt="${tags}" title=${tags} width="350px" height="250px" loading="lazy" />
    <div class="info">
      <p class="info-item">
        <b>Likes
        </b> ${likes}
      </p>
      <p class="info-item">
        <b>Views
        </b> ${views}
      </p>
      <p class="info-item">
        <b>Comments
        </b> ${comments}
      </p>
      <p class="info-item">
        <b>Downloads
        </b>${downloads}
      </p>
    </div></a>
  </div>`
      )
      .join('');
  }
  export { createCards };