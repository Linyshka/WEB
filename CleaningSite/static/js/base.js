// --- Таймер

const timer = document.querySelector(".timer");

if (!localStorage.getItem("firstDate")) {
    const firstDate = new Date();
    localStorage.setItem("firstDate", firstDate.toString())
}

function showTime() {
    const now = new Date();
    if (!localStorage.getItem("firstDate")) {
        return;
    }
    const firstDate = new Date(localStorage.getItem("firstDate"));
    const difference = (now.getTime() - firstDate.getTime()) / 1000;
    if (difference === 3600) {
        alert("Час истёк");
        clearInterval(timerId);
    }
    timer.textContent = (Math.floor((3600 - difference) / 60) + ":" + Math.floor((3600 - difference) % 60));
}

const timerId = setInterval(showTime, 1000);

// Навигация

const iconMenu = document.querySelector(".menu-btn");
const menuNav = document.querySelector("nav");
if (iconMenu) {
    iconMenu.addEventListener("click", function (e) {
        document.body.classList.toggle("_lock");
        iconMenu.classList.toggle("_active");
        menuNav.classList.toggle("_active");
    })
}

const over = document.querySelector(".over");
over.addEventListener("click", function (e) {
    document.body.classList.remove("_lock");
    iconMenu.classList.remove("_active");
    menuNav.classList.remove("_active");
    e.preventDefault();
})