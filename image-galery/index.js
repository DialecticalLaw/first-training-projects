const images = document.querySelectorAll('.image-content');
const searchSvg = document.querySelector('.search-svg');
const searchInput = document.querySelector('.search-input');
const searchBlock = document.querySelector('.search-block');
const removeSvg = document.querySelector('.remove-svg');
const gifLoading = document.querySelector('.gif-loading');

const expandImgWrapper = document.querySelector('.expand-img-wrapper');
const expandImgMenu = document.querySelector('.expand-img-menu');
const expandImgImage = document.querySelector('.expand-img');
const closeMenuSvg = document.querySelector('.close-menu');

const rightArrow = document.querySelector('.right-arrow');
const leftArrow = document.querySelector('.left-arrow');

const urlBase = 'https://api.unsplash.com/search/photos/?query='
const clientId = '&per_page=15&tag_mode=all&orientation=landscape&client_id=F4jIYSVLXctYvGgXXqr4XrPS7ceikoMPfyUbOfuxQTk'

searchBlock.addEventListener('mousedown', preventClose);
searchBlock.addEventListener('click', removeValue);

for (let img of images) {
    img.addEventListener('click', expandImg);
}

document.addEventListener('click', event => {
    if (expandImgMenu.classList.contains('expand-img-menu-on')) {
        if (!expandImgMenu.contains(event.target)) {
            closeExpandImg();
        }
    }
})

let selectedImg;

function expandImg(event) {
    selectedImg = event.target;
    selectedImg.classList.add('selected-img');
    expandImgWrapper.classList.add('expand-img-wrapper-on');
    expandImgImage.src = event.target.style['background-image'].slice(5, -2);
    if (selectedImg.previousElementSibling === null) {
        leftArrow.style.opacity = '0.3';
    }
    if (selectedImg.nextElementSibling === null) {
        rightArrow.style.opacity = '0.3';
    }
    if (selectedImg.previousElementSibling !== null) {
        leftArrow.style.opacity = '1';
    }
    if (selectedImg.nextElementSibling !== null) {
        rightArrow.style.opacity = '1';
    }
    setTimeout(() => {
        expandImgWrapper.classList.add('expand-img-wrapper-blackout');
        expandImgMenu.classList.add('expand-img-menu-on');
    }, 30);
}

closeMenuSvg.addEventListener('click', closeExpandImg);

function closeExpandImg() {
    selectedImg.classList.remove('selected-img');
    expandImgWrapper.classList.remove('expand-img-wrapper-blackout');
    expandImgMenu.classList.remove('expand-img-menu-on');
    setTimeout(() => {
        expandImgWrapper.classList.remove('expand-img-wrapper-on');
    }, 500);
}

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

leftArrow.addEventListener('click', switchLeft);
rightArrow.addEventListener('click', switchRight);

function switchLeft() {
    if (selectedImg.previousElementSibling !== null) {
        expandImgImage.classList.add('fade-img-right');

        setTimeout(() => {
            selectedImg.classList.remove('selected-img');
            selectedImg = selectedImg.previousElementSibling;
            selectedImg.classList.add('selected-img');
            expandImgImage.src = selectedImg.style['background-image'].slice(5, -2);
            if (selectedImg.previousElementSibling === null) {
                leftArrow.style.opacity = '0.3';
            } else {
                leftArrow.style.opacity = '1';
            }
            
            if (selectedImg.nextElementSibling !== null) {
                rightArrow.style.opacity = '1';
            }
            
            expandImgImage.classList.add('fade-img-left');
            expandImgImage.classList.remove('fade-img-right');
            setTimeout(() => {
                expandImgImage.classList.remove('fade-img-left');
            }, 100);
        }, 200);
    } else {
        return;
    }
}

function switchRight() {
    if (selectedImg.nextElementSibling !== null) {
        expandImgImage.classList.add('fade-img-left');

        setTimeout(() => {
            selectedImg.classList.remove('selected-img');
            selectedImg = selectedImg.nextElementSibling;
            selectedImg.classList.add('selected-img');
            expandImgImage.src = selectedImg.style['background-image'].slice(5, -2);
            if (selectedImg.nextElementSibling === null) {
                rightArrow.style.opacity = '0.3';
            } else {
                rightArrow.style.opacity = '1';
            }

            if (selectedImg.previousElementSibling !== null) {
                leftArrow.style.opacity = '1';
            }

            expandImgImage.classList.add('fade-img-right');
            expandImgImage.classList.remove('fade-img-left');
            setTimeout(() => {
                expandImgImage.classList.remove('fade-img-right');
            }, 100);
        }, 200);
    } else {
        return;
    }
}