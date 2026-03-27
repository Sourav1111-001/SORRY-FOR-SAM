// ── Background: Stars
for (let i = 0; i < 60; i++) {
    const star = document.createElement("div");
    star.classList.add("star");
    const size = Math.random() * 3 + 1;
    star.style.cssText = `
        width:${size}px; height:${size}px;
        left:${Math.random()*100}vw;
        top:${Math.random()*100}vh;
        animation-duration:${Math.random()*3+2}s;
        animation-delay:${Math.random()*4}s;
    `;
    document.body.appendChild(star);
}

// ── Background: Rose petals
const petalEmojis = ["🌸", "🌺", "🌹", "💮"];
function spawnPetal() {
    const petal = document.createElement("div");
    petal.classList.add("petal");
    petal.textContent = petalEmojis[Math.floor(Math.random() * petalEmojis.length)];
    petal.style.left = Math.random() * 100 + "vw";
    petal.style.fontSize = (Math.random() * 0.8 + 0.8) + "rem";
    const dur = Math.random() * 6 + 7;
    petal.style.animationDuration = dur + "s";
    petal.style.animationDelay = Math.random() * 4 + "s";
    document.body.appendChild(petal);
    setTimeout(() => petal.remove(), (dur + 4) * 1000);
}
setInterval(spawnPetal, 1200);

// ── Floating hearts
const heartsBg = document.getElementById("heartsBg");
const heartEmojis = ["❤️", "💕", "💖", "💗", "🌸", "💝"];

function spawnHeart() {
    const heart = document.createElement("div");
    heart.classList.add("heart");
    heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.fontSize = (Math.random() * 1.5 + 0.8) + "rem";
    const duration = Math.random() * 6 + 6;
    heart.style.animationDuration = duration + "s";
    heart.style.animationDelay = Math.random() * 3 + "s";
    heartsBg.appendChild(heart);
    setTimeout(() => heart.remove(), (duration + 3) * 1000);
}
setInterval(spawnHeart, 800);

// Story card → Knee scene
document.getElementById("storyBtn").addEventListener("click", () => {
    document.getElementById("storyCard").classList.add("hidden");
    document.getElementById("kneeScene").classList.remove("hidden");
});

// Knee scene → Apology card
document.getElementById("kneeBtn").addEventListener("click", () => {
    document.getElementById("kneeScene").classList.add("hidden");
    document.getElementById("apologyCard").classList.remove("hidden");
});

// Apology flow
const question = document.getElementById("question");
const gif = document.querySelector(".gif");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");

const steps = [
    {
        q: "Samridhi... will you really forgive me? 🥺",
        sub: "A genuine apology from the heart...",
        gifSrc: "images/sorry.png",
        yes: "Yes, I forgive you 💖",
        no: "Let me think..."
    },
    {
        q: "That evening was yours. I should have been present for you. 😔",
        sub: "Can I still get one more chance?",
        gifSrc: "images/download.gif",
        yes: "Okay... fine 🌸",
        no: "Not yet"
    },
    {
        q: "I can't stand the thought of you being upset with me. 🙏",
        sub: "This sorry is 100% real...",
        gifSrc: "images/sadlife.gif",
        yes: "Alright, you're forgiven 💕",
        no: "Still no"
    },
    {
        q: "Come on, I'm not that bad! 😏",
        sub: "You know you're going to forgive me...",
        gifSrc: "images/run.gif",
        yes: "No forgiveness! 🙅",
        no: "Okay fine, you're forgiven 💖",
        runYes: true
    }
];

let step = 0;

function endHappy() {
    question.innerHTML = "Yay! I knew it! 🥳💖";
    document.getElementById("questionSub").innerHTML = "Sourav promises — next movie, his eyes are only on you 🎬❤️";
    gif.src = "images/love.gif";
    gif.style.maxHeight = "260px";
    yesBtn.style.display = "none";
    noBtn.style.display = "none";
    noBtn.classList.remove("running");
}

function loadStep(i) {
    const s = steps[i];
    question.innerHTML = s.q;
    document.getElementById("questionSub").innerHTML = s.sub;
    gif.src = s.gifSrc;
    yesBtn.textContent = s.yes;
    noBtn.textContent = s.no;
    noBtn.classList.remove("running");
    noBtn.style.position = "";
    noBtn.style.left = "";
    noBtn.style.top = "";

    if (s.runYes) {
        // Yes button runs away, No = accept
        yesBtn.onmouseover = () => moveButton(yesBtn);
        noBtn.onclick = endHappy;
        yesBtn.onclick = null;
    } else {
        yesBtn.onmouseover = null;
        yesBtn.onclick = endHappy;
        noBtn.onclick = () => {
            step++;
            if (step < steps.length) loadStep(step);
        };
    }
}

function moveButton(btn) {
    btn.classList.add("running");
    const margin = 60;
    const maxX = window.innerWidth - btn.offsetWidth - margin;
    const maxY = window.innerHeight - btn.offsetHeight - margin;
    btn.style.left = Math.max(margin, Math.floor(Math.random() * maxX)) + "px";
    btn.style.top = Math.max(margin, Math.floor(Math.random() * maxY)) + "px";
}

yesBtn.addEventListener("click", () => {
    if (step === 0) loadStep(step);
});

noBtn.addEventListener("click", () => {
    step++;
    if (step < steps.length) loadStep(step);
});
