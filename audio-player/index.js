const audio0 = document.querySelector('.audio0');
const audio1 = document.querySelector('.audio1');
const audio2 = document.querySelector('.audio2');

const overlay = document.querySelector('.overlay');
const menuCoverImage0 = document.querySelector('.menu-cover-image0');
const menuCoverImage1 = document.querySelector('.menu-cover-image1');
const menuCoverImage2 = document.querySelector('.menu-cover-image2');

const songName = document.querySelector('.song-name');

const backwardIcon = document.querySelector('.backward');
const forwardIcon = document.querySelector('.forward');
const continueIcon = document.querySelector('.continue');
const pauseIcon = document.querySelector('.pause');

const progressBar = document.querySelector('.progress-bar');
const activeProgressBar = document.querySelector('.active-progress-bar');

const trackCurrentTime = document.querySelector('.current-time');
const trackDuration = document.querySelector('.track-duration');

let currentSong = 0;

let switchSongEvent = new Event('switchTrack');

// pause/continue track - start

continueIcon.addEventListener('click', continueTrack);

function continueTrack() {
    setTimeout(() => {
       document.querySelector('.audio' + currentSong).play();
        continueIcon.classList.remove('icon-on');
        pauseIcon.classList.add('icon-on');
        document.querySelector('.menu-cover-image' + currentSong).classList.add('menu-cover-image-play'); 
    }, 100);
    
}

pauseIcon.addEventListener('click', pauseTrack);

function pauseTrack() {
    document.querySelector('.audio' + currentSong).pause();
    pauseIcon.classList.remove('icon-on');
    continueIcon.classList.add('icon-on');
    document.querySelector('.menu-cover-image' + currentSong).classList.remove('menu-cover-image-play');
}

// pause/continue track - end

// switch tracks - start

backwardIcon.addEventListener('click', previousTrack);

function previousTrack() {
    document.querySelector('.audio' + currentSong).currentTime = 0;
    pauseTrack();
    document.querySelector('.menu-cover-image-on').classList.remove('menu-cover-image-on');
    if (currentSong - 1 < 0) {
        currentSong = 2;
    } else {
        currentSong -= 1;
    }
    document.querySelector('.menu-cover-image' + currentSong).classList.add('menu-cover-image-on');
    overlay.classList.remove(overlay.classList[1]);
    overlay.classList.add('cover-' + currentSong);
    songName.dispatchEvent(switchSongEvent);
    continueTrack();
}

forwardIcon.addEventListener('click', nextTrack);

function nextTrack() {
    document.querySelector('.audio' + currentSong).currentTime = 0;
    pauseTrack();
    document.querySelector('.menu-cover-image-on').classList.remove('menu-cover-image-on');
    if (currentSong + 1 > 2) {
        currentSong = 0;
    } else {
        currentSong += 1;
    }
    document.querySelector('.menu-cover-image' + currentSong).classList.add('menu-cover-image-on');
    overlay.classList.remove(overlay.classList[1]);
    overlay.classList.add('cover-' + currentSong);
    songName.dispatchEvent(switchSongEvent);
    continueTrack();
}

// switch tracks - end

// change song name - start

songName.addEventListener('switchTrack', changeSongName);

function changeSongName() {
    if (currentSong === 0) {
        songName.innerHTML = 'Гореть';
    } else if (currentSong === 1) {
        songName.innerHTML = 'Лабиринт (live)';
    } else if (currentSong === 2) {
        songName.innerHTML = 'Дух времени';
    }
}

// change song name - end