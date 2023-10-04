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
    playBoard.insertAdjacentHTML('beforeend', `<div class="plate" style="left: ${shiftValues[Math.floor(Math.random() * 4)]}; top: ${shiftValues[Math.floor(Math.random() * 4)]}; background-color: aqua;">2</div>`);
    savePlateCoordinates(document.querySelector('.plate'));
}

function paintPlate(elem, num) {
    if (num === 4) {
        elem.style['background-color'] = 'orange';
    } else if (num === 8) {
        elem.style['background-color'] = 'blue';
    } else if (num === 16) {
        elem.style['background-color'] = 'green';
    } else if (num === 32) {
        elem.style['background-color'] = 'yellow';
    } else if (num === 64) {
        elem.style['background-color'] = 'black';
    } else if (num === 128) {
        elem.style['background-color'] = 'red';
    } else {
        elem.style['background-color'] = 'purple';
    }
}

function createRandomPlate() {
    let numPlates = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
    const plates = document.querySelectorAll('.plate');

    for (let plate of plates) {
        if (plate.dataset.x === '0' && plate.dataset.y === '0') {
            numPlates = numPlates.filter(item => item !== 0);
        }
        if (plate.dataset.x === '25' && plate.dataset.y === '0') {
            numPlates = numPlates.filter(item => item !== 1);
        }
        if (plate.dataset.x === '50' && plate.dataset.y === '0') {
            numPlates = numPlates.filter(item => item !== 2);
        }
        if (plate.dataset.x === '75' && plate.dataset.y === '0') {
            numPlates = numPlates.filter(item => item !== 3);
        }
        if (plate.dataset.x === '0' && plate.dataset.y === '25') {
            numPlates = numPlates.filter(item => item !== 4);
        }
        if (plate.dataset.x === '25' && plate.dataset.y === '25') {
            numPlates = numPlates.filter(item => item !== 5);
        }
        if (plate.dataset.x === '50' && plate.dataset.y === '25') {
            numPlates = numPlates.filter(item => item !== 6);
        } 
        if (plate.dataset.x === '75' && plate.dataset.y === '25') {
            numPlates = numPlates.filter(item => item !== 7);
        }
        if (plate.dataset.x === '0' && plate.dataset.y === '50') {
            numPlates = numPlates.filter(item => item !== 8);
        }
        if (plate.dataset.x === '25' && plate.dataset.y === '50') {
            numPlates = numPlates.filter(item => item !== 9);
        }
        if (plate.dataset.x === '50' && plate.dataset.y === '50') {
            numPlates = numPlates.filter(item => item !== 10);
        }
        if (plate.dataset.x === '75' && plate.dataset.y === '50') {
            numPlates = numPlates.filter(item => item !== 11);
        }
        if (plate.dataset.x === '0' && plate.dataset.y === '75') {
            numPlates = numPlates.filter(item => item !== 12);
        }
        if (plate.dataset.x === '25' && plate.dataset.y === '75') {
            numPlates = numPlates.filter(item => item !== 13);
        }
        if (plate.dataset.x === '50' && plate.dataset.y === '75') {
            numPlates = numPlates.filter(item => item !== 14);
        }
        if (plate.dataset.x === '75' && plate.dataset.y === '75') {
            numPlates = numPlates.filter(item => item !== 15);
        }
    }


    const randomElemNum = Math.floor(Math.random() * numPlates.length);

    switch (numPlates[randomElemNum]) {
        case 0:
            playBoard.insertAdjacentHTML('beforeend', `<div class="plate" style="left: 0%; top: 0%; background-color: aqua;" data-x="0" data-y="0">2</div>`);
            break;
        case 1:
            playBoard.insertAdjacentHTML('beforeend', `<div class="plate" style="left: 25%; top: 0%; background-color: aqua;" data-x="25" data-y="0">2</div>`);
            break;
        case 2:
            playBoard.insertAdjacentHTML('beforeend', `<div class="plate" style="left: 50%; top: 0%; background-color: aqua;" data-x="50" data-y="0">2</div>`);
            break;
        case 3:
            playBoard.insertAdjacentHTML('beforeend', `<div class="plate" style="left: 75%; top: 0%; background-color: aqua;" data-x="75" data-y="0">2</div>`);
            break;
        case 4:
            playBoard.insertAdjacentHTML('beforeend', `<div class="plate" style="left: 0%; top: 25%; background-color: aqua;" data-x="0" data-y="25">2</div>`);
            break;
        case 5:
            playBoard.insertAdjacentHTML('beforeend', `<div class="plate" style="left: 25%; top: 25%; background-color: aqua;" data-x="25" data-y="25">2</div>`);
            break;
        case 6:
            playBoard.insertAdjacentHTML('beforeend', `<div class="plate" style="left: 50%; top: 25%; background-color: aqua;" data-x="50" data-y="25">2</div>`);
            break;
        case 7:
            playBoard.insertAdjacentHTML('beforeend', `<div class="plate" style="left: 75%; top: 25%; background-color: aqua;" data-x="75" data-y="25">2</div>`);
            break;
        case 8:
            playBoard.insertAdjacentHTML('beforeend', `<div class="plate" style="left: 0%; top: 50%; background-color: aqua;" data-x="0" data-y="50">2</div>`);
            break;
        case 9:
            playBoard.insertAdjacentHTML('beforeend', `<div class="plate" style="left: 25%; top: 50%; background-color: aqua;" data-x="25" data-y="50">2</div>`);
            break;
        case 10:
            playBoard.insertAdjacentHTML('beforeend', `<div class="plate" style="left: 50%; top: 50%; background-color: aqua;" data-x="50" data-y="50">2</div>`);
            break;
        case 11:
            playBoard.insertAdjacentHTML('beforeend', `<div class="plate" style="left: 75%; top: 50%; background-color: aqua;" data-x="75" data-y="50">2</div>`);
            break;
        case 12:
            playBoard.insertAdjacentHTML('beforeend', `<div class="plate" style="left: 0%; top: 75%; background-color: aqua;" data-x="0" data-y="75">2</div>`);
            break;
        case 13:
            playBoard.insertAdjacentHTML('beforeend', `<div class="plate" style="left: 25%; top: 75%; background-color: aqua;" data-x="25" data-y="75">2</div>`);
            break;
        case 14:
            playBoard.insertAdjacentHTML('beforeend', `<div class="plate" style="left: 50%; top: 75%; background-color: aqua;" data-x="50" data-y="75">2</div>`);
            break;
        case 15:
            playBoard.insertAdjacentHTML('beforeend', `<div class="plate" style="left: 75%; top: 75%; background-color: aqua;" data-x="75" data-y="75">2</div>`);
            break;
    }
}

