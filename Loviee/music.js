const audio = new Audio("dytyclm.mp3");
const playPauseButton = document.getElementById("playPause");
const startMusicButton = document.getElementById("startMusic");

const savedTime = localStorage.getItem("musicTime");
const isPlaying = localStorage.getItem("isPlaying") === "true";

audio.loop = true;

if (savedTime) {
    audio.currentTime = parseFloat(savedTime);
}

if (isPlaying) {
    audio.play().then(() => {
        startMusicButton.style.display = "none";
        playPauseButton.textContent = "⏸️";
    }).catch(error => {
        console.log("Autoplay prevented:", error);
    });
}

window.addEventListener("beforeunload", () => {
    localStorage.setItem("musicTime", audio.currentTime);
    localStorage.setItem("isPlaying", !audio.paused);
});

startMusicButton.addEventListener("click", () => {
    audio.play();
    startMusicButton.style.display = "none";
    playPauseButton.textContent = "⏸️";
});

playPauseButton.addEventListener("click", () => {
    if (audio.paused) {
        audio.play();
        playPauseButton.textContent = "⏸️";
    } else {
        audio.pause();
        playPauseButton.textContent = "▶️";
    }
});