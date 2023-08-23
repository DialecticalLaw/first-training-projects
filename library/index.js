console.log('Score 200 / 200');
const html = document.querySelector('html');
const nav = document.querySelector('.nav');
const burger = document.querySelector('.header_burger');
const navList = document.querySelector('.nav-list');
const header = document.querySelector('.main-header');
const main = document.querySelector('.main-main');
const footer = document.querySelector('.main-footer');
const body = document.body;

if (nav && burger) {
    burger.addEventListener('click', e => {
        nav.classList.toggle('active')
        burger.classList.toggle('active')
        body.classList.toggle('lock')
        html.classList.toggle('lock')
    })
};

if (nav && burger) {
    navList.addEventListener('click', e => {
        nav.classList.remove('active')
        burger.classList.remove('active')
        body.classList.remove('lock')
        html.classList.remove('lock')
    })
};

if (nav && burger) {
    main.addEventListener('click', e => {
        nav.classList.remove('active')
        burger.classList.remove('active')
        body.classList.remove('lock')
        html.classList.remove('lock')
    })
};

document.addEventListener('click', e => {
    if (nav && burger && nav.classList.contains('active') && burger.classList.contains('active')) {
        if (!nav.contains(e.target) && !burger.contains(e.target)) {
            nav.classList.remove('active')
            burger.classList.remove('active')
            body.classList.remove('lock')
            html.classList.remove('lock')
        }
    }
});

const aloneImage = document.querySelectorAll('.AloneImage');
const leftArrow = document.querySelector('.arrow1');
const rightArrow = document.querySelectorAll('.arrow2');

const image1 = document.querySelector('.Image1');
const image2 = document.querySelector('.Image2');
const image3 = document.querySelector('.Image3');
const image4 = document.querySelector('.Image4');
const image5 = document.querySelector('.Image5');

const pag1 = document.querySelector('.pag1');
const pag2 = document.querySelector('.pag2');
const pag3 = document.querySelector('.pag3');
const pag4 = document.querySelector('.pag4');
const pag5 = document.querySelector('.pag5');

const lab1 = document.querySelector('.lab1');
const lab2 = document.querySelector('.lab2');
const lab3 = document.querySelector('.lab3');
const lab4 = document.querySelector('.lab4');
const lab5 = document.querySelector('.lab5');

const pagination = document.querySelector('.pagination');
const paginationAbout = document.querySelector('.PaginationAbout');

const aboutImage = document.querySelector('.AboutImage');

window.addEventListener('resize', (e) => {
    if (body.clientWidth < 1401) {
        return;
    }
    aboutImage.style['margin-left'] = (body.clientWidth - 1400) / 2 + 'px';
})

paginationAbout.addEventListener('click', function(event) {
    if (body.offsetWidth > 1400) {
        if (event.target === pag1) {
            for (let img of aloneImage) {
                img.style.right = 0 + 'px';
            }
        } else if (event.target === pag2) {
            for (let img of aloneImage) {
                img.style.right = 475 + 'px';
            }
        } else if (event.target === pag3) {
            for (let img of aloneImage) {
                img.style.right = 950 + 'px';
            }
        }
    }
})