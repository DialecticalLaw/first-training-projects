const plates = document.querySelectorAll('.plate');
const btn = document.querySelector('.btn-new-game');

btn.addEventListener('click', startGame);

startGame();

function makePoint(num, elem) {
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

function startGame() {
    for (let plate of plates) {
        plate.innerHTML = '';
        plate.style['background-color'] = '';
    }
    const numRandomPlate = Math.floor(Math.random() * 16);
    makePoint(2, plates[numRandomPlate]);
}

document.addEventListener('keydown', movePoints);

function movePoints(event) {
    if (event.code === 'ArrowRight') {
        
    }
}