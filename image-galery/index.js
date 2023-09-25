const images = document.querySelectorAll('.image-content');
const searchSvg = document.querySelector('.search-svg');
const searchInput = document.querySelector('.search-input');
const searchBlock = document.querySelector('.search-block');
const removeSvg = document.querySelector('.remove-svg');

const urlBase = 'https://api.unsplash.com/search/photos/?query='
const clientId = '&per_page=15&tag_mode=all&orientation=landscape&client_id=F4jIYSVLXctYvGgXXqr4XrPS7ceikoMPfyUbOfuxQTk'

searchBlock.addEventListener('mousedown', preventClose);
searchBlock.addEventListener('click', removeValue);

function preventClose(event) {
    if (event.target === searchSvg || event.target === removeSvg) {
        event.preventDefault();
    }
}

function removeValue(event) {
    if (event.target === removeSvg) {
        searchInput.value = '';
    }
}

searchSvg.addEventListener('click', getImages)

async function getImages() {
    const entrance = await fetch(urlBase + searchInput.value + clientId);
    const convertedEntrance = await entrance.json();
    showImages(convertedEntrance);
}

function showImages(data) {
    for (let i = 0; i < data.results.length; i++) {
        images[i].style['background-image'] = 'url(' + data.results[i].urls.regular + ')' 
    }
}

(async function showDefaultImages() {
    const entrance = await fetch(urlBase + 'programming' + clientId);
    const convertedEntrance = await entrance.json();
    showImages(convertedEntrance);
})()