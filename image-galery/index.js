const images = document.querySelectorAll('.image-content');
const searchSvg = document.querySelector('.search-svg');
const searchInput = document.querySelector('.search-input');
const searchBlock = document.querySelector('.search-block');
const removeSvg = document.querySelector('.remove-svg');
const gifLoading = document.querySelector('.gif-loading');

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
    if (searchInput.value !== '') {
        gifLoading.classList.add('gif-loading-on');
        setTimeout(() => {
            gifLoading.classList.add('gif-loading-appear');
        }, 10);
        
        setTimeout(() => {
            gifLoading.classList.remove('gif-loading-appear');
            setTimeout(() => {
                gifLoading.classList.remove('gif-loading-on');
            }, 300);
        }, 1500);

        const entrance = await fetch(urlBase + searchInput.value + clientId);
        const convertedEntrance = await entrance.json();
        showImages(convertedEntrance);
    }
}

function showImages(data) {
    if (data.results.length === 0) {
        const searchInputFocus = document.querySelector('.search-input:focus');
        searchInputFocus.style.outline = '2px solid red';
        searchInputFocus.style.filter = 'drop-shadow(0 0 8px red)';
        searchInputFocus.value = '';
        searchInputFocus.placeholder = 'Nothing found';
        setTimeout(() => {
            searchInputFocus.removeAttribute('style');
            searchInputFocus.placeholder = 'Search...';
        }, 2000);
    } else {
        for (let i = 0; i < data.results.length; i++) {
        images[i].style['background-image'] = 'url(' + data.results[i].urls.regular + ')' 
    }
    }
}

(async function showDefaultImages() {
    const entrance = await fetch(urlBase + 'programming' + clientId);
    const convertedEntrance = await entrance.json();
    showImages(convertedEntrance);
})()

searchBlock.addEventListener('keydown', doSearchOnEnter);

function doSearchOnEnter(event) {
    if (event.code === 'Enter') {
        getImages();
    }
}