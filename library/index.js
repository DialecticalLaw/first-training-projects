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
    })
};

if (nav && burger) {
    navList.addEventListener('click', e => {
        nav.classList.remove('active')
        burger.classList.remove('active')
        body.classList.remove('lock')
    })
};

if (nav && burger) {
    main.addEventListener('click', e => {
        nav.classList.remove('active')
        burger.classList.remove('active')
        body.classList.remove('lock')
    })
};

document.addEventListener('click', e => {
    if (nav && burger && nav.classList.contains('active') && burger.classList.contains('active')) {
        if (!nav.contains(e.target) && !burger.contains(e.target)) {
            nav.classList.remove('active')
            burger.classList.remove('active')
            body.classList.remove('lock')
        }
    }
});