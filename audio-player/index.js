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

const trackCurrentTimeText = document.querySelector('.current-track-time');
const trackDurationText = document.querySelector('.track-duration');

let currentSong = 0;

let switchSongEvent = new Event('switchTrack');

function updateTrackDurationData() {
    setTimeout(() => {
        updateDurationTimeText();
    }, 200);
}

document.addEventListener('DOMContentLoaded', updateTrackDurationData);

// pause/continue track - start

continueIcon.addEventListener('click', continueTrack);

function continueTrack() {
    setTimeout(() => {
        document.querySelector('.audio' + currentSong).play();
        document.querySelector('.audio' + currentSong).addEventListener('timeupdate', updateProgressBarPassive);
        document.querySelector('.audio' + currentSong).addEventListener('timeupdate', updateCurrentTimeText);
        updateDurationTimeText();
        continueIcon.classList.remove('icon-on');
        pauseIcon.classList.add('icon-on');
        document.querySelector('.menu-cover-image' + currentSong).classList.add('menu-cover-image-play');
        document.querySelector('.audio' + currentSong).addEventListener('ended', nextTrack);
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

// progress bar - start

progressBar.addEventListener('click', updateProgressBarOnClick);

function convertTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time - (minutes * 60));
    if (seconds < 10) {
        return `${minutes}:0${seconds}`
    } else {
        return `${minutes}:${seconds}`;
    }
}

function updateDurationTimeText() { // max track's time
    const currentTrack = document.querySelector('.audio' + currentSong);
    const correctTimeDuration = convertTime(currentTrack.duration);
    trackDurationText.innerHTML = correctTimeDuration;
}

function updateCurrentTimeText() { // current time text
    const currentTrack = document.querySelector('.audio' + currentSong);
    const audioPosition = currentTrack.currentTime;
    trackCurrentTimeText.innerHTML = convertTime(audioPosition);
}

function updateProgressBarPassive() {
    const trackDuration = document.querySelector('.audio' + currentSong).duration;
    const trackCurrentTime = document.querySelector('.audio' + currentSong).currentTime;
    activeProgressBar.style.width = (trackCurrentTime / trackDuration) * 100 + '%';
}

function updateProgressBarOnClick(event) {
    if (document.querySelector('.audio' + currentSong).paused) {
        continueTrack();
    }

    document.querySelector('.audio' + currentSong).currentTime = (event.offsetX / progressBar.clientWidth) * document.querySelector('.audio' + currentSong).duration;
}

// progress bar - end