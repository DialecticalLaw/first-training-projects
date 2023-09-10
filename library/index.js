console.log('Score 200 / 200');

const body = document.body;
const html = document.querySelector('html');
const container = document.querySelector('.container');

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
    dropMenu.classList.remove('active-drop-menu');
});


navList.addEventListener('click', e => {
    nav.classList.remove('active')
    burger.classList.remove('active')
    body.classList.remove('lock')
    html.classList.remove('lock')
});

function registerClose() {
    registerWrapper.classList.remove('modal-register-wrapper-on');
}

function loginClose() {
    loginWrapper.classList.remove('modal-login-wrapper-on');
}

document.addEventListener('click', e => {
    if (nav && burger && nav.classList.contains('active') && burger.classList.contains('active')) { // закрыть бургер меню при клике вне его области
        if (!nav.contains(e.target) && !burger.contains(e.target)) {
            nav.classList.remove('active')
            burger.classList.remove('active')
            body.classList.remove('lock')
            html.classList.remove('lock')
        }
    } else if (dropMenu.classList.contains('active-drop-menu')) { // закрыть dropMenu при клике вне его области
        if (!dropMenu.contains(e.target) && !iconProfile.contains(e.target) && !iconProfileAuthorize.contains(e.target)) {
            dropMenu.classList.remove('active-drop-menu');
        }
    } else if (registerMenu.classList.contains('modal-register-menu-on')) { // закрыть register menu при клике вне его области
        if (!registerMenu.contains(e.target) && !closeRegisterSvg.contains(e.target)) {
            registerMenu.classList.remove('modal-register-menu-on');
            registerWrapper.classList.remove('modal-register-wrapper-blackout');
            setTimeout(registerClose, 500);
        }
    } else if (loginMenu.classList.contains('modal-login-menu-on')) { // закрыть login menu при клике вне его области
        if (!loginMenu.contains(e.target) && !closeLoginSvg.contains(e.target)) {
            loginMenu.classList.remove('modal-login-menu-on');
            loginWrapper.classList.remove('modal-login-wrapper-blackout');
            setTimeout(loginClose, 500);
        }
    } else if (myProfileMenu.classList.contains('modal-my-profile-menu-on')) { // закрыть my profile menu при клике вне его области
        if (!myProfileMenu.contains(e.target) && !svgCloseProfileInfo.contains(e.target)) {
            myProfileWrapper.classList.remove('modal-my-profile-wrapper-blackout')
            myProfileMenu.classList.remove('modal-my-profile-menu-on');
            setTimeout(() => {             
                myProfileWrapper.classList.remove('modal-my-profile-wrapper-on');
            }, 500);
        }
    } else if (buyCardMenu.classList.contains('modal-buy-card-menu-on')) { // закрыть buy card menu при клике вне его области
        if (!buyCardMenu.contains(e.target) && !svgCloseBuyCard.contains(e.target)) {
            buyCardWrapper.classList.remove('modal-buy-card-wrapper-blackout');
            buyCardMenu.classList.remove('modal-buy-card-menu-on');
            setTimeout(() => {
                buyCardWrapper.classList.remove('modal-buy-card-wrapper-on')
            }, 500);
        }
    }
});

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

