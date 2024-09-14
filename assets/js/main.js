const audio = new Audio();
const toggle = document.querySelector('.m-radio__toggle');
const artistElement = document.querySelector('.m-radio__artist');
const titleElement = document.querySelector('.m-radio__title');
const coverElement = document.querySelector('.m-radio__cover');
const presenterName = document.querySelector('.m-radio__presenter-name');
const azuraApiUrl = "https://radio.trucksim.fm/api/nowplaying/1";
const toggleIcon = document.querySelector('.m-radio__toggle i');
let playing = false;

toggle.addEventListener('click', (e) => {
    if (playing) {
        audio.src = null;
        toggleIcon.classList.remove('fa-pause');
        toggleIcon.classList.add('fa-play');

        playing = false;
    } else {
        audio.src = "https://radio.trucksim.fm:8000/radio.mp3";
        audio.play();
        toggleIcon.classList.add('fa-pause');
        toggleIcon.classList.remove('fa-play');

        playing = true;
    }
});

const fetchData = () => {
    window.fetch(azuraApiUrl)
        .then((response) => {
            return response.json();
        })
        .then((json) => {
            artistElement.textContent = json.now_playing.song.artist;
            titleElement.textContent = json.now_playing.song.title;
            coverElement.src = json.now_playing.song.art;

            presenterName.textContent = json.live.streamer_name || "AutoDJ";
        })
}

fetchData();
setInterval(fetchData, 10000)