
import { modAva } from "./ava.js";
import { modHanna } from "./hanna.js";
import { modMathis } from "./mathis.js";
import { modNewFront } from "./newFront.js";
import { modSimon } from "./simon.js";
var tableRows;

document.addEventListener('DOMContentLoaded', function () {
    var cells = document.querySelectorAll('tbody td[contenteditable="true"]');
    cells.forEach(function (cell) {
        cell.addEventListener('blur', handleCellBlur);
        if (cell.cellIndex === 2 || cell.cellIndex === 3 || cell.cellIndex === 4) { // Проверка за колона B (индекс 3)
            cell.addEventListener('blur', validateColumn);
        }
    });

    document.getElementById('generate-button').addEventListener('click', function () {
        generateLogic()
        updateTableRows()

    });
    document.getElementById('clear-table').addEventListener('click', clearTable);

});


function validateColumn(event) {
    var inputValue = parseInt(event.target.textContent.trim());
    if (isNaN(inputValue)) {
        event.target.classList.add('invalid-input');
        alert('Невалидна стойност за клетка. Моля, въведете число.');
    } else {
        event.target.classList.remove('invalid-input');
    }

}

function handleCellBlur(event) {
    var cell = event.target;
    var row = cell.parentElement;
    var cells = row.querySelectorAll('td[contenteditable="true"]');
    var lastCell = cells[cells.length - 1];
    var isLastCell = cell === lastCell;
    var isRowFilled = Array.from(cells).every(function (cell) {
        return cell.textContent.trim() !== '';
    });

    if (isLastCell && isRowFilled) {
        addEmptyRow();
        updateTableRows();
    }
}

function addEmptyRow() {
    var emptyRow = document.createElement('tr');
    emptyRow.classList.add('empty-row');
    var tableBody = document.querySelector('tbody');
    var cellCount = document.querySelector('thead tr').childElementCount;
    for (var i = 0; i < cellCount; i++) {
        var cell = document.createElement('td');
        cell.setAttribute('contenteditable', 'true');
        emptyRow.appendChild(cell);
        cell.addEventListener('blur', handleCellBlur);
        if (i === 2 || i === 3 || i === 4) { // Проверка за колонките L (индекс 2), B (индекс 3) и H (индекс 4)
            cell.addEventListener('blur', validateColumn);
        }
    }
    tableBody.appendChild(emptyRow);
}

function updateTableRows() {
    tableRows = document.querySelectorAll('#dynamic-table tbody tr'); // Обновяване на променливата tableRows
}

function generateLogic() {
    // Прочитаме информацията от таблицата
    if (!tableRows || tableRows.length === 0) {
        alert('Таблицата е празна.');
        return;
    }

    // Прочитаме информацията от радиобутоните
    var selectedOption = document.querySelector('input[name="options"]:checked');
    if (!selectedOption) {
        alert('Моля, изберете опция.');
        return;
    }
    var optionValue = selectedOption.value; // Стойността на опцията




    // Създаваме ZIP архив
    var zip = new JSZip();

    // Създаваме папката за всеки ред от таблицата и добавяме съответния файл в нея
    tableRows.forEach(function (row) {
        var moduleName = row.children[0].textContent.trim(); // Името на модула от колона 1
        var partName = row.children[1].textContent.trim(); // Името на частта от колона 2
        var lValue = row.children[2].textContent.trim(); // Стойността на L от колона 3
        var bValue = row.children[3].textContent.trim(); // Стойността на B от колона 4
        var hValue = row.children[4].textContent.trim(); // Стойността на H от колона 5

        // Проверка дали има празен ред
        if (moduleName === '' && partName === '' && lValue === '' && bValue === '' && hValue === '') {
            return; // Пропускаме генерирането на файл за празния ред
        }

        // Определяне на текста за файла спрямо избрания радиобутон
        var fileContent;
        switch (optionValue) {
            case 'Simon':
                fileContent = modSimon(partName, lValue, bValue, hValue);
                break;
            case 'Hanna':
                fileContent = modHanna(partName, lValue, bValue, hValue);
                break;
            case 'Mathis':
                fileContent = modMathis(partName, lValue, bValue, hValue);
                break;
            case 'Ava':
                fileContent = modAva(partName, lValue, bValue, hValue);
                break;
            default:
                fileContent = modNewFront(partName, lValue, bValue, hValue);
                break;
        }

        // Добавяне на файла в ZIP архива
        var folderName = moduleName.replace(/\s/g, '_');
        var fileName = partName + '.xcs';
        zip.folder(folderName).file(fileName, fileContent);
    });

    // Генериране на ZIP архива и изтегляне
    zip.generateAsync({ type: 'blob' }).then(function (content) {
        saveAs(content, `${optionValue}.zip`);
    });

    alert('Файловете бяха генерирани успешно и архивирани в ZIP формат.');
}


function clearTable() {
    var tableBody = document.querySelector('tbody');
    tableBody.innerHTML = ''; // Изчистване на съдържанието на tbody
    updateTableRows();
    addEmptyRow(); // Добавяне на празен ред

}
