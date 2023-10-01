const btn = document.querySelector('.btn-new-game');
const playBoard = document.querySelector('.play-board');


btn.addEventListener('click', startGame);

startGame();

function startGame() {
    const plates = document.querySelectorAll('.plate');
    for (let plate of plates) {
        plate.remove();
    }

    const shiftValues = ['0%', '25%', '50%', '75%'];
    playBoard.insertAdjacentHTML('beforeend', `<div class="plate" style="left:${shiftValues[Math.floor(Math.random() * 4)]};top:${shiftValues[Math.floor(Math.random() * 4)]};background-color: aqua;">2</div>`);
    savePlateCoordinates(document.querySelector('.plate'));
}

function makePlate(elem, num) {
    elem.innerHTML = num;
    if (num === 2) {
        elem.style['background-color'] = 'aqua';
    } else if (num === 4) {
        elem.style['background-color'] = 'orange';
    } else if (num === 8) {
        elem.style['background-color'] = 'blue';
    } else if (num === 16) {
        elem.style['background-color'] = 'green';
    } else if (num === 32) {
        elem.style['background-color'] = 'orange';
    } else if (num === 64) {
        elem.style['background-color'] = 'white';
    }
}

function savePlateCoordinates(elem) {
    if (elem.offsetLeft / playBoard.offsetWidth * 100 + '%' === '0%') {
        elem.classList.add('x0');
    } else if (elem.offsetLeft / playBoard.offsetWidth * 100 + '%' === '25%') {
        elem.classList.add('x1');
    } else if (elem.offsetLeft / playBoard.offsetWidth * 100 + '%' === '50%') {
        elem.classList.add('x2');
    } else if (elem.offsetLeft / playBoard.offsetWidth * 100 + '%' === '75%') {
        elem.classList.add('x3');
    }

    if (elem.offsetTop / playBoard.offsetWidth * 100 + '%' === '0%') {
        elem.classList.add('y0');
    } else if (elem.offsetTop / playBoard.offsetWidth * 100 + '%' === '25%') {
        elem.classList.add('y1');
    } else if (elem.offsetTop / playBoard.offsetWidth * 100 + '%' === '50%') {
        elem.classList.add('y2');
    } else if (elem.offsetTop / playBoard.offsetWidth * 100 + '%' === '75%') {
        elem.classList.add('y3');
    }
}

document.addEventListener('keydown', movePlates);

function movePlates(event) {
    
}