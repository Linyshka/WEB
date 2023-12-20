const cleanLeft = document.querySelector('#clean_left');
const cleanRight = document.querySelector('#clean_right');
const woman = document.querySelector('#woman');

window.addEventListener('scroll',()=>{
    let value = scrollY;
    cleanLeft.style.left = `-${value/0.7}px`;
    cleanRight.style.left = `${value/0.7}px`;
    woman.style.height = `${window.innerHeight - value}px`;
});

let readers = {
    "1535001": {
        "lastName": "Radyukevich",
        "firstName": "Alina",
        "surname": "Igorevna",
        "year": 2012
    },
    "1535002": {
        "lastName": "Savaev",
        "firstName": "Anton",
        "surname": "Olegovich",
        "year": 2003
    },
    "1535003": {
        "lastName": "Konovaluk",
        "firstName": "Maksim",
        "surname": "Anatolievich",
        "year": 2021
    },
    "1535004": {
        "lastName": "Goncharenok",
        "firstName": "Yulia",
        "surname": "Aleksandrovna",
        "year": 2019
    },
    "1535005": {
        "lastName": "Astop",
        "firstName": "Ekaterina",
        "surname": "Olegovna",
        "year": 2003
    },
};

const form = document.querySelector("#task-form");
const result = document.querySelector("#list-result");
const taskData = document.querySelector("#task");

listGeneration(readers, taskData);

function findOlderReader(readers) {
    let oldest_year = Math.min(...Object.values(readers).map(item => item.year));
    let result = {};

    for (let item in readers) {
        if (readers[item].year === oldest_year) {
            result[item] = readers[item];
        }
    }

    return result
}

let Submit = (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    if (readers.hasOwnProperty(formData.get("studentId"))) {
        alert("Вы ввели существующий студенческий билет!");
        return;
    }
    if (isNaN(formData.get("studentId"))) {
        alert("Введите корректный студенческий билет!");
        return;
    }
    if(isNaN(formData.get("year"))) {
        alert("Введите корректный год!");
        return;
    }
    readers[formData.get("studentId")] = {
        "lastName": formData.get("lastName"),
        "firstName": formData.get("firstName"),
        "surname": formData.get("surname"),
        "year": Number(formData.get("year")),
    }
    form.reset();
    listGeneration(readers, taskData);
    listGeneration(findOlderReader(readers), result);
};

form.addEventListener("submit", Submit);

function listGeneration(obj, element) {
    element.innerHTML = "";
    for ([key, value] of Object.entries(obj)) {
        const lastName = document.createElement("h3");
        lastName.innerText = value.lastName + " " + value.firstName + " " + value.surname;
        const year = document.createElement("p");
        year.innerText = "Год регистрации:" + value.year;
        const studentId = document.createElement("p");
        studentId.innerText = "Студенческий билет:" + key;
        const li = document.createElement("li");
        const hr = document.createElement("hr");
        li.append(lastName, year, studentId, hr);
        element.appendChild(li);
    }
}