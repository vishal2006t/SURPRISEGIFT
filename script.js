/* ===========================
   Elements
=========================== */

const screens = document.querySelectorAll(".screen");

const giftScreen = document.getElementById("giftScreen");
const lockScreen = document.getElementById("lockScreen");
const wishScreen = document.getElementById("wishScreen");
const galleryScreen = document.getElementById("galleryScreen");
const letterScreen = document.getElementById("letterScreen");
const celebrationScreen = document.getElementById("celebrationScreen");

const passwordInput = document.getElementById("passwordInput");
const wrongPassword = document.getElementById("wrongPassword");


/* ===========================
   Change Screen
=========================== */

function showScreen(screen){

    screens.forEach(s => {

        s.classList.remove("active");
        s.classList.remove("fade");

    });

    screen.classList.add("active");

    // restart the fade-in animation
    void screen.offsetWidth;
    screen.classList.add("fade");

}


/* ===========================
   1. Gift Box Opening
=========================== */

const giftBox = document.getElementById("giftBox");

giftBox.onclick = () => {

    if (giftBox.classList.contains("open")) return;

    giftBox.classList.add("open");

    setTimeout(() => {

        giftBox.classList.add("zoom");

    }, 1500);

    setTimeout(() => {

        showScreen(lockScreen);

    }, 3200);

};


/* ===========================
   2. DOB KEYPAD / Password
=========================== */

const keys = document.querySelectorAll(".key");

keys.forEach(key => {

    key.addEventListener("click", () => {

        if (key.classList.contains("delete")) {

            passwordInput.value = passwordInput.value.slice(0, -1);
            return;

        }

        if (key.classList.contains("clear")) {

            passwordInput.value = "";
            return;

        }

        if (passwordInput.value.length < 8) {

            passwordInput.value += key.innerText;

        }

        if (passwordInput.value.length === 8) {

            if (passwordInput.value === PASSWORD) {

                wrongPassword.innerHTML = "";

                setTimeout(() => {

                    showScreen(wishScreen);

                }, 300);

            } else {

                wrongPassword.innerHTML = "❌ Wrong DOB";
                passwordInput.value = "";

            }

        }

    });

});


/* ===========================
   3. Small Wish Screen
=========================== */

const wishContinueBtn = document.getElementById("wishContinueBtn");

wishContinueBtn.onclick = () => {

    showScreen(galleryScreen);

};


/* ===========================
   4 & 5. Heart Reveal Gallery
=========================== */

const heartTrigger = document.getElementById("heartTrigger");
const heartTapHint = document.getElementById("heartTapHint");
const frames = document.querySelectorAll("#gallery .frame");
const letterBtn = document.getElementById("letterBtn");

let galleryRevealed = false;

heartTrigger.onclick = () => {

    if (galleryRevealed) return;
    galleryRevealed = true;

    heartTrigger.classList.add("burst");
    heartTapHint.style.opacity = "0";

    setTimeout(() => {

      heartTrigger.style.display = "none";
heartTapHint.style.display = "none";

document.getElementById("gallery").classList.add("show");

revealFrames();

    }, 700);

};

function revealFrames(){

    frames.forEach((frame, i) => {

        setTimeout(() => {

            frame.classList.add("reveal");

        }, i * 450);

    });

    const totalDelay = frames.length * 450 + 600;

    setTimeout(() => {

        letterBtn.classList.add("show");

    }, totalDelay);

}


/* ===========================
   6. Love Letter
=========================== */

const loveLetter = document.getElementById("loveLetter");

letterBtn.onclick = () => {

    showScreen(letterScreen);

    writeLetter();

};

function writeLetter(){

    loveLetter.innerHTML = "";

    let text = LOVE_MESSAGE;
    let i = 0;

    const typing = setInterval(() => {

        loveLetter.innerHTML += text[i];
        i++;

        if (i >= text.length) {

            clearInterval(typing);

        }

    }, 40);

}


/* ===========================
   7. Celebration
=========================== */

const celebrateBtn = document.getElementById("celebrateBtn");
const personName = document.getElementById("personName");

celebrateBtn.onclick = () => {

    personName.innerHTML = PERSON_NAME;

    showScreen(celebrationScreen);

    launchFireworks();

};

function launchFireworks(){

    const duration = 6 * 1000;
    const end = Date.now() + duration;

    const goldRose = ["#ffd700", "#ff6b9d", "#fff3a3", "#ff4f88", "#ffffff"];

    (function frame(){

        confetti({
            particleCount: 5,
            angle: 60,
            spread: 70,
            colors: goldRose,
            origin: { x: 0 }
        });

        confetti({
            particleCount: 5,
            angle: 120,
            spread: 70,
            colors: goldRose,
            origin: { x: 1 }
        });

        if (Date.now() < end) {

            requestAnimationFrame(frame);

        }

    })();

}


/* ===========================
   Replay
=========================== */

const restartBtn = document.getElementById("restartBtn");

restartBtn.onclick = () => {

    location.reload();

};


/* ===========================
   Background Music
=========================== */

const music = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");

let musicPlaying = false;

musicBtn.onclick = () => {

    if (musicPlaying) {

        music.pause();
        musicBtn.innerHTML = "🎵";

    } else {

        music.play().catch(() => {});
        musicBtn.innerHTML = "⏸️";

    }

    musicPlaying = !musicPlaying;

};


/* =========================
   BACKGROUND EFFECTS
   Premium gold + rose hearts & stars
========================= */

const heartsContainer = document.getElementById("hearts");
const starsContainer = document.getElementById("stars");

const premiumColors = [
    "rgba(255, 215, 0, 0.9)",   // gold
    "rgba(255, 107, 157, 0.9)", // rose
    "rgba(255, 255, 255, 0.9)"  // white sparkle
];

function createHeart(){

    const heart = document.createElement("div");

    heart.className = "heart";
    heart.innerHTML = "❤️";

    const color = premiumColors[Math.floor(Math.random() * premiumColors.length)];

    heart.style.left = Math.random() * 100 + "vw";
    heart.style.fontSize = (14 + Math.random() * 18) + "px";
    heart.style.animationDuration = (6 + Math.random() * 5) + "s";
    heart.style.filter = `drop-shadow(0 0 8px ${color})`;

    heartsContainer.appendChild(heart);

    setTimeout(() => {

        heart.remove();

    }, 12000);

}

setInterval(createHeart, 550);


function createStars(){

    for (let i = 0; i < 90; i++) {

        const star = document.createElement("div");

        star.className = "star";
        star.innerHTML = "✦";

        const color = premiumColors[Math.floor(Math.random() * premiumColors.length)];

        star.style.left = Math.random() * 100 + "vw";
        star.style.top = Math.random() * 100 + "vh";
        star.style.fontSize = (6 + Math.random() * 9) + "px";
        star.style.animationDelay = Math.random() * 3 + "s";
        star.style.color = color;

        starsContainer.appendChild(star);

    }

}

createStars();
