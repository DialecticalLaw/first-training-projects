console.log('Score 200 / 200');

const body = document.body;
const html = document.querySelector('html');

const nav = document.querySelector('.nav');
const burger = document.querySelector('.header_burger');
const navList = document.querySelector('.nav-list');
const header = document.querySelector('.main-header');
const main = document.querySelector('.main-main');
const footer = document.querySelector('.main-footer');

// Burger menu - start

burger.addEventListener('click', e => {
    nav.classList.toggle('active')
    burger.classList.toggle('active')
    body.classList.toggle('lock')
    html.classList.toggle('lock')
});


navList.addEventListener('click', e => {
    nav.classList.remove('active')
    burger.classList.remove('active')
    body.classList.remove('lock')
    html.classList.remove('lock')
});

document.addEventListener('click', e => {
    if (nav && burger && nav.classList.contains('active') && burger.classList.contains('active')) { // закрыть бургер меню при клике вне его области
        if (!nav.contains(e.target) && !burger.contains(e.target)) {
            nav.classList.remove('active')
            burger.classList.remove('active')
            body.classList.remove('lock')
            html.classList.remove('lock')
        }
    } else if (dropMenu.classList.contains('active-drop-menu')) { // закрыть dropMenu при клике вне его области
        if (!iconProfile.contains(e.target)) {
            dropMenu.classList.remove('active-drop-menu');
        }
    } else if (registerMenu.classList.contains('modal-register-menu-on')) { // закрыть register menu при клике вне его области
        if (!registerMenu.contains(e.target) && !closeRegisterSvg.contains(e.target)) {
            registerMenu.classList.remove('modal-register-menu-on');
            registerWrapper.classList.remove('modal-register-wrapper-on');
            registerWrapper.classList.remove('modal-register-wrapper-blackout')
            body.classList.remove('lock')
            html.classList.remove('lock')
        }
    } else if (loginMenu.classList.contains('modal-login-menu-on')) { // закрыть login menu при клике вне его области
        if (!loginMenu.contains(e.target) && !closeLoginSvg.contains(e.target)) {
            loginMenu.classList.remove('modal-login-menu-on');
            loginWrapper.classList.remove('modal-login-wrapper-on');
            loginWrapper.classList.remove('modal-login-wrapper-blackout')
            body.classList.remove('lock')
            html.classList.remove('lock')
        }
}});

// Burger menu - end

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

const pagination = document.querySelectorAll('.pagination');
const paginationAbout = document.querySelector('.PaginationAbout');

const aloneImage = document.querySelectorAll('.AloneImage');
const aboutImage = document.querySelector('.AboutImage');
const aboutCarousel = document.querySelector('.AboutCarousel');

const leftArrow = document.querySelector('.arrow1');
const rightArrow = document.querySelector('.arrow2');

window.addEventListener('resize', (e) => {
    if (body.clientWidth < 1401) {
        location.reload();
    } else if (body.offsetWidth > 1440) {
        location.reload();
    }
    aboutImage.style['margin-left'] = (body.clientWidth - 1400) / 2 + 'px';
})

// Slider About - start

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
    } else if (body.offsetWidth < 1401) {
        if (event.target === pag1) {
            for (let img of aloneImage) {
                const variable = sizeToNumber(img.style.right);
                const variableNew = 0;
                highlightButton(variable, variableNew); 
                img.style.right = 0 + 'px';
            }
        } else if (event.target === pag2) {
            for (let img of aloneImage) {
                const variable = sizeToNumber(img.style.right);
                const variableNew = 475;
                highlightButton(variable, variableNew);
                img.style.right = 475 + 'px';
            }
        } else if (event.target === pag3) {
            for (let img of aloneImage) {
                const variable = sizeToNumber(img.style.right);
                const variableNew = 950;
                highlightButton(variable, variableNew);
                img.style.right = 950 + 'px';
            } 
        } if (event.target === pag4) {
            for (let img of aloneImage) {
                const variable = sizeToNumber(img.style.right);
                const variableNew = 1425;
                highlightButton(variable, variableNew);
                img.style.right = 1425 + 'px';
            }
        } else if (event.target === pag5) {
            for (let img of aloneImage) {
                const variable = sizeToNumber(img.style.right);
                const variableNew = 1900;
                highlightButton(variable, variableNew);
                img.style.right = 1900 + 'px';
            }
        }
    }
})

