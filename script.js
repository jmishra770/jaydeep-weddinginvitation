// =========================
// Page Load - Scroll Reset
// =========================

if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
}

window.addEventListener("load", () => {
    window.scrollTo(0, 0);

    if (window.location.hash === "#invitation") {
        history.replaceState(null, null, window.location.pathname);
    }
});

// =========================
// Wedding Countdown
// =========================

const countdownEl = document.getElementById("countdown");
const weddingDate = new Date("2026-06-24T13:00:00").getTime();

function updateCountdown() {
    const now = Date.now();
    const distance = weddingDate - now;

    if (distance <= 0) {
        countdownEl.textContent = "🎉 Wedding Day Has Arrived!";
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    countdownEl.textContent = `${days} Days ${hours} Hours ${minutes} Minutes ${seconds} Seconds`;
}

updateCountdown();
setInterval(updateCountdown, 1000);

// =========================
// Music Player
// =========================

const music = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");
const openInvite = document.getElementById("openInvite");
let isPlaying = false;

function toggleMusic(play) {
    if (play) {
        music.play().then(() => {
            isPlaying = true;
            musicBtn.textContent = "🔇 Music OFF";
        }).catch(err => console.log("Playback failed:", err));
    } else {
        music.pause();
        isPlaying = false;
        musicBtn.textContent = "🎵 Music ON";
    }
}

openInvite.addEventListener("click", (e) => {
    e.preventDefault();
    toggleMusic(true);
    document.getElementById("invitation").scrollIntoView({ behavior: "smooth" });
});

musicBtn.addEventListener("click", () => {
    toggleMusic(!isPlaying);
});

// =========================
// Gallery Modal
// =========================

const modal = document.getElementById("photoModal");
const modalImg = document.getElementById("modalImg");
const galleryImages = document.querySelectorAll(".gallery img");
const closeBtn = document.querySelector(".close");

function openModal(src) {
    modalImg.src = src;
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
}

function closeModal() {
    modal.classList.remove("active");
    document.body.style.overflow = "";
}

galleryImages.forEach((img) => {
    img.setAttribute("tabindex", "0");

    img.addEventListener("click", () => openModal(img.src));

    img.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            openModal(img.src);
        }
    });
});

closeBtn.addEventListener("click", closeModal);

closeBtn.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
        closeModal();
    }
});

modal.addEventListener("click", (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("active")) {
        closeModal();
    }
});

// =========================
// Card Animation On Scroll
// =========================

const cards = document.querySelectorAll(".card");

const cardObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                cardObserver.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.15 }
);

cards.forEach((card) => cardObserver.observe(card));
