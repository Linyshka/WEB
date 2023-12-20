let list = document.querySelector(".slider .list");
let items = document.querySelectorAll(".slider .list .item");
let dots = document.querySelectorAll(".slider .dots li");

let active = 0;
let lengthItems = items.length - 1;
let sliderInterval = 3000;

let refreshSlider = setInterval(next, sliderInterval);

function next() {
    if(active + 1 > lengthItems) {
        active = 0;
    } else {
        active += 1;
    }
    reloadSlider();
}
function reloadSlider() {
    let checkLeft = items[active].offsetLeft;
    list.style.left = -checkLeft + "px";

    let lastActiveDot = document.querySelector(".slider .dots li.active");
    lastActiveDot.classList.remove("active");
    dots[active].classList.add("active");
    clearInterval(refreshSlider);
    refreshSlider = setInterval(next, sliderInterval);
}

dots.forEach((li, key) => {
    li.addEventListener("click", () => {
        active = key;
        reloadSlider();
    })
});

setInterval(checkPageFocus, 200);

function setTime() {
    let newTime = document.querySelector('.sliderTimer').value;
    clearInterval(refreshSlider);
    sliderInterval = +newTime * 1000;
    console.log(newTime);
    refreshSlider = setInterval(next, sliderInterval);
}

function checkPageFocus() {
    if (!document.hasFocus()) {
        clearInterval(refreshSlider);
        refreshSlider = null;
    } else {
        if (!refreshSlider) {
            refreshSlider = setInterval(next, sliderInterval);
        }
    }
}