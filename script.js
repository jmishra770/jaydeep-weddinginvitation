// =========================
// Page Transition Fade In
// =========================

document.body.style.opacity = "0";
document.body.style.transition = "opacity 1.2s ease";

if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
}

window.addEventListener("load", () => {
    document.body.style.opacity = "1";
    window.scrollTo(0, 0);
    if (window.location.hash === "#invitation") {
        history.replaceState(null, null, window.location.pathname);
    }
    launchFireworks();

    // Typewriter
    const h1 = document.querySelector(".hero h1");
    h1.innerHTML = "";
    setTimeout(() => {
        const span = document.createElement("span");
        h1.appendChild(span);
        typeWriter(span, "Jaydeep ❤️ Debasmita", 80, () => {
            span.classList.add("done");
        });
    }, 800);
});

// =========================
// Fireworks / Sparkle Burst
// =========================

function launchFireworks() {
    const canvas = document.getElementById("fireworksCanvas");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const colors = ["#d4af37", "#f5d78e", "#fff8dc", "#ffec8b", "#ffd700", "#fffacd"];

    function createBurst(x, y) {
        for (let i = 0; i < 80; i++) {
            const angle = (Math.PI * 2 / 80) * i;
            const speed = Math.random() * 4 + 1;
            particles.push({
                x, y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                alpha: 1,
                color: colors[Math.floor(Math.random() * colors.length)],
                size: Math.random() * 3 + 1
            });
        }
    }

    createBurst(window.innerWidth * 0.3, window.innerHeight * 0.4);
    createBurst(window.innerWidth * 0.7, window.innerHeight * 0.3);
    createBurst(window.innerWidth * 0.5, window.innerHeight * 0.5);

    function animateFireworks() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach((p) => {
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.05;
            p.alpha -= 0.018;
            ctx.save();
            ctx.globalAlpha = Math.max(p.alpha, 0);
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.shadowBlur = 6;
            ctx.shadowColor = p.color;
            ctx.fill();
            ctx.restore();
        });

        const alive = particles.filter(p => p.alpha > 0);
        particles.length = 0;
        particles.push(...alive);

        if (particles.length > 0) {
            requestAnimationFrame(animateFireworks);
        } else {
            canvas.style.display = "none";
        }
    }

    animateFireworks();
}

// =========================
// Typewriter Effect
// =========================

function typeWriter(element, text, speed, callback) {
    element.textContent = "";
    let i = 0;
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else if (callback) {
            callback();
        }
    }
    type();
}

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

    countdownEl.textContent = `${days} Days  ${hours} Hours  ${minutes} Minutes  ${seconds} Seconds`;
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
// Rose Petals Animation
// =========================

const petalCanvas = document.getElementById("petalCanvas");
const pCtx = petalCanvas.getContext("2d");

function resizePetalCanvas() {
    petalCanvas.width = window.innerWidth;
    petalCanvas.height = window.innerHeight;
}
resizePetalCanvas();
window.addEventListener("resize", resizePetalCanvas);

const petals = [];
const petalColors = ["#e8a0a0", "#f4c2c2", "#ffb7b7", "#ffd1d1", "#ff9999", "#d4af37", "#f5d78e"];

function createPetal() {
    return {
        x: Math.random() * petalCanvas.width,
        y: -20,
        size: Math.random() * 10 + 6,
        speedY: Math.random() * 1.5 + 0.5,
        speedX: Math.random() * 1.5 - 0.75,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.05,
        opacity: Math.random() * 0.5 + 0.4,
        color: petalColors[Math.floor(Math.random() * petalColors.length)],
        sway: Math.random() * 2,
        swayOffset: Math.random() * Math.PI * 2
    };
}

for (let i = 0; i < 35; i++) {
    const p = createPetal();
    p.y = Math.random() * petalCanvas.height;
    petals.push(p);
}

let petalFrame = 0;

function animatePetals() {
    pCtx.clearRect(0, 0, petalCanvas.width, petalCanvas.height);
    petalFrame++;

    if (petalFrame % 18 === 0 && petals.length < 60) {
        petals.push(createPetal());
    }

    petals.forEach((p, i) => {
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(petalFrame * 0.02 + p.swayOffset) * p.sway * 0.3;
        p.rotation += p.rotationSpeed;

        pCtx.save();
        pCtx.globalAlpha = p.opacity;
        pCtx.translate(p.x, p.y);
        pCtx.rotate(p.rotation);

        pCtx.beginPath();
        pCtx.ellipse(0, 0, p.size, p.size * 0.55, 0, 0, Math.PI * 2);
        pCtx.fillStyle = p.color;
        pCtx.shadowBlur = 4;
        pCtx.shadowColor = p.color;
        pCtx.fill();
        pCtx.restore();

        if (p.y > petalCanvas.height + 20) {
            petals.splice(i, 1);
        }
    });

    requestAnimationFrame(animatePetals);
}

animatePetals();

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
    if (e.key === "Enter" || e.key === " ") closeModal();
});
modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
});
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("active")) closeModal();
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