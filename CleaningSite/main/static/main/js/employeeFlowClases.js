function decorator (obj, fn) {
     return function (){
          alert("Ожидайте, выполняем проверку!");
          return fn.call(obj);
     }
}

class Cleaner {
    constructor(firstName, lastName, birthday, experience, salary) {
        this.firstname = firstName;
        this.lastname = lastName;
        this.birthday = birthday;
        this.experience = experience;
        this._salary = salary;
    }

    get fullName() {
        return `${this.firstname} ${this.lastname}`;
    }

    get salary() {
        if (this.experience <= 1) {
            return this._salary;
        } else if (this.experience <= 2) {
            return this._salary * 1.5;
        }
        return this._salary * 2;
    }

    get rank() {
        return this._rank;
    }

    set rank(newRank) {
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

    happyBirthday() {
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
}

class Admin extends Cleaner {
    constructor(firstName, lastName, birthday, experience, salary) {
        super(firstName, lastName, birthday, experience, salary);
        this.isAdmin = true;
    }

    get salary() {
        return this._salary * 2;
    }
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
        fullName.innerText = `${employee.fullName}`;
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
            li.style.background = "pink";
        } else li.style.background = "#b8c8e7";
        if (employee.rank) {
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
    alert(employees[id].salary);
}

function getRank() {
    const id = document.querySelector("#employee_id").value - 1;
    alert(employees[id].rank);
}

function wishBirthday() {
    const id = document.querySelector("#employee_id").value - 1;
    const result = decorator(employees[id], employees[id].happyBirthday)();
    if (result) {
        alert(result);
    } else alert("К сожалению, сегодня не день рождения!");
}

function changeRank() {
    const id = document.querySelector("#employee_id").value - 1;
    employees[id].rank = document.querySelector("#rank").value;
    employeeGeneration(employees);
}

employeeGeneration(employees);
