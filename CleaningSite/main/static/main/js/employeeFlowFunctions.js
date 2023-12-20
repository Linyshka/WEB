function Cleaner(firstName, lastName, birthday, experience, salary) {
    this.firstname = firstName;
    this.lastname = lastName;
    this.birthday = birthday;
    this.experience = experience;
    this._salary = salary;
}

Cleaner.prototype.getFullName = function () {
    return `${this.firstname} ${this.lastname}`;
}

Cleaner.prototype.getSalary = function () {
    if (this.experience <= 1) {
        return this._salary;
    } else if (this.experience <= 2) {
        return this._salary * 1.5;
    }
    return this._salary * 2;
}

Cleaner.prototype.setRank = function (newRank) {
    if (newRank === 'Junior' || newRank === 'Middle' || newRank === 'Senior') {
        if (newRank === 'Junior') {
            console.log(1);
            this._rank = newRank;
            alert('Успешно!');
        } else if (newRank === 'Middle' && this.experience >= 2) {
            this._rank = newRank;
            alert('Успешно!');
        } else if (newRank === 'Senior' && this.experience >= 3) {
            this._rank = newRank;
            alert('Успешно!');
        } else alert('Не возможно!');
    } else alert('Вы ввели неправильный ранг');
}

Cleaner.prototype.getRank = function () {
    return this._rank;
}

Cleaner.prototype.happyBirthday = function () {
    const month = this.birthday.getMonth();
    const day = this.birthday.getDay();
    const today = new Date();
    if (month === today.getMonth() && day === today.getDay() + 1) {
        return `
                Дорогой ${this.fullName}!
                Наша компания поздравляет тебя с днём рождения и дарит скидку в аквапарк Лебяжий!
                С уважением, Clean!
            `
    }
    return '';
}

function Admin(firstName, lastName, birthday, experience, salary) {
    this.isAdmin = true;
    Cleaner.call(this, firstName, lastName, birthday, experience, salary);
}

Admin.prototype = Object.create(Cleaner.prototype);

Admin.prototype.getSalary = function () {
    return this._salary * 2;
}

let employees = [
    new Cleaner(
        'Alina',
        'Radyukevich',
        new Date(2003, 9, 14),
        1.5,
        360
    ),
    new Admin(
        'Dasha',
        'Alesik',
        new Date(2001, 10, 20),
        3.7,
        712
    ),
    new Cleaner(
        'Stepa',
        'Petrov',
        new Date(1989, 1, 22),
        0.5,
        90
    ),
    new Cleaner(
        'Mark',
        'Markov',
        new Date(1999, 5, 1),
        2,
        340
    ),
    new Admin(
        'Katya',
        'Karp',
        new Date(2004, 3, 29),
        3.7,
        712
    ),
    new Cleaner(
        'Mila',
        'Born',
        new Date(1993, 7, 8),
        1.2,
        200
    ),
];

const ol = document.querySelector("#employees");

function employeeGeneration(employees) {
    ol.innerHTML = "";
    employees.forEach(employee => {
        const fullName = document.createElement("h3");
        fullName.innerText = `${employee.getFullName()}`;
        const year = document.createElement("p");
        year.innerText = "День рождения: " + employee.birthday;
        const experience = document.createElement("p");
        experience.innerText = "Опыт: " + employee.experience;
        const salary = document.createElement("p");
        salary.innerText = "Зарплата: " + employee._salary;
        const li = document.createElement("li");
        const hr = document.createElement("hr");
        li.append(fullName, year, experience, salary);
        if (employee.isAdmin) {
            li.style.background = "red";
        } else li.style.background = "yellow";
        if (employee.getRank()) {
            const rank = document.createElement("p");
            rank.innerText = "Ранг:" + employee.rank;
            li.appendChild(rank);
        }
        li.appendChild(hr);
        ol.appendChild(li);
    });
}

function getSalary() {
    const id = document.querySelector("#employee_id").value - 1;
    alert(employees[id].getSalary());
}

function getRank() {
    const id = document.querySelector("#employee_id").value - 1;
    alert(employees[id].getRank());
}

function wishBirthday() {
    const id = document.querySelector("#employee_id").value - 1;
    const result = employees[id].happyBirthday();
    if (result) {
        alert(result);
    } else alert("К сожалению, сегодня не день рождения!");
}

function changeRank() {
    const id = document.querySelector("#employee_id").value - 1;
    employees[id].setRank(document.querySelector("#rank").value);
    employeeGeneration(employees);
}

employeeGeneration(employees);