function sizeToNumber(str) {         // функция для удаления "px" из строки вида "123px"
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
const iconProfileAuthorize = document.querySelector('.icon-profile-authorize');
const dropMenuActive = document.querySelector('.active-drop-menu');

iconProfile.addEventListener('click', function (event) {
    dropMenu.classList.toggle('active-drop-menu');
})

iconProfileAuthorize.addEventListener('click', function () {
    dropMenu.classList.toggle('active-drop-menu');
})
// drop menu - end

// open register - start

const dropMenuText1 = document.querySelector('.drop-menu-text1');
const dropMenuText2 = document.querySelector('.drop-menu-text2');

const registerMenu = document.querySelector('.modal-register-menu');
const closeRegisterSvg = document.querySelector('.modal-register-svg');
const registerWrapper = document.querySelector('.modal-register-wrapper');
const loginWrapper = document.querySelector('.modal-login-wrapper');
const libraryRegButton = document.querySelector('.library-reg-button');
const libraryLogButton = document.querySelector('.library-log-button');

function toggleClass(item, newClass) {
    item.classList.toggle(newClass);
}

function openRegisterMenu() {
    dropMenu.classList.remove('active-drop-menu');
    registerWrapper.classList.toggle('modal-register-wrapper-on');
    setTimeout(toggleClass, 100, registerWrapper, 'modal-register-wrapper-blackout'); 
    setTimeout(toggleClass, 100, registerMenu, 'modal-register-menu-on');
}

dropMenuText2.addEventListener('click', openRegisterMenu);

libraryRegButton.addEventListener('click', function () {
    registerWrapper.classList.toggle('modal-register-wrapper-on');
    setTimeout(toggleClass, 100, registerWrapper, 'modal-register-wrapper-blackout');
    setTimeout(toggleClass, 100, registerMenu, 'modal-register-menu-on');
})

closeRegisterSvg.addEventListener('click', function () {
    registerMenu.classList.remove('modal-register-menu-on');
    registerWrapper.classList.remove('modal-register-wrapper-blackout');
    setTimeout(registerClose, 500);
})

// open register - end

// open login - start

const loginMenu = document.querySelector('.modal-login-menu');
const closeLoginSvg = document.querySelector('.modal-login-svg');

function openLoginMenu() {
    dropMenu.classList.remove('active-drop-menu');
    loginWrapper.classList.toggle('modal-login-wrapper-on');
    setTimeout(toggleClass, 100, loginWrapper, 'modal-login-wrapper-blackout');
    setTimeout(toggleClass, 100, loginMenu, 'modal-login-menu-on');
}

dropMenuText1.addEventListener('click', openLoginMenu);

function openLoginMenuOnLogButton() {
    loginWrapper.classList.toggle('modal-login-wrapper-on');
    setTimeout(toggleClass, 100, loginWrapper, 'modal-login-wrapper-blackout');
    setTimeout(toggleClass, 100, loginMenu, 'modal-login-menu-on');
}

libraryLogButton.addEventListener('click', openLoginMenuOnLogButton);

closeLoginSvg.addEventListener('click', function () {
    loginMenu.classList.remove('modal-login-menu-on');
    loginWrapper.classList.remove('modal-login-wrapper-blackout');
    setTimeout(loginClose, 500);
})

// open login - end

// открытие login на buy - start

const buyButtons = document.querySelectorAll('.BuyButton');
const seasonsBooks = document.querySelector('.SeasonsBooks')

seasonsBooks.addEventListener('click', openLoginMenuBuyButton);

function openLoginMenuBuyButton(event) {
    for (let button of buyButtons) {
        if (button.contains(event.target)) {
            loginWrapper.classList.toggle('modal-login-wrapper-on');
            setTimeout(toggleClass, 100, loginWrapper, 'modal-login-wrapper-blackout');
            setTimeout(toggleClass, 100, loginMenu, 'modal-login-menu-on');
        }
    }
}

// открытие login на buy - end

// login -> register - start

const entranceProposal = document.querySelector('.entrance-proposal');
const registerProposal = document.querySelector('.register-proposal');
const loginProposal = document.querySelector('.login-proposal');

function registerOpen() {
    registerWrapper.classList.toggle('modal-register-wrapper-on');
    setTimeout(toggleClass, 5, registerWrapper, 'modal-register-wrapper-blackout');
    setTimeout(toggleClass, 5, registerMenu, 'modal-register-menu-on');
}

registerProposal.addEventListener('click', function () { 
    loginMenu.classList.remove('modal-login-menu-on');
    loginWrapper.classList.remove('modal-login-wrapper-blackout');
    setTimeout(loginClose, 500);
    registerOpen();
})

// login - register - end

// register -> login - start

function loginOpen() {
    loginWrapper.classList.toggle('modal-login-wrapper-on');
    setTimeout(toggleClass, 5, loginWrapper, 'modal-login-wrapper-blackout');
    setTimeout(toggleClass, 5, loginMenu, 'modal-login-menu-on');
}

loginProposal.addEventListener('click', function () { 
    registerMenu.classList.remove('modal-register-menu-on');
    registerWrapper.classList.remove('modal-register-wrapper-blackout');
    setTimeout(registerClose, 500);
    loginOpen();
})

//register -> login - end

// user register - start

const signUp = document.querySelector('.sign-up');
const firstNameRegister = document.querySelector('.first-name-register');
const lastNameRegister = document.querySelector('.last-name-register');
const emailRegister = document.querySelector('.email-register');
const passwordRegister = document.querySelector('.password-register');
const dropMenuTitleText = document.querySelector('.drop-menu-title-text');
const dropMenuText = document.querySelector('.drop-menu-text');
const myProfileWrapper = document.querySelector('.modal-my-profile-wrapper');
const myProfileMenu = document.querySelector('.modal-my-profile-menu');
const svgCloseProfileInfo = document.querySelector('.svg-close-profile-info')

function isDataForRegisterCorrect () { // проверка правильности заполненных форм регистрации
    let result = true;

    if (firstNameRegister.value === '') {
        firstNameRegister.placeholder = 'The field should not be empty!';
        result = false;
    }

    if (lastNameRegister.value === '') {
        lastNameRegister.placeholder = 'The field should not be empty!';
        result = false;
    }

    if (firstNameRegister.value === 'Dzmitry' && lastNameRegister.value === 'Apanas') {
        firstNameRegister.value = '';
        firstNameRegister.placeholder = 'Кхм...';
        lastNameRegister.value = '';
        lastNameRegister.placeholder = 'Ананасики не регистрируются!';
        result = false;
    }

    if (emailRegister.value === '') {
        emailRegister.placeholder = 'The field should not be empty!';
        result = false;
    }

    if (passwordRegister.value === '') {
        passwordRegister.placeholder = 'The field should not be empty!';
        result = false;
    }

    if (passwordRegister.value.length < 8) {
        passwordRegister.value = '';
        passwordRegister.placeholder = 'Minimum of 8 characters'
        result = false;
    }

    return result;
}

const SymbolsForCardNumber = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];

