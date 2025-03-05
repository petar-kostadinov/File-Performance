
import { modAva } from "./ava.js";
import { modHanna } from "./hanna.js";
import { modMathis } from "./mathis.js";
//import { modNewFront } from "./newFront.js";
import { modSimon } from "./simon.js";
var tableRows;
var currentUrl = window.location.href;
let allowance;

export function init() {
    
    var cells = document.querySelectorAll('tbody td[contenteditable="true"]');
    cells.forEach(function (cell) {
        cell.addEventListener('blur', handleCellBlur);
        if (cell.cellIndex === 2 || cell.cellIndex === 3 || cell.cellIndex === 4) {
            cell.addEventListener('blur', validateColumn);
        }
    });

    document.getElementById('generate-button').addEventListener('click', function () {
        generateLogic()
        updateTableRows()

    });
    document.getElementById('clear-table').addEventListener('click', clearTable);

};

function validateColumn(event) {
    var inputValue = event.target.textContent.trim();
    var modal = document.getElementById('modal');
    var modalTitle = document.getElementById('modal-title');
    var modalMessage = document.getElementById('modal-message');
    var okButton = document.getElementById('ok-button');

    okButton.onclick = function() {
        modal.style.display = 'none';
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }
    
    if (inputValue.includes(',')) {
        event.target.classList.add('invalid-input');
        modalTitle.textContent = (`${currentUrl} ви изпраща съобщение:`);
        modalMessage.textContent = `Моля заменете ','  с  '.'`;
        modal.style.display = 'block';
    }

    else if (isNaN(parseFloat(inputValue))) {
        event.target.classList.add('invalid-input');
        modalTitle.textContent = (`${currentUrl} ви изпраща съобщение:`);
        modalMessage.textContent = 'Невалидна стойност за клетка. Моля, въведете число.';
        modal.style.display = 'block';
    }

    else {
        event.target.classList.remove('invalid-input');
        //messageElement.style.display = 'none';
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
        if (i === 2 || i === 3 || i === 4) {
            cell.addEventListener('blur', validateColumn);
        }
    }
    tableBody.appendChild(emptyRow);
}

function updateTableRows() {
    tableRows = document.querySelectorAll('#dynamic-table tbody tr');
}

function generateLogic() {

    var modal = document.getElementById('modal');
    var modalTitle = document.getElementById('modal-title');
    var modalMessage = document.getElementById('modal-message');
    var okButton = document.getElementById('ok-button');

    okButton.onclick = function() {
        modal.style.display = 'none';
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }
    
    if (!tableRows || tableRows.length === 0) {
        modalTitle.textContent = (`${currentUrl} ви изпраща съобщение:`);
        modalMessage.textContent = 'Таблицата е празна.';
        modal.style.display = 'block';
        return;
    }

    var selectedOption = document.querySelector('input[name="options"]:checked');
    var selectedMachine = document.querySelector('input[name="machines"]:checked');


    if (!selectedOption) {
        modalTitle.textContent = (`${currentUrl} ви изпраща съобщение:`);
        modalMessage.textContent = 'Моля, изберете опция.';
        modal.style.display = 'block';
        return;
    }

    if (!selectedMachine) {
        modalTitle.textContent = (`${currentUrl} ви изпраща съобщение:`);
        modalMessage.textContent = 'Моля, изберете машина.';
        modal.style.display = 'block';
        return;
    }
    var optionValue = selectedOption.value; // Стойността на опцията
    var machineValue = selectedMachine.value; // На коя машина

    if (machineValue === 'CNC') {
        allowance = 4;
    } else {
        allowance = 0;
    }


    var zip = new JSZip();

    tableRows.forEach(function (row) {
        var moduleName = row.children[0].textContent.trim(); // Името на модула от колона 1
        var partName = row.children[1].textContent.trim(); // Името на частта от колона 2
        var lValue = row.children[2].textContent.trim(); // Стойността на L от колона 3
        var bValue = row.children[3].textContent.trim(); // Стойността на B от колона 4
        var hValue = row.children[4].textContent.trim(); // Стойността на H от колона 5

        if (moduleName === '' && partName === '' && lValue === '' && bValue === '' && hValue === '') {
            return;
        }

        var fileContent;
        switch (optionValue) {
            case 'Simon':
                fileContent = modSimon(partName, lValue, bValue, hValue, allowance);
                break;
            case 'Hanna':
                fileContent = modHanna(partName, lValue, bValue, hValue, allowance);
                break;
            case 'Mathis':
                fileContent = modMathis(moduleName, partName, lValue, bValue, hValue, allowance);
                break;
            case 'Ava':
                fileContent = modAva(partName, lValue, bValue, hValue, allowance);
                break;
            default:
                fileContent = modNewFront(partName, lValue, bValue, hValue);
                break;
        }

        var folderName = moduleName.replace(/\s/g, '_');
        var fileName = partName + '.xcs';
        zip.folder(folderName).file(fileName, fileContent);
    });

    zip.generateAsync({ type: 'blob' }).then(function (content) {
        saveAs(content, `${optionValue}.zip`);
    });

    modalTitle.textContent = currentUrl;
    modalMessage.textContent = 'Файловете са генерирани и архивирани в ZIP формат.';
    modal.style.display = 'block';
}


function clearTable() {
    var tableBody = document.querySelector('tbody');
    tableBody.innerHTML = '';
    updateTableRows();
    addEmptyRow();

}
