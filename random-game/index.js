const points = document.querySelectorAll('.point');
const btn = document.querySelector('.btn-new-game');

btn.addEventListener('click', startGame);

function makeNumber(num, elem) {
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
    for (let point of points) {
        point.innerHTML = '';
        point.style['background-color'] = '';
    }
    const numRandomPoint = Math.floor(Math.random() * 16);
    console.log(numRandomPoint)
    makeNumber(2, points[numRandomPoint]);
}