const audio0 = document.querySelector('.audio0');
const audio1 = document.querySelector('.audio1');
const audio2 = document.querySelector('.audio2');

const overlay = document.querySelector('.overlay');
const menuCoverImage0 = document.querySelector('.menu-cover-image0');
const menuCoverImage1 = document.querySelector('.menu-cover-image1');
const menuCoverImage2 = document.querySelector('.menu-cover-image2');

const songName = document.querySelector('.song-name');
const lyricsSongName = document.querySelector('.lyrics-song-name');
const lyricsText = document.querySelector('.lyrics-text');

const lyricsIcon = document.querySelector('.lyrics-icon');
const lyricsBlock = document.querySelector('.lyrics-block');
const closeLyricsSvg = document.querySelector('.close-lyrics');

const backwardIcon = document.querySelector('.backward');
const forwardIcon = document.querySelector('.forward');
const continueIcon = document.querySelector('.continue');
const pauseIcon = document.querySelector('.pause');

const progressBar = document.querySelector('.progress-bar');
const activeProgressBar = document.querySelector('.active-progress-bar');

const trackCurrentTimeText = document.querySelector('.current-track-time');
const trackDurationText = document.querySelector('.track-duration');

const allTracks = document.querySelectorAll('.track');

let currentSong = 0;

let switchSongEvent = new Event('switchTrack');

function updateTrackData() {
    setTimeout(() => {
        updateDurationTimeText();
        document.querySelector('.audio' + currentSong).volume = 0.5;
    }, 200);
}

changeSongData();

document.addEventListener('DOMContentLoaded', updateTrackData);

// pause/continue track - start

continueIcon.addEventListener('click', continueTrack);

let currentVolume = 0.5;

function continueTrack() {
    setTimeout(() => {
        document.querySelector('.audio' + currentSong).play();
        document.querySelector('.audio' + currentSong).volume = currentVolume;
        document.querySelector('.audio' + currentSong).addEventListener('timeupdate', updateProgressBarPassive);
        document.querySelector('.audio' + currentSong).addEventListener('timeupdate', updateCurrentTimeText);
        updateDurationTimeText();
        continueIcon.classList.remove('icon-on');
        pauseIcon.classList.add('icon-on');
        document.querySelector('.menu-cover-image' + currentSong).classList.add('menu-cover-image-play');
        lyricsIcon.classList.add('lyrics-icon-on');
        document.querySelector('.audio' + currentSong).addEventListener('ended', nextTrack);
    }, 100);
}

pauseIcon.addEventListener('click', pauseTrack);

function pauseTrack() {
    currentVolume = document.querySelector('.audio' + currentSong).volume;
    document.querySelector('.audio' + currentSong).pause();
    pauseIcon.classList.remove('icon-on');
    continueIcon.classList.add('icon-on');
    lyricsIcon.classList.remove('lyrics-icon-on');
    document.querySelector('.menu-cover-image' + currentSong).classList.remove('menu-cover-image-play');
}

// pause/continue track - end

// switch tracks - start

backwardIcon.addEventListener('click', previousTrack);