function savePlateCoordinates(elem) {

    if (elem.offsetLeft / playBoard.offsetWidth * 100 + '%' === '0%') {
        elem.dataset.x = '0';
    } else if (elem.offsetLeft / playBoard.offsetWidth * 100 + '%' === '25%') {
        elem.dataset.x = '25';
    } else if (elem.offsetLeft / playBoard.offsetWidth * 100 + '%' === '50%') {
        elem.dataset.x = '50';
    } else if (elem.offsetLeft / playBoard.offsetWidth * 100 + '%' === '75%') {
        elem.dataset.x = '75';
    }

    if (elem.offsetTop / playBoard.offsetWidth * 100 + '%' === '0%') {
        elem.dataset.y = '0';
    } else if (elem.offsetTop / playBoard.offsetWidth * 100 + '%' === '25%') {
        elem.dataset.y = '25';
    } else if (elem.offsetTop / playBoard.offsetWidth * 100 + '%' === '50%') {
        elem.dataset.y = '50';
    } else if (elem.offsetTop / playBoard.offsetWidth * 100 + '%' === '75%') {
        elem.dataset.y = '75';
    }
}

function updatePlateCoordinates(elem) {
    elem.style.left = elem.dataset.x + '%';
    elem.style.top = elem.dataset.y + '%';
}

function movePlate(direction) {
    let horizontal = [];
    let vertical = []

    switch (direction) {
        case 'right':
            for (let i = 0; i <= 75; i += 25) { // creating an array with plates >RIGHT<
                let row = [];
                for (let n = 0; n <= 75; n += 25) {
                    if (document.querySelector(`[data-x="${n}"][data-y="${i}"]`) !== null) {
                        row.push(document.querySelector(`[data-x="${n}"][data-y="${i}"]`));
                    }
                }
                if (row.length) {
                    horizontal.push(row);
                }
            }

            for (let row of horizontal) {
                console.log(row)
                for (let i = row.length - 1; i >= 0; i--) {
                    if (i === row.length - 1) {
                        row[i].dataset.x = '75';
                        updatePlateCoordinates(row[i]);
                    }
                    
                    if (row[i - 1] !== undefined) {
                        if (row[i].innerHTML === row[i - 1].innerHTML) {
                        row[i - 1].dataset.x = row[i].dataset.x;
                        updatePlateCoordinates(row[i - 1]);
                        setTimeout(() => {
                            row[i].innerHTML = Number(row[i].innerHTML) + Number(row[i - 1].innerHTML);
                            paintPlate(row[i], Number(row[i].innerHTML));
                            row[i - 1].remove();
                        }, 200);
                        } else if (row[i].innerHTML !== row[i - 1].innerHTML) {
                            row[i - 1].dataset.x = Number(row[i].dataset.x) - 25;
                            updatePlateCoordinates(row[i - 1]);
                        }
                    }
                }
            }
            break;
        case 'left':
            for (let i = 0; i <= 75; i += 25) { // creating an array with plates >LEFT<
                let row = [];
                for (let n = 0; n <= 75; n += 25) {
                    if (document.querySelector(`[data-x="${n}"][data-y="${i}"]`) !== null) {
                        row.push(document.querySelector(`[data-x="${n}"][data-y="${i}"]`));
                    }
                }
                if (row.length) {
                    horizontal.push(row);
                }
            }
            break;
        case 'up':
            for (let n = 0; n <= 75; n += 25) { // creating an array with plates >UP<
                let column = [];
                for (let i = 0; i <= 75; i += 25) {
                    if (document.querySelector(`[data-x="${i}"][data-y="${n}"]`) !== null) {
                        column.push(document.querySelector(`[data-x="${i}"][data-y="${n}"]`));
                    }
                }
                if (column.length) {
                    vertical.push(column);
                }
            }
            break;
        case 'down':
            for (let n = 0; n <= 75; n += 25) { // creating an array with plates >DOWN<
                let column = [];
                for (let i = 0; i <= 75; i += 25) {
                    if (document.querySelector(`[data-x="${i}"][data-y="${n}"]`) !== null) {
                        column.push(document.querySelector(`[data-x="${i}"][data-y="${n}"]`));
                    }
                }
                if (column.length) {
                    vertical.push(column);
                }
            }
            break;
        default:
            break;
    }
}

document.addEventListener('keydown', playerAction);

function playerAction(event) {
    document.removeEventListener('keydown', playerAction);

    if (event.code === 'ArrowRight') {
        movePlate('right');

        setTimeout(() => {
            createRandomPlate();
            document.addEventListener('keydown', playerAction);
        }, 210);
    } else if (event.code === 'ArrowLeft') {
        movePlate('left');

        setTimeout(() => {
            createRandomPlate();
            document.addEventListener('keydown', playerAction);
        }, 210);
    }
}