function sizeToNumber(str) {         // функция для удаления "px" из строки вида "123px" и возвращения числа 123
    return Number(str.slice(0, -2));
}

function highlightButton(oldRight, newRight) {
    if (oldRight === 0) {
        pag1.checked = false;
        leftArrow.classList.remove('DisabledArrow')
    } else if (oldRight === 475) {
        pag2.checked = false;
    } else if (oldRight === 950) {
        pag3.checked = false;
    } else if (oldRight === 1425) {
        pag4.checked = false;
    } else if (oldRight === 1900) {
        pag5.checked = false;
        rightArrow.classList.remove('DisabledArrow')
    }

    if (newRight === 0) {
        pag1.checked = true;
        leftArrow.classList.add('DisabledArrow')
    } else if (newRight === 475) {
        pag2.checked = true;
    } else if (newRight === 950) {
        pag3.checked = true;
    } else if (newRight === 1425) {
        pag4.checked = true;
    } else if (newRight === 1900) {
        pag5.checked = true;
        rightArrow.classList.add('DisabledArrow')
    }
}

aboutCarousel.addEventListener('click', function(event) {
    if (event.target === leftArrow) {
        for (let img of aloneImage) {
            const variable = sizeToNumber(img.style.right);
            const variableNew = variable - 475;
            if (variable === 0) {
                img.style.right = 0 + 'px';
            } else {
                highlightButton(variable, variableNew);
                img.style.right = (variable - 475) + 'px';
            }
        }
    } else if (event.target === rightArrow) {
        for (let img of aloneImage) {
            const variable = sizeToNumber(img.style.right);
            const variableNew = variable + 475;
            if (variable === 1900) {
                img.style.right = 1900 + 'px';
            } else {
                highlightButton(variable, variableNew);
                img.style.right = (variable + 475) + 'px';

            }
        }
    }
})

// Slider About - end

const favSeasons = document.querySelector('.FavoritesSeasons');

const winButton = document.getElementById('Winter')
const sprButton = document.getElementById('Spring')
const sumButton = document.getElementById('Summer')
const autButton = document.getElementById('Autumn')

const winter = document.querySelectorAll('.Winter');
const spring = document.querySelectorAll('.Spring');
const summer = document.querySelectorAll('.Summer');
const autumn = document.querySelectorAll('.Autumn');

// Slider Favorites - start

function reappearance(par, item) {
    if (par === 'show') {
        item.style.display = '';
    } else if (par === 'hide') {
        item.style.display = 'none';
    }
}

function smoothDisplay(item) {
    item.style.opacity = '1'
}

favSeasons.addEventListener('click', function(event) {
    if (event.target === winButton) {
        for (let book of winter) {
            setTimeout(reappearance, 300, 'show', book)
            setTimeout(smoothDisplay, 350, book)
        }
        for (let book of spring) {
            setTimeout(reappearance, 300, 'hide', book)
            book.style.opacity = '0';
        }
        for (let book of summer) {
            setTimeout(reappearance, 300, 'hide', book)
            book.style.opacity = '0';
        }
        for (let book of autumn) {
            setTimeout(reappearance, 300, 'hide', book)
            book.style.opacity = '0';
        }
    }

    if (event.target === sprButton) {
        for (let book of spring) {
            setTimeout(reappearance, 300, 'show', book)
            setTimeout(smoothDisplay, 350, book)
        }
        for (let book of winter) {
            setTimeout(reappearance, 300, 'hide', book)
            book.style.opacity = '0';
        }
        for (let book of summer) {
            setTimeout(reappearance, 300, 'hide', book)
            book.style.opacity = '0';
        }
        for (let book of autumn) {
            setTimeout(reappearance, 300, 'hide', book)
            book.style.opacity = '0';
        }
    }

    if (event.target === sumButton) {
        for (let book of summer) {
            setTimeout(reappearance, 300, 'show', book)
            setTimeout(smoothDisplay, 350, book)
        }
        for (let book of spring) {
            setTimeout(reappearance, 300, 'hide', book)
            book.style.opacity = '0';
        }
        for (let book of autumn) {
            setTimeout(reappearance, 300, 'hide', book)
            book.style.opacity = '0';
        }
        for (let book of winter) {
            setTimeout(reappearance, 300, 'hide', book)
            book.style.opacity = '0';
        }
    }

    if (event.target === autButton) {
        for (let book of autumn) {
            setTimeout(reappearance, 300, 'show', book)
            setTimeout(smoothDisplay, 350, book)
        }
        for (let book of winter) {
            setTimeout(reappearance, 300, 'hide', book)
            book.style.opacity = '0';
        }
        for (let book of spring) {
            setTimeout(reappearance, 300, 'hide', book)
            book.style.opacity = '0';
        }
        for (let book of summer) {
            setTimeout(reappearance, 300, 'hide', book)
            book.style.opacity = '0';
        }
    }
})

