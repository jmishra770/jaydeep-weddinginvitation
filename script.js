// =========================
// Wedding Countdown
// =========================

const countdown = document.getElementById("countdown");

function updateCountdown() {

    const weddingDate = new Date("2026-06-24T13:00:00").getTime();
    const now = new Date().getTime();
    const distance = weddingDate - now;

    if (distance < 0) {
        countdown.innerHTML = "🎉 Wedding Day Has Arrived!";
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));

    const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24))
        / (1000 * 60 * 60)
    );

    const minutes = Math.floor(
        (distance % (1000 * 60 * 60))
        / (1000 * 60)
    );

    const seconds = Math.floor(
        (distance % (1000 * 60))
        / 1000
    );

    countdown.innerHTML =
        `${days} Days ${hours} Hours ${minutes} Minutes ${seconds} Seconds`;
}

updateCountdown();
setInterval(updateCountdown, 1000);


// =========================
// Music Player
// =========================

// Music Player

const music = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");
const openInvite = document.getElementById("openInvite");

let playing = false;

// Auto start when invitation opens

if (openInvite) {

    openInvite.addEventListener("click", async () => {

        try {

            await music.play();

            playing = true;

            musicBtn.innerHTML = "🔇 Music OFF";

        } catch (error) {

            console.log("Autoplay blocked:", error);

        }

    });

}

// Music Toggle Button

if (musicBtn) {

    musicBtn.addEventListener("click", async () => {

        try {

            if (playing) {

                music.pause();

                musicBtn.innerHTML = "🎵 Music ON";

                playing = false;

            } else {

                await music.play();

                musicBtn.innerHTML = "🔇 Music OFF";

                playing = true;

            }

        } catch (error) {

            console.log(error);

        }

    });

}