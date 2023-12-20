let size, cell_limit, highlightedRowCount = [], highlightedColCount = [];
let defaultColor = 'white';
let width, height;

function addCellStyle(cell) {
    cell.innerText = Math.ceil(Math.random() * 100).toString();
    cell.style.border = "1px solid black";
    cell.style.color = "black";
    cell.style.backgroundColor = "white";
    cell.style.width = "80px";
    cell.style.height = "80px";
    cell.style.fontSize = "22px";
    cell.style.fontWeight = "bold";
}

function numbersGeneration() {
    const board = document.querySelector("#board");
    const boardBody = board.firstElementChild;
    boardBody.replaceChildren();

    width = size;
    height = size

    for (let i = 0; i < size; i++) {
        const row = boardBody.insertRow();
        highlightedRowCount.push(0);
        highlightedColCount.push(0);
        for (let j = 0; j < size; j++) {
            let cell = row.insertCell();
            addCellStyle(cell);
        }
    }
}

function tableGenerate() {
    size = document.querySelector("#size").value;
    cell_limit = document.querySelector("#cell_limit").value;
    document.querySelector(".table-actions").hidden = false;
    document.querySelector(".table-actions").style.marginTop = "15px";
    // Инициализация таблицы
    const table = document.createElement("table");
    table.classList.add("board");
    table.id = "board";
    table.style.border = "1px solid black";
    table.style.textAlign = "center";
    const tbody = document.createElement("tbody");
    tbody.classList.add("tbody");
    table.append(tbody);
    const div = document.querySelector(".table_wrapper");
    div.append(table);

    numbersGeneration();
    addListener();
}

function addListener() {
    const board = document.querySelector("#board");

    board.onclick = (e) => {
        if (e.target.matches("td")) {
            const cell = e.target;
            const row = cell.parentElement.rowIndex;
            const col = cell.cellIndex;
            const cellArray = board.querySelectorAll('td');
            let leftCell, rightCell, topCell, bottomCell;
            if (col !== 0) {
                leftCell = cellArray[row * width + col - 1];
            }
            if (col !== width - 1) {
                rightCell = cellArray[row * width + col + 1];
            }

            if (cell.style.backgroundColor !== defaultColor) {
                paint(cell, col, row);
            } else if (leftCell && rightCell) {
                if (leftCell.style.backgroundColor === defaultColor && rightCell.style.backgroundColor === defaultColor) {
                    if (highlightedRowCount[row] < cell_limit && highlightedColCount[col] < cell_limit) {
                        paint(cell, col, row);
                    }
                }
            } else if (leftCell) {
                if (leftCell.style.backgroundColor === defaultColor) {
                    if (highlightedRowCount[row] < cell_limit && highlightedColCount[col] < cell_limit) {
                        paint(cell, col, row);
                    }
                }
            } else if (rightCell) {
                if (rightCell.style.backgroundColor === defaultColor) {
                    if (highlightedRowCount[row] < cell_limit && highlightedColCount[col] < cell_limit) {
                        paint(cell, col, row);
                    }
                }
            } else {
                paint(cell, col, row);
            }
        }
    }
}

function paint(cell, colIndex, rowIndex) {
    if (cell.innerText % 2 === 0) {
        if (cell.style.backgroundColor === 'yellow') {
            cell.style.backgroundColor = defaultColor;
            --highlightedColCount[colIndex];
            --highlightedRowCount[rowIndex];
        } else {
            cell.style.backgroundColor = "yellow";
            ++highlightedColCount[colIndex];
            ++highlightedRowCount[rowIndex];
        }
    } else {
        if (cell.style.backgroundColor === 'pink') {
            cell.style.backgroundColor = defaultColor;
            --highlightedColCount[colIndex];
            --highlightedRowCount[rowIndex];
        } else {
            cell.style.backgroundColor = "pink";
            ++highlightedColCount[colIndex];
            ++highlightedRowCount[rowIndex];
        }
    }
}

function transpose() {
    const boardBody = document.querySelector("#board").firstElementChild;

    const cellArray = boardBody.querySelectorAll('td');

    boardBody.replaceChildren();
    [highlightedColCount, highlightedRowCount] = [highlightedRowCount, highlightedColCount];

    for (let i = 0; i < width; i++) {
        const row = boardBody.insertRow();
        for (let j = 0; j < height; j++) {
            row.append(cellArray[j * width + i]);
        }
    }
    [width, height] = [+height, +width];
}

function addRow() {
    highlightedRowCount.push(0);
    const boardBody = document.querySelector("#board").firstElementChild;
    const row = boardBody.insertRow();
    height++;
    for (let i = 0; i < width; i++) {
        let cell = row.insertCell();
        addCellStyle(cell);
    }
}

function addColumn() {
    highlightedColCount.push(0);
    const boardBody = document.querySelector("#board").firstElementChild;
    const rowsArray = boardBody.rows;
    width++;
    for (let i = 0; i < height; i++) {
        let cell = rowsArray[i].insertCell();
        addCellStyle(cell);
    }
}