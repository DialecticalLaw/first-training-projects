console.log('60 / 60')
const playBoard = document.querySelector('.play-board');
const aboutBlock = document.querySelector('.about-block');
const gameInfo = document.querySelector('.game-info');
const scoreCount = document.querySelector('.score-count');
const bestScore = document.querySelector('.best-count');
const defeatWindow = document.querySelector('.defeat-window');
const pastGameStats = document.querySelectorAll('.past-game-stats');
const btnSaveGame = document.querySelector('.btn-save-game');
const btn = document.querySelector('.btn-new-game');

const audioDefeat = document.querySelector('.defeat');
const audioAction = document.querySelector('.action');
const audioStart = document.querySelector('.start');
const audioWin = document.querySelector('.win');
audioDefeat.volume = 0.15;
audioAction.volume = 0.15;
audioStart.volume = 0.15;
audioWin.volume = 0.15;
const volumeUp = document.querySelector('.volume-up');
const volumeOff = document.querySelector('.volume-off');
const volumeAll = document.querySelectorAll('.volume');

let playWinSoundStatus = false;

window.addEventListener('resize', changeSizeOfPlayBoard);
changeSizeOfPlayBoard();

function changeSizeOfPlayBoard() {
    if (document.documentElement.clientWidth >= document.documentElement.clientHeight) {
        playBoard.style.height = '75dvh';
        playBoard.style.width = '75dvh';
        aboutBlock.style.width = '75dvh';
        gameInfo.style.width = '75dvh';
    } else if (document.documentElement.clientWidth < document.documentElement.clientHeight) {
        playBoard.style.height = '75vw';
        playBoard.style.width = '75vw';
        aboutBlock.style.width = '75vw';
        gameInfo.style.width = '75vw';
    }
}

for (let volume of volumeAll) {
    volume.addEventListener('click', function switchVolumeMode() {
        if (audioAction.muted === false) {
            audioDefeat.muted = true;
            audioAction.muted = true;
            audioStart.muted = true;
            volumeUp.classList.remove('volume-on');
            volumeOff.classList.add('volume-on');
        } else {
            audioDefeat.muted = false;
            audioAction.muted = false;
            audioStart.muted = false;
            volumeOff.classList.remove('volume-on');
            volumeUp.classList.add('volume-on');
        }
    });
}

if (localStorage.getItem('max-score') === null) {
    localStorage.clear();
    localStorage.setItem('max-score', '0');
    localStorage.setItem('last-10-games', JSON.stringify(['Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty']));
}

btn.addEventListener('click', startGame);
btn.addEventListener('click', function playStartSound() {
    if (audioStart.currentTime !== 0) {
        audioStart.pause();
        audioStart.currentTime = 0;
        audioStart.play();
    } else {
        audioStart.play();
    }
});

document.addEventListener('DOMContentLoaded', updateStatistic);

function updateStatistic() {
    bestScore.innerHTML = localStorage.getItem('max-score');
    if (!JSON.parse(localStorage.getItem('last-10-games')).length) {
        return;
    } else {
        for (let i = 0; i < 10; i++) {
            pastGameStats[i].innerHTML = JSON.parse(localStorage.getItem('last-10-games'))[i];
        }
    }
}

btnSaveGame.addEventListener('click', saveGame);

