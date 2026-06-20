document.addEventListener("DOMContentLoaded", () => {

    let audio = new Audio();
    let currentIndex = -1;

    const songs = [
        { title: "Night Drive", file: "../assets/songs/song1.mp3" },
        { title: "Cyber Dreams", file: "../assets/songs/song2.mp3" },
        { title: "Ocean Lights", file: "../assets/songs/song3.mp3" },
        { title: "Electric Pulse", file: "../assets/songs/song4.mp3" },
        { title: "Midnight Echo", file: "../assets/songs/song5.mp3" },
        { title: "Skyline Beats", file: "../assets/songs/song6.mp3" }
    ];

    const cards = document.querySelectorAll(".song-card");

    // =========================
    // RESET UI
    // =========================
    function resetUI() {
        cards.forEach(card => {
            card.classList.remove("active");
            const btn = card.querySelector(".play-song");
            if (btn) btn.textContent = "Play";
        });
    }

    // =========================
    // PLAY SONG
    // =========================
    function playSong(index) {

        const card = cards[index];
        const button = card.querySelector(".play-song");

        // SAME SONG → TOGGLE PLAY/PAUSE
        if (currentIndex === index) {
            if (audio.paused) {
                audio.play();
                card.classList.add("active");
                button.textContent = "Pause";
            } else {
                audio.pause();
                card.classList.remove("active");
                button.textContent = "Play";
            }
            return;
        }

        // NEW SONG
        resetUI();
        currentIndex = index;

        audio.src = songs[index].file;
        audio.play();

        card.classList.add("active");
        button.textContent = "Pause";
    }

    // =========================
    // CLICK EVENTS
    // =========================
    cards.forEach((card, index) => {
        card.addEventListener("click", () => {
            playSong(index);
        });
    });

    // =========================
    // AUTO RESET ON END
    // =========================
    audio.addEventListener("ended", () => {
        resetUI();
        currentIndex = -1;
    });

    // =========================
    // SEARCH FUNCTION
    // =========================
    const searchInput = document.getElementById("searchInput");

    if (searchInput) {
        searchInput.addEventListener("input", () => {

            const value = searchInput.value.toLowerCase();

            cards.forEach(card => {

                const title = card.querySelector("h3").textContent.toLowerCase();
                const genre = card.querySelector("p").textContent.toLowerCase();

                if (title.includes(value) || genre.includes(value)) {
                    card.style.display = "block";
                } else {
                    card.style.display = "none";
                }

            });

        });
    }

});