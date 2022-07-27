const imageContainer = document.querySelector('.image-container');
const loader = document.querySelector('.loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = []
let isInitialLoad = true

// Unsplash API
let count = 3;
const apiKey = '-DV6QIkzoN3SjLfLl6YttdYjuuoZl3QJLBXcMtMQRDQ'
let apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;


function updateAPIURLWithNewCount (picCount) {
    apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${picCount}`;
  }

function imageLoaded(){
    imagesLoaded++;
    if(imagesLoaded === totalImages){
        ready = true;
        loader.hidden = true;
    }
}


// Set Attributes
function setAttributes(element, attributes){
    for(const key in attributes){
        element.setAttribute(key, attributes[key]);
    }
}


// Create Elements for links & photos
function displayPhotos(){
    imagesLoaded = 0;
    totalImages = photosArray.length;
    photosArray.forEach(photo =>{
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        })

        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
        })

        img.addEventListener('load', imageLoaded);

        item.appendChild(img);
        imageContainer.appendChild(item)
    });
}


// Get photos from Unsplash API
async function getPhotos(){
    try{
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
        if (isInitialLoad) { 
            updateAPIURLWithNewCount(20) 
            isInitialLoad = false 
          }
    } catch(error){
        console.log(error)
    }
}

window.addEventListener('scroll', () =>{
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        ready = false;
        getPhotos();
    }
});

getPhotos();