function saveGame() {
    const currentPastGames = JSON.parse(localStorage.getItem('last-10-games'));
    currentPastGames.unshift(`${Date().slice(0, 24)} - ${scoreCount.innerHTML} points`);
    currentPastGames.pop();
    localStorage.setItem('last-10-games', JSON.stringify(currentPastGames));
    for (let i = 0; i < 10; i++) {
        if (JSON.parse(localStorage.getItem('last-10-games'))[i]) {
            pastGameStats[i].innerHTML = JSON.parse(localStorage.getItem('last-10-games'))[i];
        }
    }
    document.addEventListener('keydown', playerAction);
    playWinSoundStatus = false;
    playBoard.style.filter = 'none';

    const maxScore = localStorage.getItem('max-score');
    if (Number(scoreCount.innerHTML) > Number(maxScore)) {
        localStorage.setItem('max-score', scoreCount.innerHTML);
        bestScore.innerHTML = scoreCount.innerHTML;
    }

    if (audioStart.currentTime !== 0) {
        audioStart.pause();
        audioStart.currentTime = 0;
        audioStart.play();
    } else {
        audioStart.play();
    }

    scoreCount.innerHTML = '0';
    defeatWindow.classList.remove('defeat-window-appear');
    defeatWindow.classList.remove('defeat-window-on');

    btnSaveGame.classList.remove('btn-on');
    btn.classList.add('btn-on');

    const plates = document.querySelectorAll('.plate');

    for (let plate of plates) {
        plate.remove();
    }

    const shiftValues = ['0%', '25%', '50%', '75%'];
    playBoard.insertAdjacentHTML('beforeend', `<div class="plate" style="left: ${shiftValues[Math.floor(Math.random() * 4)]}; top: ${shiftValues[Math.floor(Math.random() * 4)]}; background-color: aqua;">2</div>`);
    savePlateCoordinates(document.querySelector('.plate'));
}

startGame();

function startGame() {
    if (defeatWindow.classList.contains('defeat-window-on')) {
        defeatWindow.classList.remove('defeat-window-appear');
        defeatWindow.classList.remove('defeat-window-on');
    }

    document.addEventListener('keydown', playerAction);
    playBoard.style.filter = 'none';
    playWinSoundStatus = false;

    if (scoreCount.innerHTML !== '0') {
        const currentPastGames = JSON.parse(localStorage.getItem('last-10-games'));
        currentPastGames.unshift(`${Date().slice(0, 24)} - ${scoreCount.innerHTML} points`);
        currentPastGames.pop();
        localStorage.setItem('last-10-games', JSON.stringify(currentPastGames));
        for (let i = 0; i < 10; i++) {
            if (JSON.parse(localStorage.getItem('last-10-games'))[i]) {
                pastGameStats[i].innerHTML = JSON.parse(localStorage.getItem('last-10-games'))[i];
            }
        }
    }

    const maxScore = localStorage.getItem('max-score');
    if (Number(scoreCount.innerHTML) > Number(maxScore)) {
        localStorage.setItem('max-score', scoreCount.innerHTML);
        bestScore.innerHTML = scoreCount.innerHTML;
    }

    scoreCount.innerHTML = '0';
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
    } else  if (num === 256) {
        elem.style['background-color'] = 'purple';
    } else if (num === 512) {
        elem.style['background-color'] = 'pink';
    } else if (num === 2048) {
        elem.style['background-color'] = 'gold';
        elem.style.filter = 'drop-shadow(0px 0px 16px gold)';
        if (playWinSoundStatus === false) {
            audioWin.play();
            playBoard.style.filter = 'drop-shadow(0 0 10px gold)';
            playWinSoundStatus = true;
        }
    } else if (num === 4096) {
        elem.style['background-color'] = 'white'
        elem.style.color = 'black';
        elem.style.filter = 'none';
    } else if (num === 1024) {
        elem.style['background-color'] = '#136f69';
    } else {
        elem.style['background-color'] = '#465a33';
        elem.style.color = 'white';
    }
}

