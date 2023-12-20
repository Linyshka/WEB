window.addEventListener("load", () => {
    let date = prompt("Введите дату рождения в формате (MM-DD-YYYY)");
    let birthday = new Date(date);

    let notValid = isNaN(Date.parse(date));

    while (notValid) {
        const date = prompt("Вы ввели некорректную дату. Попробуйте ещё раз)\nВведите дату рождения в формате (MM-DD-YYYY)");
        birthday = new Date(date);
        if (isNaN(Date.parse(date))) {
            continue;
        } else {
            notValid = false;
        }
    }
    isAdult(birthday);

});

function isAdult(birthday) {
    const today = new Date();

    let age = today.getFullYear() - birthday.getFullYear();
    const m = today.getMonth() - birthday.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthday.getDate())) {
        age--;
    }

    alertBirthday(age, birthday);
}

function alertBirthday(age, birthday) {
    console.log(1);
    if (age >= 18) {
        alert(birthday.toLocaleString('en-GB', {weekday: 'long'}));
    } else {
        alert("Для использования сайта необходимо разрешение родителей!");
    }
}