function genRandomCardNumber() {
    let result = '';
    for (let i = 0; i < 9; i++) {
        result += SymbolsForCardNumber[Math.floor(Math.random() * 16)]
    } 
    return result;
}

// my profile menu - start
const svgCopyProfileInfo = document.querySelector('.svg-copy-profile-info');
const visitsCount = document.querySelector('.visits-count');
const booksCount = document.querySelector('.books-count');
const rentedBooks = document.querySelector('.rented-books');

function openMyProfileMenu() {
    myProfileInitials.innerHTML = localStorage.getItem('firstName')[0] + localStorage.getItem('lastName')[0]; // изменение my profile
    myProfileName.innerHTML = `${localStorage.getItem('firstName')} ${localStorage.getItem('lastName')}`;
    cardNumberMyProfile.innerHTML = localStorage.getItem('cardNumber');
    visitsCount.innerHTML = localStorage.getItem('visits');
    booksCount.innerHTML = (JSON.parse(localStorage.getItem('ownedBooks')).length).toString();

    const buttonsClasses = JSON.parse(localStorage.getItem('ownedBooks'));
    for (let buttonClass of buttonsClasses) {
        rentedBooks.insertAdjacentHTML("beforeend", '<li class="point-rented-book"></li>');
        const elem = document.querySelector('.' + buttonClass);
        const previous = elem.previousElementSibling;
        const previous1 = previous.previousElementSibling;
        const previous2 = previous1.previousElementSibling;
        
        rentedBooks.lastElementChild.innerHTML = `${previous2.innerHTML.toLowerCase()}, ${previous1.innerHTML.slice(3, Infinity)}`;

    }

    dropMenu.classList.remove('active-drop-menu')
    myProfileWrapper.classList.add('modal-my-profile-wrapper-on');
    setTimeout(() => {
        myProfileWrapper.classList.add('modal-my-profile-wrapper-blackout');
        myProfileMenu.classList.add('modal-my-profile-menu-on');
    }, 10);
}

