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
        leftArrow.setAttribute('style', 'opacity: 0.3; cursor: default;');
    }
    if (selectedImg.nextElementSibling === null) {
        rightArrow.setAttribute('style', 'opacity: 0.3; cursor: default;');
    }
    if (selectedImg.previousElementSibling !== null) {
        leftArrow.setAttribute('style', 'opacity: 1; cursor: pointer;');
    }
    if (selectedImg.nextElementSibling !== null) {
        rightArrow.setAttribute('style', 'opacity: 1; cursor: pointer;');
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
        leftArrow.removeEventListener('click', switchLeft);
        expandImgImage.classList.add('fade-img-right');

        setTimeout(() => {
            selectedImg.classList.remove('selected-img');
            selectedImg = selectedImg.previousElementSibling;
            selectedImg.classList.add('selected-img');
            expandImgImage.src = selectedImg.style['background-image'].slice(5, -2);
            if (selectedImg.previousElementSibling === null) {
                leftArrow.setAttribute('style', 'opacity: 0.3; cursor: default;');
            } else {
                leftArrow.setAttribute('style', 'opacity: 1; cursor: pointer;');
            }
            
            if (selectedImg.nextElementSibling !== null) {
                rightArrow.setAttribute('style', 'opacity: 1; cursor: pointer;');
            }
            
            expandImgImage.classList.add('fade-img-left');
            expandImgImage.classList.remove('fade-img-right');
            setTimeout(() => {
                expandImgImage.classList.remove('fade-img-left');
                leftArrow.addEventListener('click', switchLeft);
            }, 100);
        }, 200);
    } else {
        return;
    }
}

function switchRight() {
    if (selectedImg.nextElementSibling !== null) {
        rightArrow.removeEventListener('click', switchRight);
        expandImgImage.classList.add('fade-img-left');

        setTimeout(() => {
            selectedImg.classList.remove('selected-img');
            selectedImg = selectedImg.nextElementSibling;
            selectedImg.classList.add('selected-img');
            expandImgImage.src = selectedImg.style['background-image'].slice(5, -2);
            if (selectedImg.nextElementSibling === null) {
                rightArrow.setAttribute('style', 'opacity: 0.3; cursor: default;');
            } else {
                rightArrow.setAttribute('style', 'opacity: 1; cursor: pointer;');
            }

            if (selectedImg.previousElementSibling !== null) {
                leftArrow.setAttribute('style', 'opacity: 1; cursor: pointer;');
            }

            expandImgImage.classList.add('fade-img-right');
            expandImgImage.classList.remove('fade-img-left');
            setTimeout(() => {
                expandImgImage.classList.remove('fade-img-right');
                rightArrow.addEventListener('click', switchRight);
            }, 100);
        }, 200);
    } else {
        return;
    }
}

// theme
const header = document.querySelector('header');
const footer = document.querySelector('footer');
const ghName = document.querySelector('.gh-name');
const year = document.querySelector('.year');
const h1 = document.querySelector('h1');
const container = document.querySelector('.container');


const moon = document.querySelector('.moon');
const sun = document.querySelector('.sun');

moon.addEventListener('click', enableLightTheme);
sun.addEventListener('click', enableDarkTheme);

function enableLightTheme() {
    header.setAttribute('style', 'background-image: url(assets/img/lightHeader.jpg); border-bottom: 3px solid rgb(185 160 255); box-shadow: 0 0 30px 5px rgb(150 114 250);');
    footer.setAttribute('style', 'background-image: url(assets/img/lightFooter.jpg); border-top: 3px solid rgb(185 160 255); box-shadow: 0 0 30px 5px rgb(150 114 250)');
    moon.classList.remove('title-img-on');
    sun.classList.add('title-img-on');
    ghName.style.color = 'black'
    year.style.color = 'black';
    github.style.fill = 'black';
    h1.style.color = 'rgb(38 161 1)'
    container.style['background-color'] = 'rgb(241 225 246)';

    for (let img of images) {
        img.style.outline = '1px solid yellow';
    }
}

function enableDarkTheme() {
    header.removeAttribute('style');
    footer.removeAttribute('style');
    moon.classList.add('title-img-on');
    sun.classList.remove('title-img-on');
    ghName.removeAttribute('style');
    year.removeAttribute('style');
    github.style.fill = 'white';
    h1.style.color = '#7dcfb1'
    container.style['background-color'] = 'rgb(35, 44, 57)';

    for (let img of images) {
        img.style.outline = '1px solid #7dcfb1';
    }
}