function previousTrack() {
    if (document.querySelector('.audio' + currentSong).muted) {
        unmuteMusic();
    }
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
    if (document.querySelector('.audio' + currentSong).muted) {
        unmuteMusic();
    }
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

songName.addEventListener('switchTrack', changeSongData);

function changeSongData() {
    if (currentSong === 0) {
        songName.innerHTML = 'Гореть';
        lyricsSongName.innerHTML = 'Гореть'
        lyricsText.innerHTML = '<p>Зачем кричать, когда никто не слышит</p><p>О чём мы говорим?</p><p>Мне кажется, что мы давно не живы</p><p>Зажглись и потихоньку догорим</p><p>Когда нас много - начинается пожар</p><p>И города похожи на крематорий и базар</p><p>И все привыкли ничего не замечать</p><p>Когда тебя не слышат, для чего кричать?</p><p>&nbsp;</p><p>Мы можем помолчать, мы можем петь</p><p>Стоять или бежать, но всё равно гореть</p><p>Огромный синий кит порвать не может сеть</p><p>Сдаваться или нет, но всё равно гореть</p><p>&nbsp;</p><p>И снова небо замыкает на себя</p><p>Слова и провода</p><p>И снова с неба проливаются на нас</p><p>Ответы и вода</p><p>И если ты вдруг начал что-то понимать</p><p>И от прозрений, захотелось заорать</p><p>Давай, кричи, но тебя могут не понять</p><p>Никто из них не хочет ничего менять!</p><p>&nbsp;</p><p>Ты можешь помолчать, ты можешь петь</p><p>Стоять или бежать, но всё равно гореть</p><p>Огромный синий кит порвать не может сеть</p><p>Сдаваться или нет, но всё равно гореть</p><p>Мы можем помолчать, мы можем петь</p><p>Стоять или бежать, но всё равно гореть</p><p>Гори, но не сжигай - иначе скучно жить</p><p>Гори, но не сжигай! Гори, чтобы светить!</p>';
    } else if (currentSong === 1) {
        songName.innerHTML = 'Лабиринт (live)';
        lyricsSongName.innerHTML = 'Лабиринт (live)'
        lyricsText.innerHTML = '<p>Перегружен мозг</p><p>Переполнен "винт"</p><p>Иду, чтобы идти...</p><p>Лабиринт</p><p>Уже в который раз</p><p>Тебя я обхожу</p><p>И слышу сзади смех</p><p>Но зла я не держу</p><p>&nbsp;</p><p>Ты никогда</p><p>Не спутаешь пути:</p><p>Ты стоишь...</p><p>И, может, так и нужно</p><p>Но как тогда узнать</p><p>Что там выше крыш?</p><p>&nbsp;</p><p>Стены отразят</p><p>Чей-то новый крик - </p><p>Можно не смотреть:</p><p>Там тупик...</p><p>Новый поворот</p><p>Может там ответ</p><p>Но это снова ты...</p><p>Привет</p><p>&nbsp;</p><p>Ты никогда</p><p>Не спутаешь пути</p><p>Ты стоишь...</p><p>И, может, так и нужно</p><p>Но как тогда узнать</p><p>Что там выше крыш?</p>';
    } else if (currentSong === 2) {
        songName.innerHTML = 'Дух времени';
        lyricsSongName.innerHTML = 'Дух времени'
        lyricsText.innerHTML = '<p>Ночь</p><p>Стучит в окно и наступает передышка</p><p>Всё принимаю близко к сердцу, даже слишком</p><p>И до утра</p><p>Будут мелькать</p><p>Страницы сайтов, чашки с кофе, сигареты</p><p>И я не первый кто с тоской и без ответа - </p><p>Она стара...</p><p>И я не знаю</p><p>Какие результаты и проценты</p><p>Видны из окон всех московских телецентров</p><p>И из Кремля</p><p>Но за моим</p><p>Окном два пьяных в жопу человека</p><p>Друг друга бьют уже почти что четверть века</p><p>Из-за рубля...</p><p>&nbsp;</p><p>И на асфальтовых полях</p><p>Зреет только чёрный дым</p><p>И не видно нихрена</p><p>В этой темени...</p><p>Лужи крови и дерьма</p><p>Густо заливает нефть - </p><p>Это просто дух времени!</p><p>Просто дух времени...</p><p>&nbsp;</p><p>Крик</p><p>Не сдержат тонкие панели перекрытий</p><p>И он заставит многих бросить всё и выйти</p><p>Чтоб поглазеть</p><p>В первом ряду</p><p>Обыденно, легко и безучастно</p><p>На драку, на пожар, на боль несчастных</p><p>На чью-то смерть...</p><p>Засними на телефон</p><p>Чей-то стон и стёкол звон</p><p>Продолжает перегон</p><p>Наш отцепленный вагон</p><p>Кто-то спрыгнет на лету</p><p>Но без толку эта паника</p><p>Ведь наш вагон несёт по борту</p><p>Общего для всех "Титаника"!</p><p>&nbsp;</p><p></p><p>Где на асфальтовых полях</p><p>Зреет только чёрный дым</p><p>И не видно нихрена</p><p>В этой темени...</p><p>Лужи крови и дерьма</p><p>Густо заливает нефть - </p><p>Это просто дух времени!</p><p>Просто дух времени...</p><p>&nbsp;</p><p>На асфальтовых полях</p><p>Зреет только чёрный дым</p><p>И не видно нихрена</p><p>В этой темени...</p><p>Лужи крови и дерьма</p><p>Густо заливает нефть - </p><p>Это просто дух времени!</p><p>Просто дух времени...</p>'
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
    if (correctTimeDuration === 'NaN:NaN') {
        setTimeout(() => {
            updateDurationTimeText();
        }, 50);
    } else {
        trackDurationText.innerHTML = correctTimeDuration;
    }
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

// volume - start

const volumeBarBlock = document.querySelector('.volume-bar-block');
const activeVolumeBar = document.querySelector('.active-volume-bar');

const volumeNormal = document.querySelector('.volume-normal');
const volumeMute = document.querySelector('.volume-mute');

volumeBarBlock.addEventListener('click', changeVolume)

function changeVolume(event) {
    const currentTrack = document.querySelector('.audio' + currentSong);
    const clickPosition = event.offsetX;
    const volumeBarWidth = document.querySelector('.volume-bar').clientWidth;
    const activePercent = (clickPosition / volumeBarWidth) * 100;
    if (clickPosition < 0) {
        currentTrack.volume = 0;
        activeVolumeBar.style.width = 0 + '%';
    } else if (clickPosition > 80) {
        currentTrack.volume = 1;
        activeVolumeBar.style.width = 100 + '%';
    } else if (0 < clickPosition && clickPosition < 10) {
        activeVolumeBar.style.width = activePercent + '%';
        currentTrack.volume = Number('0.0' + clickPosition);
    } else {
        activeVolumeBar.style.width = activePercent + '%';
        currentTrack.volume = Number('0.' + clickPosition);
    }
}

volumeNormal.addEventListener('click', muteMusic);
volumeMute.addEventListener('click', unmuteMusic);

function muteMusic() {
    document.querySelector('.audio' + currentSong).muted = true;
    volumeNormal.classList.remove('volume-svg-on');
    volumeMute.classList.add('volume-svg-on');
    volumeBarBlock.style.display = 'none';
}

function unmuteMusic() {
    document.querySelector('.audio' + currentSong).muted = false;
    volumeMute.classList.remove('volume-svg-on');
    volumeNormal.classList.add('volume-svg-on');
    volumeBarBlock.style.display = 'flex';
}

// repeat - start

const repeatIcon = document.querySelector('.repeat');

repeatIcon.addEventListener('click', repeatToggle);

function repeatToggle() {
    if (document.querySelector('.audio' + currentSong).loop !== true) {
        for (let track of allTracks) {
            track.loop = true;
        }
        repeatIcon.style.fill = 'rgb(149, 0, 255)';
    } else {
        for (let track of allTracks) {
            track.loop = false;
        }
        repeatIcon.style.fill = '#ffffff';
    }
}

// repeat - end

// lyrics - start

lyricsIcon.addEventListener('click', toggleLyrics);
closeLyricsSvg.addEventListener('click', toggleLyrics);

function toggleLyrics() {
    if (!lyricsBlock.classList.contains('lyrics-block-on')) {
        lyricsBlock.classList.add('lyrics-block-on');
        setTimeout(() => {
            lyricsBlock.classList.add('lyrics-block-visible');
        }, 10);
    } else {
        lyricsBlock.classList.remove('lyrics-block-visible');
        setTimeout(() => {
            lyricsBlock.classList.remove('lyrics-block-on');
        }, 500);
    }
}
// lyrics - end