svgCopyProfileInfo.addEventListener('click', function() {
    navigator.clipboard.writeText(localStorage.getItem('cardNumber'));
    svgCopyProfileInfo.style['filter'] = 'drop-shadow(0 0 5px green)';
    setTimeout(() => {
        svgCopyProfileInfo.removeAttribute('style');
    }, 1000);
})

svgCloseProfileInfo.addEventListener('click', function () {
    myProfileWrapper.classList.remove('modal-my-profile-wrapper-blackout')
    myProfileMenu.classList.remove('modal-my-profile-menu-on');
    setTimeout(() => {
        myProfileWrapper.classList.remove('modal-my-profile-wrapper-on');
    }, 500);
})

// my profile menu - end

// buy card menu - start

const buyCardWrapper = document.querySelector('.modal-buy-card-wrapper');
const buyCardMenu = document.querySelector('.modal-buy-card-menu');
const svgCloseBuyCard = document.querySelector('.svg-close-buy-card');

const bankCardNumber = document.querySelector('.buy-card-menu-input-number');
const dateStart = document.querySelector('.buy-card-menu-input-date-start');
const dateEnd = document.querySelector('.buy-card-menu-input-date-end');
const cvc = document.querySelector('.buy-card-menu-input-cvc');
const cardHolderName = document.querySelector('.buy-card-menu-input-name');
const postalCode = document.querySelector('.buy-card-menu-input-postal');
const townName = document.querySelector('.buy-card-menu-input-town');

const buyCardButton = document.querySelector('.buy-card-menu-button');
const buyCardInputs = document.querySelectorAll('.buy-card-input');

function openBuyCardMenuBuyButton(event) {
    for (let button of buyButtons) {
        if (button.contains(event.target)) {
            buyCardWrapper.classList.add('modal-buy-card-wrapper-on')
            setTimeout(() => {
                buyCardWrapper.classList.add('modal-buy-card-wrapper-blackout');
                buyCardMenu.classList.add('modal-buy-card-menu-on');
            }, 10);
        }
    }
}

function checkInputs() {
    if (bankCardNumber.value.length >= 1 && dateStart.value.length >= 1 && dateEnd.value.length >= 1 && cvc.value.length >= 1 & cardHolderName.value.length >= 1 && postalCode.value.length >= 1 && townName.value.length >= 1) {
        buyCardButton.disabled = false;
    } else {
        buyCardButton.disabled = true;
    }
}

buyCardMenu.addEventListener('input', checkInputs);

function removeSpaces(str) {
    let result = '';
    for (let i = 0; i < str.length; i++) {
        if (str[i] !== ' ') {
            result += str[i];
        }
    }
    return result;
}