function createRandomPlate(num, color) {
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
            playBoard.insertAdjacentHTML('beforeend', `<div class="plate" style="left: 0%; top: 0%; background-color: ${color};" data-x="0" data-y="0">${num}</div>`);
            break;
        case 1:
            playBoard.insertAdjacentHTML('beforeend', `<div class="plate" style="left: 25%; top: 0%; background-color: ${color};" data-x="25" data-y="0">${num}</div>`);
            break;
        case 2:
            playBoard.insertAdjacentHTML('beforeend', `<div class="plate" style="left: 50%; top: 0%; background-color: ${color};" data-x="50" data-y="0">${num}</div>`);
            break;
        case 3:
            playBoard.insertAdjacentHTML('beforeend', `<div class="plate" style="left: 75%; top: 0%; background-color: ${color};" data-x="75" data-y="0">${num}</div>`);
            break;
        case 4:
            playBoard.insertAdjacentHTML('beforeend', `<div class="plate" style="left: 0%; top: 25%; background-color: ${color};" data-x="0" data-y="25">${num}</div>`);
            break;
        case 5:
            playBoard.insertAdjacentHTML('beforeend', `<div class="plate" style="left: 25%; top: 25%; background-color: ${color};" data-x="25" data-y="25">${num}</div>`);
            break;
        case 6:
            playBoard.insertAdjacentHTML('beforeend', `<div class="plate" style="left: 50%; top: 25%; background-color: ${color};" data-x="50" data-y="25">${num}</div>`);
            break;
        case 7:
            playBoard.insertAdjacentHTML('beforeend', `<div class="plate" style="left: 75%; top: 25%; background-color: ${color};" data-x="75" data-y="25">${num}</div>`);
            break;
        case 8:
            playBoard.insertAdjacentHTML('beforeend', `<div class="plate" style="left: 0%; top: 50%; background-color: ${color};" data-x="0" data-y="50">${num}</div>`);
            break;
        case 9:
            playBoard.insertAdjacentHTML('beforeend', `<div class="plate" style="left: 25%; top: 50%; background-color: ${color};" data-x="25" data-y="50">${num}</div>`);
            break;
        case 10:
            playBoard.insertAdjacentHTML('beforeend', `<div class="plate" style="left: 50%; top: 50%; background-color: ${color};" data-x="50" data-y="50">${num}</div>`);
            break;
        case 11:
            playBoard.insertAdjacentHTML('beforeend', `<div class="plate" style="left: 75%; top: 50%; background-color: ${color};" data-x="75" data-y="50">${num}</div>`);
            break;
        case 12:
            playBoard.insertAdjacentHTML('beforeend', `<div class="plate" style="left: 0%; top: 75%; background-color: ${color};" data-x="0" data-y="75">${num}</div>`);
            break;
        case 13:
            playBoard.insertAdjacentHTML('beforeend', `<div class="plate" style="left: 25%; top: 75%; background-color: ${color};" data-x="25" data-y="75">${num}</div>`);
            break;
        case 14:
            playBoard.insertAdjacentHTML('beforeend', `<div class="plate" style="left: 50%; top: 75%; background-color: ${color};" data-x="50" data-y="75">${num}</div>`);
            break;
        case 15:
            playBoard.insertAdjacentHTML('beforeend', `<div class="plate" style="left: 75%; top: 75%; background-color: ${color};" data-x="75" data-y="75">${num}</div>`);
            break;
    }
}

function savePlateCoordinates(elem) {

    if (elem.style.left === '0%') {
        elem.dataset.x = '0';
    } else if (elem.style.left === '25%') {
        elem.dataset.x = '25';
    } else if (elem.style.left === '50%') {
        elem.dataset.x = '50';
    } else if (elem.style.left === '75%') {
        elem.dataset.x = '75';
    }

    if (elem.style.top === '0%') {
        elem.dataset.y = '0';
    } else if (elem.style.top === '25%') {
        elem.dataset.y = '25';
    } else if (elem.style.top === '50%') {
        elem.dataset.y = '50';
    } else if (elem.style.top === '75%') {
        elem.dataset.y = '75';
    }
}

let randomElemStatus = new Event('isElemCanBeCreated');
document.addEventListener('isElemCanBeCreated', createNewElem);

function createNewElem() {
    document.removeEventListener('isElemCanBeCreated', createNewElem);
    setTimeout(() => {
        let twoOrFourPercent = Math.floor(Math.random() * 101);
        if (twoOrFourPercent >= 90) {
            createRandomPlate(4, 'orange');
        } else {
            createRandomPlate(2, 'aqua');
        }
        document.addEventListener('isElemCanBeCreated', createNewElem);
    }, 210);
}

