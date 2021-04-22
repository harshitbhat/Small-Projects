const imageContainer = document.querySelector('.image-container');
const loader = document.querySelector('.loader');

let photos = [];
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
// Unsplash API
const count = 5;
const apiKey = 'WVGDpKDJ2PJ7hRA2rP598t0FpluSazkhvwRuxPKlrUo';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Check if all images are loaded
function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    loader.hidden = true;
    ready = true;
    count = 30;
  }
}
// Helper
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// Create elements for links and photos
function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photos.length;
  photos.forEach((photo) => {
    // Create <a> to link to unsplash
    const item = document.createElement('a');
    setAttributes(item, {
      href: photo.links.html,
      target: '_blank',
    });
    // Create Image tag for photo
    const img = document.createElement('img');
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });
    // Event Loader, check when each is finished loading
    img.addEventListener('load', imageLoaded);
    //Put image inside <a>
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

// Get photos from Async API
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photos = await response.json();
    displayPhotos();
  } catch (err) {
    console.log(err);
  }
}

// Check to see scroll level from bottom of the page
window.addEventListener('scroll', () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    getPhotos();
    ready = false;
  }
});

// On Load
getPhotos();