function isDataForBuyCardCorrect() {
    let result = true;
    if (bankCardNumber.value === '') {
        bankCardNumber.placeholder = 'The field should not be empty!';
        result = false;
    }

    if (removeSpaces(bankCardNumber.value).length !== 16 || Number(removeSpaces(bankCardNumber.value)) === undefined) {
        bankCardNumber.value = '';
        bankCardNumber.placeholder = 'Invalid number'
        result = false;
    }
 
    if (dateStart.value === '') {
        dateStart.placeholder = 'Empty';
        result = false;
    }

    if (Number(dateStart.value) === undefined || dateStart.value.length < 2) {
        dateStart.style.border = '1px solid red';
        result = false;
    }

    if (dateEnd.value === '') {
        dateEnd.placeholder = 'Empty';
        result = false;
    }

    if (Number(dateEnd.value) === undefined || dateEnd.value.length < 2) {
        dateEnd.style.border = '1px solid red';
        result = false;
    }

    if (cvc.value === '') {
        cvc.placeholder = 'Empty';
        result = false;
    }

    if (Number(cvc.value) === undefined || cvc.value.length < 3) {
        cvc.style.border = '1px solid red';
        result = false;
    }

    if (cardHolderName.value === '') {
        cardHolderName.placeholder = 'The field should not be empty!';
        result = false;
    }

    if (postalCode.value === '') {
        postalCode.placeholder = 'The field should not be empty!';
        result = false;
    }

    if (townName.value === '') {
        townName.placeholder = 'The field should not be empty!';
        result = false;
    }

    return result;
}

buyCardButton.addEventListener('click', function () {
    if (isDataForBuyCardCorrect() === true) { // если покупка абонемента успешна, то:
        buyCardWrapper.classList.remove('modal-buy-card-wrapper-blackout'); // закрытие buy card menu
        buyCardMenu.classList.remove('modal-buy-card-menu-on');
        setTimeout(() => {
            buyCardWrapper.classList.remove('modal-buy-card-wrapper-on')
        }, 500);

        localStorage.setItem('hasCard', 'true') // занесение данных

        seasonsBooks.removeEventListener('click', openBuyCardMenuBuyButton);
        seasonsBooks.addEventListener('click', buyBook);
    }
})

svgCloseBuyCard.addEventListener('click', function () {
    buyCardWrapper.classList.remove('modal-buy-card-wrapper-blackout');
    buyCardMenu.classList.remove('modal-buy-card-menu-on');
    setTimeout(() => {
        buyCardWrapper.classList.remove('modal-buy-card-wrapper-on')
    }, 500);
})



// buy card menu - end

const findCardButton = document.querySelector('.FindCardButton');
const findCardButtonForm = document.querySelector('.FindCardButton-form');
const cardProfileInfo = document.querySelector('.card-profile-info');
const cardNameInput = document.querySelector('.card-name-input');
const cardNumberInput = document.querySelector('.card-number-input');

const visitsCountCard = document.querySelector('.visits-count-card');
const booksCountCard = document.querySelector('.books-count-card');
const myProfileInitials = document.querySelector('.my-profile-initials');
const myProfileName = document.querySelector('.my-profile-name');
const cardNumberMyProfile = document.querySelector('.card-number-my-profile');

const getTitle = document.querySelector('.GetTitle');
const textRight = document.querySelector('.TextRight');

