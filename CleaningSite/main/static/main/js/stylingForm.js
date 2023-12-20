const changeStyleChecked = document.querySelector("#change-style");
const formWrapper = document.querySelector(".form-data");
const styleForm = document.querySelector("#styling-form");
const body = document.body;

changeStyleChecked.addEventListener('click', (e) => {
    if (e.target.checked) {
        formElementCreate();
    }
    else formWrapper.innerHTML = '';
});

function formElementCreate() {
    const fontSizeLabel = document.createElement("label");
    fontSizeLabel.innerText = "Размер шрифта:";
    const fontSizeInput = document.createElement("input");
    fontSizeInput.setAttribute("type", "number");
    fontSizeInput.setAttribute("min", "1");
    fontSizeInput.setAttribute("value", "1");
    fontSizeInput.setAttribute("name", "font-size-input");
    fontSizeLabel.appendChild(fontSizeInput);

    const colorLabel = document.createElement("label");
    colorLabel.innerText = "Цвет шрифта:";
    const colorInput = document.createElement("input");
    colorInput.setAttribute("type", "color");
    colorInput.setAttribute("name", "color-input");
    colorLabel.appendChild(colorInput);

    const bgColorLabel = document.createElement("label");
    bgColorLabel.innerText = "Цвет фона:";
    const bgColorInput = document.createElement("input");
    bgColorInput.setAttribute("type", "color");
    bgColorInput.setAttribute("name", "bg-color-input");
    bgColorLabel.appendChild(bgColorInput);

    const submitInput = document.createElement("input");
    submitInput.setAttribute("type", "submit");
    submitInput.setAttribute("value", "Изменить");

    formWrapper.append(fontSizeLabel, colorLabel, bgColorLabel, submitInput);
}

let styleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(styleForm);
    body.style.fontSize = formData.get("font-size-input").toString() + "px";
    body.style.color = formData.get("color-input").toString();
    body.style.backgroundColor = formData.get("bg-color-input").toString();
    form.reset();
};

styleForm.addEventListener("submit", styleSubmit);