function updatePlateCoordinates(elem) {
    if (elem.style.left !== elem.dataset.x + '%' || elem.style.top !== elem.dataset.y + '%') {
        document.dispatchEvent(randomElemStatus);
    }

    elem.style.left = elem.dataset.x + '%';
    elem.style.top = elem.dataset.y + '%';
}

function updateScoreCount(score) {
    scoreCount.innerHTML = (Number(scoreCount.innerHTML) + Number(score)).toString();
}

function movePlate(direction) {
    let horizontal = [];
    let vertical = [];

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
                for (let i = row.length - 1; i >= 0; i--) {
                    if (i === row.length - 1) {
                        row[i].dataset.x = '75';
                        updatePlateCoordinates(row[i]);
                    }
                    
                    if (row[i - 1] !== undefined) {
                        if (row[i].innerHTML === row[i - 1].innerHTML && !row[i].hasAttribute('merging')) {
                        row[i - 1].setAttribute('merging', true);
                        row[i - 1].dataset.x = row[i].dataset.x;
                        updatePlateCoordinates(row[i - 1]);
                        setTimeout(() => {
                            row[i].innerHTML = Number(row[i].innerHTML) + Number(row[i - 1].innerHTML);
                            updateScoreCount(row[i].innerHTML);
                            paintPlate(row[i], Number(row[i].innerHTML));
                            row[i - 1].remove();
                            if (audioAction.currentTime !== 0) {
                                audioAction.pause();
                                audioAction.currentTime = 0;
                                audioAction.play()
                            } else {
                                audioAction.play();
                            }
                        }, 200);
                        } else if (row[i].innerHTML === row[i - 1].innerHTML && row[i].hasAttribute('merging')) {
                            row[i - 1].dataset.x = Number(row[i + 1].dataset.x) - 25;
                            updatePlateCoordinates(row[i - 1]);
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

            for (let row of horizontal) {
                for (let i = 0; i <= 3; i++) {
                    if (i === 0) {
                        row[i].dataset.x = '0';
                        updatePlateCoordinates(row[i]);
                    }
                    
                    if (row[i + 1] !== undefined) {
                        if (row[i].innerHTML === row[i + 1].innerHTML && !row[i].hasAttribute('merging')) {
                        row[i + 1].setAttribute('merging', true);
                        row[i + 1].dataset.x = row[i].dataset.x;
                        updatePlateCoordinates(row[i + 1]);
                        setTimeout(() => {
                            row[i].innerHTML = Number(row[i].innerHTML) + Number(row[i + 1].innerHTML);
                            updateScoreCount(row[i].innerHTML);
                            paintPlate(row[i], Number(row[i].innerHTML));
                            row[i + 1].remove();
                            if (audioAction.currentTime !== 0) {
                                audioAction.pause();
                                audioAction.currentTime = 0;
                                audioAction.play()
                            } else {
                                audioAction.play();
                            }
                        }, 200);
                        } else if (row[i].innerHTML === row[i + 1].innerHTML && row[i].hasAttribute('merging')) {
                            row[i + 1].dataset.x = Number(row[i - 1].dataset.x) + 25;
                            updatePlateCoordinates(row[i + 1]);
                        } else if (row[i].innerHTML !== row[i + 1].innerHTML) {
                            row[i + 1].dataset.x = Number(row[i].dataset.x) + 25;
                            updatePlateCoordinates(row[i + 1]);
                        }
                    }
                }
            }
            break;
        case 'up':
            for (let n = 0; n <= 75; n += 25) { // creating an array with plates >UP<
                let column = [];
                for (let i = 0; i <= 75; i += 25) {
                    if (document.querySelector(`[data-x="${n}"][data-y="${i}"]`) !== null) {
                        column.push(document.querySelector(`[data-x="${n}"][data-y="${i}"]`));
                    }
                }
                if (column.length) {
                    vertical.push(column);
                }
            }

            for (let column of vertical) {
                for (let i = 0; i <= 3; i++) {
                    if (i === 0) {
                        column[i].dataset.y = '0';
                        updatePlateCoordinates(column[i]);
                    }
                    
                    if (column[i + 1] !== undefined) {
                        if (column[i].innerHTML === column[i + 1].innerHTML && !column[i].hasAttribute('merging')) {
                        column[i + 1].setAttribute('merging', true);
                        column[i + 1].dataset.y = column[i].dataset.y;
                        updatePlateCoordinates(column[i + 1]);
                        setTimeout(() => {
                            column[i].innerHTML = Number(column[i].innerHTML) + Number(column[i + 1].innerHTML);
                            updateScoreCount(column[i].innerHTML);
                            paintPlate(column[i], Number(column[i].innerHTML));
                            column[i + 1].remove();
                            if (audioAction.currentTime !== 0) {
                                audioAction.pause();
                                audioAction.currentTime = 0;
                                audioAction.play()
                            } else {
                                audioAction.play();
                            }
                        }, 200);
                        } else if (column[i].innerHTML === column[i + 1].innerHTML && column[i].hasAttribute('merging')) {
                            column[i + 1].dataset.y = Number(column[i - 1].dataset.y) + 25;
                            updatePlateCoordinates(column[i + 1]);
                        } else if (column[i].innerHTML !== column[i + 1].innerHTML) {
                            column[i + 1].dataset.y = Number(column[i].dataset.y) + 25;
                            updatePlateCoordinates(column[i + 1]);
                        }
                    }
                }
            }
            break;
        case 'down':
            for (let n = 0; n <= 75; n += 25) { // creating an array with plates >DOWN<
                let column = [];
                for (let i = 0; i <= 75; i += 25) {
                    if (document.querySelector(`[data-x="${n}"][data-y="${i}"]`) !== null) {
                        column.push(document.querySelector(`[data-x="${n}"][data-y="${i}"]`));
                    }
                }
                if (column.length) {
                    vertical.push(column);
                }
            }

            for (let column of vertical) {
                for (let i = column.length - 1; i >= 0; i--) {
                    if (i === column.length - 1) {
                        column[i].dataset.y = '75';
                        updatePlateCoordinates(column[i]);
                    }
                    
                    if (column[i - 1] !== undefined) {
                        if (column[i].innerHTML === column[i - 1].innerHTML && !column[i].hasAttribute('merging')) {
                        column[i - 1].setAttribute('merging', true);
                        column[i - 1].dataset.y = column[i].dataset.y;
                        updatePlateCoordinates(column[i - 1]);
                        setTimeout(() => {
                            column[i].innerHTML = Number(column[i].innerHTML) + Number(column[i - 1].innerHTML);
                            updateScoreCount(column[i].innerHTML);
                            paintPlate(column[i], Number(column[i].innerHTML));
                            column[i - 1].remove();
                            if (audioAction.currentTime !== 0) {
                                audioAction.pause();
                                audioAction.currentTime = 0;
                                audioAction.play()
                            } else {
                                audioAction.play();
                            }
                        }, 200);
                        } else if (column[i].innerHTML === column[i - 1].innerHTML && column[i].hasAttribute('merging')) {
                            column[i - 1].dataset.y = Number(column[i + 1].dataset.y) - 25;
                            updatePlateCoordinates(column[i - 1]);
                        } else if (column[i].innerHTML !== column[i - 1].innerHTML) {
                            column[i - 1].dataset.y = Number(column[i].dataset.y) - 25;
                            updatePlateCoordinates(column[i - 1]);
                        }
                    }
                }
            }
            break;
        default:
            break;
    }
}

function areAnyMoves() { // lots of repeating code from the movePlates function
    let horizontal = [];
    let vertical = [];

    // check right - start
    for (let i = 0; i <= 75; i += 25) {
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
        for (let i = row.length - 1; i >= 0; i--) {
            if (i === row.length - 1) {
                if (row[i].dataset.x !== '75') {
                    return true;
                }
            }
            
            if (row[i - 1] !== undefined) {
                if (row[i].innerHTML === row[i - 1].innerHTML) {
                    return true;
                } else if (row[i].innerHTML !== row[i - 1].innerHTML) {
                    if (Number(row[i - 1].dataset.x) !== Number(row[i].dataset.x) - 25) {
                        return true;
                    }
                }
            }
        }
    }
    // check right - end
    //check left - start
    for (let i = 0; i <= 75; i += 25) {
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
        for (let i = 0; i <= 3; i++) {
            if (i === 0) {
                if (row[i].dataset.x !== '0') {
                    return true;
                }
            }
            
            if (row[i + 1] !== undefined) {
                if (row[i].innerHTML === row[i + 1].innerHTML) {
                    return true;
                } else if (row[i].innerHTML !== row[i + 1].innerHTML) {
                    if (Number(row[i + 1].dataset.x) !== Number(row[i].dataset.x) + 25) {
                        return true;
                    }
                }
            }
        }
    }
    //check left - end
    //check up - start
    for (let n = 0; n <= 75; n += 25) {
        let column = [];
        for (let i = 0; i <= 75; i += 25) {
            if (document.querySelector(`[data-x="${n}"][data-y="${i}"]`) !== null) {
                column.push(document.querySelector(`[data-x="${n}"][data-y="${i}"]`));
            }
        }
        if (column.length) {
            vertical.push(column);
        }
    }

    for (let column of vertical) {
        for (let i = 0; i <= 3; i++) {
            if (i === 0) {
                if (column[i].dataset.y !== '0') {
                    return true;
                }
            }
            
            if (column[i + 1] !== undefined) {
                if (column[i].innerHTML === column[i + 1].innerHTML) {
                    return true;
                } else if (column[i].innerHTML !== column[i + 1].innerHTML) {
                    if (Number(column[i + 1].dataset.y) !== Number(column[i].dataset.y) + 25) {
                        return true;
                    }
                }
            }
        }
    }
    //check up - end
    //check down - start
    for (let n = 0; n <= 75; n += 25) {
        let column = [];
        for (let i = 0; i <= 75; i += 25) {
            if (document.querySelector(`[data-x="${n}"][data-y="${i}"]`) !== null) {
                column.push(document.querySelector(`[data-x="${n}"][data-y="${i}"]`));
            }
        }
        if (column.length) {
            vertical.push(column);
        }
    }

    for (let column of vertical) {
        for (let i = column.length - 1; i >= 0; i--) {
            if (i === column.length - 1) {
                if (column[i].dataset.y !== '75') {
                    return true;
                }
            }
            
            if (column[i - 1] !== undefined) {
                if (column[i].innerHTML === column[i - 1].innerHTML) {
                    return true;
                } else if (column[i].innerHTML !== column[i - 1].innerHTML) {
                    if (Number(column[i - 1].dataset.y) !== Number(column[i].dataset.y) - 25) {
                        return true;
                    }
                }
            }
        }
    }
    return false;
    //check down - end
}
document.addEventListener('keydown', function preventScroll(event) {
    if (event.code === 'ArrowUp' || event.code === 'ArrowDown') {
        event.preventDefault();
    }
})
document.addEventListener('keydown', playerAction);

function playerAction(event) {
    if (event.code === 'ArrowRight') {
        document.removeEventListener('keydown', playerAction);
        movePlate('right');

        setTimeout(() => {
            if (areAnyMoves() === false) {
                btn.classList.remove('btn-on');
                btnSaveGame.classList.add('btn-on');

                if (audioDefeat.currentTime !== 0) {
                    audioDefeat.pause();
                    audioDefeat.currentTime = 0;
                    audioDefeat.play();
                } else {
                    audioDefeat.play();
                }

                defeatWindow.classList.add('defeat-window-on');
                setTimeout(() => {
                    defeatWindow.classList.add('defeat-window-appear');
                }, 10);
            } else {
                document.addEventListener('keydown', playerAction);
            }
        }, 210);
    } else if (event.code === 'ArrowLeft') {
        document.removeEventListener('keydown', playerAction);
        movePlate('left');

        setTimeout(() => {
            if (areAnyMoves() === false) {
                btn.classList.remove('btn-on');
                btnSaveGame.classList.add('btn-on');

                if (audioDefeat.currentTime !== 0) {
                    audioDefeat.pause();
                    audioDefeat.currentTime = 0;
                    audioDefeat.play();
                } else {
                    audioDefeat.play();
                }

                defeatWindow.classList.add('defeat-window-on');
                setTimeout(() => {
                    defeatWindow.classList.add('defeat-window-appear');
                }, 10);
            } else {
                document.addEventListener('keydown', playerAction);
            }
        }, 210);
    } else if (event.code === 'ArrowUp') {
        document.removeEventListener('keydown', playerAction);
        movePlate('up');

        setTimeout(() => {
            if (areAnyMoves() === false) {
                btn.classList.remove('btn-on');
                btnSaveGame.classList.add('btn-on');

                if (audioDefeat.currentTime !== 0) {
                    audioDefeat.pause();
                    audioDefeat.currentTime = 0;
                    audioDefeat.play();
                } else {
                    audioDefeat.play();
                }

                defeatWindow.classList.add('defeat-window-on');
                setTimeout(() => {
                    defeatWindow.classList.add('defeat-window-appear');
                }, 10);
            } else {
                document.addEventListener('keydown', playerAction);
            }
        }, 210);
    } else if (event.code === 'ArrowDown') {
        document.removeEventListener('keydown', playerAction);
        movePlate('down');

        setTimeout(() => {
            if (areAnyMoves() === false) {
                btn.classList.remove('btn-on');
                btnSaveGame.classList.add('btn-on');

                if (audioDefeat.currentTime !== 0) {
                    audioDefeat.pause();
                    audioDefeat.currentTime = 0;
                    audioDefeat.play();
                } else {
                    audioDefeat.play();
                }

                defeatWindow.classList.add('defeat-window-on');
                setTimeout(() => {
                    defeatWindow.classList.add('defeat-window-appear');
                }, 10);
            } else {
                document.addEventListener('keydown', playerAction);
            }
        }, 210);
    } else {
        return;
    }
}

// touch \/

let x1 = null;
let x2 = null;
let y1 = null;
let y2 = null;

playBoard.addEventListener('touchstart', function name(event) {
    event.preventDefault()
    x1 = event.changedTouches[0].screenX;
    y1 = event.changedTouches[0].screenY;
})

playBoard.addEventListener('touchend', function name(event) {
    event.preventDefault()
    x2 = event.changedTouches[0].screenX;
    y2 = event.changedTouches[0].screenY;
    if (x1 === x2 && y1 === y2) {
        return;
    }
    const minX = Math.min(x1, x2);
    const maxX = Math.max(x1, x2);
    const minY = Math.min(y1, y2);
    const maxY = Math.max(y1, y2);
    if (maxX - minX > maxY - minY) {
        if (x1 > x2) {
            const sendEvent = new KeyboardEvent('keydown', {
                code: 'ArrowLeft'
            })
            document.dispatchEvent(sendEvent);
        } else {
            const sendEvent = new KeyboardEvent('keydown', {
                code: 'ArrowRight'
            })
            document.dispatchEvent(sendEvent);
        }
    } else {
        if (y1 > y2) {
            const sendEvent = new KeyboardEvent('keydown', {
                code: 'ArrowUp'
            })
            document.dispatchEvent(sendEvent);
        } else {
            const sendEvent = new KeyboardEvent('keydown', {
                code: 'ArrowDown'
            })
            document.dispatchEvent(sendEvent);
        }
    }

})