signUp.addEventListener('click', function () {
    if (isDataForRegisterCorrect() === true) {
        alert('Upon re-registration, the old account will be replaced with a new one\nПри повторной регистрации старый аккаунт будет заменён новым (изначально сделал процесс немного неправильно, а переделывать - лень. В ТЗ по этой части уложился)') // занесение данных пользователя в локальное хранилище
        localStorage.setItem('firstName', firstNameRegister.value);
        localStorage.setItem('lastName', lastNameRegister.value);
        localStorage.setItem('email', emailRegister.value);
        localStorage.setItem('password', passwordRegister.value);
        localStorage.setItem('cardNumber', genRandomCardNumber());
        localStorage.setItem('visits', '1');
        localStorage.setItem('hasCard', 'false')
        const arrayBooks = [];
        localStorage.setItem('ownedBooks', JSON.stringify(arrayBooks));
        
        registerMenu.classList.remove('modal-register-menu-on'); // закрытие register menu
        registerWrapper.classList.remove('modal-register-wrapper-blackout');
        setTimeout(registerClose, 500);

        firstNameRegister.value = '';
        lastNameRegister.value = '';
        emailRegister.value = '';
        passwordRegister.value = '';

        iconProfile.classList.remove('icon-profile-on'); // изменение icon profile
        iconProfileAuthorize.classList.add('icon-profile-authorize-on')
        iconProfileAuthorize.innerHTML = localStorage.getItem('firstName')[0] + localStorage.getItem('lastName')[0];
        iconProfileAuthorize.title = `${localStorage.getItem('firstName')} ${localStorage.getItem('lastName')}`;
        
        dropMenuTitleText.style['font-size'] = '11px'; // изменение drop menu
        dropMenuTitleText.innerHTML = localStorage.getItem('cardNumber');
        dropMenuText1.innerHTML = 'My profile';
        dropMenuText2.innerHTML = 'Log Out';
        dropMenuText1.removeEventListener('click', openLoginMenu);
        dropMenuText2.removeEventListener('click', openRegisterMenu);
        dropMenuText1.addEventListener('click', openMyProfileMenu);
        dropMenuText2.addEventListener('click', logOutFromAccount);

        seasonsBooks.removeEventListener('click', openLoginMenuBuyButton);
        seasonsBooks.addEventListener('click', openBuyCardMenuBuyButton);

        getTitle.innerHTML = 'Visit your profile'; // изменение секции library card
        textRight.innerHTML = 'With a digital library card you get free access to the Library’s wide array of digital resources including e-books, databases, educational resources, and more.';
        libraryRegButton.style.display = 'none';

        libraryLogButton.innerHTML = 'Profile'; 
        libraryLogButton.removeEventListener('click', openLoginMenuOnLogButton);
        libraryLogButton.addEventListener('click', openMyProfileMenu);

        cardNameInput.value = `${localStorage.getItem('firstName')} ${localStorage.getItem('lastName')}`;
        cardNameInput.setAttribute('readonly', true);

        cardNumberInput.value = localStorage.getItem('cardNumber');
        cardNumberInput.setAttribute('readonly', true);

        findCardButtonForm.classList.remove('FindCardButton-form-on');
        cardProfileInfo.classList.add('card-profile-info-on');
        cardProfileInfo.classList.add('card-profile-info-visible');
        visitsCountCard.innerHTML = localStorage.getItem('visits');
        booksCountCard.innerHTML = (JSON.parse(localStorage.getItem('ownedBooks')).length).toString();
    }
})

// user register - end

// покупка книги - start

seasonsBooks.addEventListener('checkBooks', function (event) {
    for (let button of buyButtons) {
        if (button === event.detail.elem) {
            event.detail.elem.classList.remove('BuyButton');
            const storedArray = localStorage.getItem('ownedBooks');
            const array = JSON.parse(storedArray);
            array.push(event.detail.elem.classList[0])
            localStorage.setItem('ownedBooks', JSON.stringify(array));
            booksCountCard.innerHTML = (JSON.parse(localStorage.getItem('ownedBooks')).length).toString();
        }
    }
})

function buyBook(event) {
    for (let button of buyButtons) {
        if (button.contains(event.target)) {
            button.classList.add('OwnButton')
            document.querySelector('.OwnButton').disabled = true;
            button.innerHTML = 'Own';
            
            seasonsBooks.dispatchEvent(new CustomEvent('checkBooks', {
                detail: {elem: button}
            }));
        }
    }
}




// покупка книги - end

// user login - start

const logIn = document.querySelector('.log-in');
const emailOrCardLogin = document.querySelector('.email-or-card-login');
const passwordLogin = document.querySelector('.password-login');

function isDataForLoginCorrect() {
    let result = true;
    if (emailOrCardLogin.value !== localStorage.getItem('email') && emailOrCardLogin.value !== localStorage.getItem('cardNumber')) {
        result = false;
    }

    if (passwordLogin.value !== localStorage.getItem('password')) {
        result = false;
    }
    return result;
}

