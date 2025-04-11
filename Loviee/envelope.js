function openEnvelope() {
    const envelope = document.querySelector('.envelope');
    const papers = document.querySelector('.papers');

    const flap = document.querySelector('.envelope .flap');
    flap.style.transform = 'rotateX(180deg)';

    setTimeout(() => {
        envelope.classList.add('moved'); 
    }, 500);

    setTimeout(() => {
        papers.classList.remove('hidden');
        papers.classList.add('visible');
    }, 800); 
}

let highestZ = 1;

class Paper {
    constructor() {
        this.holdingPaper = false;

        this.prevX = 0;
        this.prevY = 0;

        this.currentX = 0;
        this.currentY = 0;
    }

    init(paperElement) {
        const startEvent = (e) => {
            this.holdingPaper = true;

            paperElement.style.zIndex = highestZ;
            highestZ += 1;

            if (e.type === "mousedown") {
                this.prevX = e.clientX;
                this.prevY = e.clientY;
            } else if (e.type === "touchstart") {
                this.prevX = e.touches[0].clientX;
                this.prevY = e.touches[0].clientY;
            }

            console.log("Start X:", this.prevX, "Start Y:", this.prevY);
        };

        const moveEvent = (e) => {
            if (this.holdingPaper) {
                e.preventDefault();

                let currentX, currentY;

                if (e.type === "mousemove") {
                    currentX = e.clientX;
                    currentY = e.clientY;
                } else if (e.type === "touchmove") {
                    currentX = e.touches[0].clientX;
                    currentY = e.touches[0].clientY;
                }
                
                const dx = currentX - this.prevX;
                const dy = currentY - this.prevY;

                this.currentX += dx;
                this.currentY += dy;
                
                paperElement.style.transform = `translate(${this.currentX}px, ${this.currentY}px)`;

                this.prevX = currentX;
                this.prevY = currentY;

                console.log("Move X:", currentX, "Move Y:", currentY);
            }
        };

        const endEvent = () => {
            if (this.holdingPaper) {
                this.holdingPaper = false;
                console.log("Paper released.");
            }
        };

        paperElement.addEventListener("mousedown", startEvent);
        paperElement.addEventListener("touchstart", startEvent);

        document.addEventListener("mousemove", moveEvent);
        document.addEventListener("touchmove", moveEvent);

        window.addEventListener("mouseup", endEvent);
        window.addEventListener("touchend", endEvent);
    }
}

const paperElements = Array.from(document.querySelectorAll(".paper"));

paperElements.forEach((paperElement) => {
    const paper = new Paper();
    paper.init(paperElement);
});

function setupAudioPlayer() {
    const playPauseBtn = document.getElementById("playPauseBtn");
    const audio = document.getElementById("audio");
    const timer = document.getElementById("timer");
    const bars = document.querySelectorAll(".bar");

    if (!playPauseBtn || !audio || !timer || bars.length === 0) {
        console.error("Audio player elements not found.");
        return;
    }

    let playing = false;

    playPauseBtn.addEventListener("click", () => {
        if (playing) {
            audio.pause();
            playPauseBtn.textContent = "▶️";
            bars.forEach(bar => bar.style.animationPlayState = "paused");
        } else {
            audio.play();
            playPauseBtn.textContent = "⏸️";
            bars.forEach(bar => bar.style.animationPlayState = "running");
        }
        playing = !playing;
    });

    audio.addEventListener("timeupdate", () => {
        let seconds = Math.floor(audio.currentTime);
        timer.textContent = `0:${seconds < 10 ? "0" + seconds : seconds}`;
    });

    audio.addEventListener("ended", () => {
        playPauseBtn.textContent = "▶️";
        playing = false;
        bars.forEach(bar => bar.style.animationPlayState = "paused");
    });
}

// Call the function after the page loads
document.addEventListener("DOMContentLoaded", setupAudioPlayer);