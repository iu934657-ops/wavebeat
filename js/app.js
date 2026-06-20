const songs = [
{
    title: "Night Drive",
    artist: "Alex Wave",
    file: "assets/songs/song1.mp3"
},
{
    title: "Cyber Dreams",
    artist: "Ryan Pulse",
    file: "assets/songs/song2.mp3"
},
{
    title: "Ocean Lights",
    artist: "Emma Nova",
    file: "assets/songs/song3.mp3"
},
{
    title: "Electric Pulse",
    artist: "Sophia Blaze",
    file: "assets/songs/song4.mp3"
},
{
    title: "Midnight Echo",
    artist: "WaveBeat Studio",
    file: "assets/songs/song5.mp3"
},
{
    title: "Skyline Beats",
    artist: "Future Bass",
    file: "assets/songs/song6.mp3"
}
];

let currentSong = 0;
let audio = new Audio();

const playBtn = document.getElementById("play-btn");
const nextBtn = document.getElementById("next-btn");
const prevBtn = document.getElementById("prev-btn");
const songTitle = document.getElementById("song-title");
const songArtist = document.querySelector(".song-info p");
const progressBar = document.getElementById("progress-bar");

// -------------------------
// LOAD SONG
// -------------------------
function loadSong(index) {
    audio.src = songs[index].file;
    songTitle.textContent = songs[index].title;
    songArtist.textContent = songs[index].artist;
}

loadSong(currentSong);

// -------------------------
// PLAY / PAUSE
// -------------------------
playBtn.addEventListener("click", () => {
    if (audio.paused) {
        audio.play();
        playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
    } else {
        audio.pause();
        playBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
    }
});

// -------------------------
// NEXT SONG
// -------------------------
nextBtn.addEventListener("click", () => {
    currentSong++;
    if (currentSong >= songs.length) currentSong = 0;

    loadSong(currentSong);
    audio.play();
    playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
});

// -------------------------
// PREVIOUS SONG
// -------------------------
prevBtn.addEventListener("click", () => {
    currentSong--;
    if (currentSong < 0) currentSong = songs.length - 1;

    loadSong(currentSong);
    audio.play();
    playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
});

// -------------------------
// CLICK SONG CARD PLAY
// -------------------------
document.querySelectorAll(".song-card").forEach((card, index) => {
    card.addEventListener("click", (e) => {
        if (e.target.classList.contains("play-song")) {
            currentSong = index;
            loadSong(currentSong);
            audio.play();
            playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
        }
    });
});

// -------------------------
// PROGRESS BAR
// -------------------------
audio.addEventListener("timeupdate", () => {
    if (audio.duration) {
        progressBar.value = (audio.currentTime / audio.duration) * 100;
    }
});

progressBar.addEventListener("input", () => {
    audio.currentTime = (progressBar.value / 100) * audio.duration;
});

// -------------------------
// AUTO NEXT
// -------------------------
audio.addEventListener("ended", () => {
    currentSong++;
    if (currentSong >= songs.length) currentSong = 0;

    loadSong(currentSong);
    audio.play();
});

// -------------------------
// VOLUME CONTROL (NEW)
// -------------------------
let volumeBar = document.createElement("input");
volumeBar.type = "range";
volumeBar.min = "0";
volumeBar.max = "1";
volumeBar.step = "0.01";
volumeBar.value = "0.7";

volumeBar.style.width = "100px";
volumeBar.style.marginLeft = "10px";

document.querySelector(".player-controls").appendChild(volumeBar);

audio.volume = 0.7;

volumeBar.addEventListener("input", () => {
    audio.volume = volumeBar.value;
});

// -------------------------
// HAMBURGER MENU
// -------------------------
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});