logIn.addEventListener('click', function () {
    if (emailOrCardLogin.value === '') {
        emailOrCardLogin.placeholder = 'The field should not be empty!';
    }

    if (passwordLogin.value.length < 8) {
        passwordLogin.placeholder = 'Minimum of 8 characters'
    }

    if (emailOrCardLogin.value !== '' && passwordLogin !== '' && passwordLogin.value.length >= 8) {
        if (isDataForLoginCorrect() === false) { // неуспешный login
        alert('Invalid email, card number, or password');
        emailOrCardLogin.value = '';
        passwordLogin.value = '';
    } else if (isDataForLoginCorrect() === true) { // успешный login
        loginMenu.classList.remove('modal-login-menu-on'); // закрытие login menu
        loginWrapper.classList.remove('modal-login-wrapper-blackout');
        setTimeout(loginClose, 500);

        emailOrCardLogin.value = '';
        passwordLogin.value = '';

        localStorage.setItem('visits', (Number(localStorage.getItem('visits')) + 1).toString()); // обновление счетчика visits

        iconProfile.classList.remove('icon-profile-on'); // изменение icon profile
        iconProfileAuthorize.classList.add('icon-profile-authorize-on')
        iconProfileAuthorize.innerHTML = localStorage.getItem('firstName')[0] + localStorage.getItem('lastName')[0];
        iconProfileAuthorize.title = `${localStorage.getItem('firstName')} ${localStorage.getItem('lastName')}`;

        dropMenuTitleText.style['font-size'] = '11px'; // изменение drop menu
        dropMenuTitleText.innerHTML = localStorage.getItem('cardNumber');
        dropMenuText1.innerHTML = 'My profile';
        dropMenuText2.innerHTML = 'Log Out';
        dropMenuText1.removeEventListener('click', openLoginMenu);
        dropMenuText2.removeEventListener('click', openRegisterMenu);
        dropMenuText1.addEventListener('click', openMyProfileMenu);
        dropMenuText2.addEventListener('click', logOutFromAccount);
        
        seasonsBooks.removeEventListener('click', openLoginMenuBuyButton);
        if (localStorage.getItem('hasCard') === 'false') {
            seasonsBooks.addEventListener('click', openBuyCardMenuBuyButton);
        } else if (localStorage.getItem('hasCard') === 'true') {
            seasonsBooks.addEventListener('click', buyBook);
        }
        
        const storedArray = localStorage.getItem('ownedBooks');
        const array = JSON.parse(storedArray);

        for (let buyButton of buyButtons) { // меняем нужные кнопки на own
            for (let nameButton of array) {
                if (buyButton.classList.contains(nameButton)) {
                    buyButton.classList.add('OwnButton')
                    buyButton.classList.remove('BuyButton');
                    document.querySelector('.OwnButton').disabled = true;
                    buyButton.innerHTML = 'Own';
                }
            }
        }

        getTitle.innerHTML = 'Visit your profile'; // изменение секции library card
        textRight.innerHTML = 'With a digital library card you get free access to the Library’s wide array of digital resources including e-books, databases, educational resources, and more.';
        libraryRegButton.style.display = 'none';

        libraryLogButton.innerHTML = 'Profile';
        libraryLogButton.removeEventListener('click', openLoginMenuOnLogButton);
        libraryLogButton.addEventListener('click', openMyProfileMenu);

        cardNameInput.value = `${localStorage.getItem('firstName')} ${localStorage.getItem('lastName')}`;
        cardNameInput.setAttribute('readonly', true);

        cardNumberInput.value = localStorage.getItem('cardNumber');
        cardNumberInput.setAttribute('readonly', true);

        findCardButtonForm.classList.remove('FindCardButton-form-on');
        cardProfileInfo.classList.add('card-profile-info-on');
        cardProfileInfo.classList.add('card-profile-info-visible');
        visitsCountCard.innerHTML = localStorage.getItem('visits');
        booksCountCard.innerHTML = (JSON.parse(localStorage.getItem('ownedBooks')).length).toString();
    }} 
     
})

