const imgContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];
let initialLoad=true;
//Unsplash API
let count = 5;
const APIkey = 'cUBfQCUnyvDLLQOxZ9nR68a8Dt5LgxsnOvQDGe3jxVk';
const apiURL = `https://api.unsplash.com/photos/random/?client_id=${APIkey}&count=${count}`;
//Check if all images are loaded
function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
        initialLoad=false;
        count=30;
    }
}
//Helper Function
function setAttributes(elements, attributes) {
    for (const key in attributes) {
        elements.setAttribute(key, attributes[key]);
    }
}
//Create elements  from links  & photos  ,add to DOM
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    photosArray.forEach((photo) => {
        //create <a>  to link unsplash
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });
        //Create <img> for photos
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        });
        //Event Listener
        img.addEventListener('load', imageLoaded);
        //put <img> inside<a> ,then put both  inside image Container
        item.appendChild(img);
        imgContainer.appendChild(item);
    });
}

//get phots from unsplash api
async function getPhotos() {
    try {
        const response = await fetch(apiURL);
        photosArray = await response.json();
        displayPhotos();
    }
    catch (error) {
        //Error here
    }
}
//Check to see Scrolling
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
    }
});
//ON Load
getPhotos();