// Slider Favorites - end

// drop menu - start

const dropMenu = document.querySelector('.drop-menu-profile');
const iconProfile = document.querySelector('.icon-profile');
const dropMenuActive = document.querySelector('.active-drop-menu');

iconProfile.addEventListener('click', function (event) {
    dropMenu.classList.toggle('active-drop-menu');
})

// open register - start

const openRegisterMenu = document.querySelector('.drop-menu-text2');
const registerMenu = document.querySelector('.modal-register-menu');
const closeRegisterSvg = document.querySelector('.modal-register-svg');
const registerWrapper = document.querySelector('.modal-register-wrapper')
const loginWrapper = document.querySelector('.modal-login-wrapper')
const libraryRegButton = document.querySelector('.library-reg-button')
const libraryLogButton = document.querySelector('.library-log-button')

function toggleClass(item, newClass) {
    item.classList.toggle(newClass);
}

openRegisterMenu.addEventListener('click', function () {
    registerWrapper.classList.toggle('modal-register-wrapper-on');
    setTimeout(toggleClass, 100, registerWrapper, 'modal-register-wrapper-blackout'); 
    setTimeout(toggleClass, 100, registerMenu, 'modal-register-menu-on');
    body.classList.toggle('lock');
    html.classList.toggle('lock');
})

libraryRegButton.addEventListener('click', function () {
    registerWrapper.classList.toggle('modal-register-wrapper-on');
    setTimeout(toggleClass, 100, registerWrapper, 'modal-register-wrapper-blackout');
    setTimeout(toggleClass, 100, registerMenu, 'modal-register-menu-on');
    body.classList.toggle('lock');
    html.classList.toggle('lock');
})

closeRegisterSvg.addEventListener('click', function () {
    registerMenu.classList.remove('modal-register-menu-on');
    registerWrapper.classList.remove('modal-register-wrapper-on');
    registerWrapper.classList.remove('modal-register-wrapper-blackout')
    body.classList.remove('lock');
    html.classList.remove('lock');
})

// open register - end

// open login - start

const openLoginMenu = document.querySelector('.drop-menu-text1');
const loginMenu = document.querySelector('.modal-login-menu');
const closeLoginSvg = document.querySelector('.modal-login-svg');

openLoginMenu.addEventListener('click', function () {
    loginWrapper.classList.toggle('modal-login-wrapper-on');
    setTimeout(toggleClass, 100, loginWrapper, 'modal-login-wrapper-blackout');
    setTimeout(toggleClass, 100, loginMenu, 'modal-login-menu-on');
    body.classList.toggle('lock');
    html.classList.toggle('lock');
})

libraryLogButton.addEventListener('click', function () {
    loginWrapper.classList.toggle('modal-login-wrapper-on');
    setTimeout(toggleClass, 100, loginWrapper, 'modal-login-wrapper-blackout');
    setTimeout(toggleClass, 100, loginMenu, 'modal-login-menu-on');
    body.classList.toggle('lock');
    html.classList.toggle('lock');
})

closeLoginSvg.addEventListener('click', function () {
    loginMenu.classList.remove('modal-login-menu-on');
    loginWrapper.classList.remove('modal-login-wrapper-on');
    loginWrapper.classList.remove('modal-login-wrapper-blackout')
    body.classList.remove('lock');
    html.classList.remove('lock');
})

// open login - end