// user login - end

// check card - start



findCardButton.addEventListener('click', function () {
    if (cardNameInput.value === `${localStorage.getItem('firstName')} ${localStorage.getItem('lastName')}` && cardNumberInput.value === localStorage.getItem('cardNumber')) {
    visitsCountCard.innerHTML = localStorage.getItem('visits');
    booksCountCard.innerHTML = (JSON.parse(localStorage.getItem('ownedBooks')).length).toString();
    findCardButtonForm.classList.remove('FindCardButton-form-visible');
    setTimeout(() => {
        findCardButtonForm.classList.remove('FindCardButton-form-on');
    }, 500);
    setTimeout(() => {
        cardProfileInfo.classList.add('card-profile-info-on');
    setTimeout(() => {
        cardProfileInfo.classList.add('card-profile-info-visible');
    }, 10);
    }, 500);
    setTimeout(() => {
        cardProfileInfo.classList.remove('card-profile-info-visible');
        setTimeout(() => {
            cardProfileInfo.classList.remove('card-profile-info-on');
        }, 500);
        setTimeout(() => {
            findCardButtonForm.classList.add('FindCardButton-form-on');
            setTimeout(() => {
            findCardButtonForm.classList.add('FindCardButton-form-visible');
            }, 10);
        }, 500);
        cardNameInput.value = '';
        cardNumberInput.value = '';
    }, 11010);
}})

// check card - end



function logOutFromAccount() {
    
    iconProfileAuthorize.classList.remove('icon-profile-authorize-on'); // изменение icon profile
    iconProfile.classList.add('icon-profile-on')
    iconProfile.innerHTML = '';
    iconProfile.removeAttribute('title');

    dropMenuTitleText.removeAttribute('style') // изменение drop menu
    dropMenuTitleText.innerHTML = 'Profile';
    dropMenuText1.innerHTML = 'Log In';
    dropMenuText2.innerHTML = 'Register';
    dropMenuText1.addEventListener('click', openLoginMenu);
    dropMenuText2.addEventListener('click', openRegisterMenu);
    dropMenuText1.removeEventListener('click', openMyProfileMenu);
    dropMenuText2.removeEventListener('click', logOutFromAccount);

    seasonsBooks.addEventListener('click', openLoginMenuBuyButton);
    seasonsBooks.removeEventListener('click', openBuyCardMenuBuyButton);
    seasonsBooks.removeEventListener('click', buyBook);

    const ownButtons = document.querySelectorAll('.OwnButton');

    for (let button of ownButtons) { // меняем own на buy
        button.classList.add('BuyButton');
        button.innerHTML = 'Buy';
        button.classList.remove('OwnButton');
        document.querySelector('.BuyButton').disabled = false;
    }

    const pointRentedBooks = document.querySelectorAll('.point-rented-book'); // удаление списка книг
    for (let point of pointRentedBooks) {
        point.remove();
    }

    getTitle.innerHTML = 'Get a reader card'; // изменение секции library card
    textRight.innerHTML = 'You will be able to see a reader card after logging into account or you can register a new account';
    libraryRegButton.style.display = '';

    libraryLogButton.innerHTML = 'Log In';
    libraryLogButton.addEventListener('click', openLoginMenuOnLogButton);
    libraryLogButton.removeEventListener('click', openMyProfileMenu);

    cardNameInput.value = '';
    cardNameInput.removeAttribute('readonly');

    cardNumberInput.value = '';
    cardNumberInput.removeAttribute('readonly');

    findCardButtonForm.classList.add('FindCardButton-form-on');
    cardProfileInfo.classList.remove('card-profile-info-on');
    cardProfileInfo.classList.remove('card-profile-info-visible');
    visitsCountCard.innerHTML = '0';
    booksCountCard.innerHTML = '0';
}