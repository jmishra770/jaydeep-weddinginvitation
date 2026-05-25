// =========================
// Page Load Fix
// =========================

window.history.scrollRestoration = "manual";

window.addEventListener("load", () => {

    window.scrollTo(0, 0);

    if (window.location.hash === "#invitation") {

        history.replaceState(
            null,
            null,
            window.location.pathname
        );

    }

});

// =========================
// Wedding Countdown
// =========================

const countdown = document.getElementById("countdown");

function updateCountdown() {

    const weddingDate = new Date("2026-06-24T13:00:00").getTime();

    const now = new Date().getTime();

    const distance = weddingDate - now;

    if (distance < 0) {

        countdown.innerHTML =
            "🎉 Wedding Day Has Arrived!";

        return;

    }

    const days = Math.floor(
        distance / (1000 * 60 * 60 * 24)
    );

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

const music = document.getElementById("bgMusic");

const musicBtn =
    document.getElementById("musicBtn");

const openInvite =
    document.getElementById("openInvite");

let playing = false;

// Open Invitation

openInvite.addEventListener(
    "click",
    async (e) => {

        e.preventDefault();

        try {

            await music.play();

            playing = true;

            musicBtn.innerHTML =
                "🔇 Music OFF";

        } catch (err) {

            console.log(err);

        }

        document
            .getElementById("invitation")
            .scrollIntoView({
                behavior: "smooth"
            });

    }
);

// Music Toggle

musicBtn.addEventListener(
    "click",
    async () => {

        try {

            if (playing) {

                music.pause();

                musicBtn.innerHTML =
                    "🎵 Music ON";

                playing = false;

            } else {

                await music.play();

                musicBtn.innerHTML =
                    "🔇 Music OFF";

                playing = true;

            }

        } catch (error) {

            console.log(error);

        }

    }
);

// =========================
// Gallery Modal
// =========================

const modal =
    document.getElementById("photoModal");

const modalImg =
    document.getElementById("modalImg");

const images =
    document.querySelectorAll(".gallery img");

const closeBtn =
    document.querySelector(".close");

images.forEach((img) => {

    img.addEventListener("click", () => {

        modal.style.display = "block";

        modalImg.src = img.src;

    });

});

closeBtn.addEventListener("click", () => {

    modal.style.display = "none";

});

modal.addEventListener("click", () => {

    modal.style.display = "none";

});