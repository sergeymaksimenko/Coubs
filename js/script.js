window.onload = function () {
    const tableElement = document.querySelector('.table');
    const minusRowButton = document.querySelector(".minusRowButton");
    const minusColumnButton = document.querySelector(".minusColumnButton");
    const plusRowButton = document.querySelector('.plusRowButton');
    const plusColumnButton = document.querySelector('.plusColumnButton');
    let timerID = [];

    const addListenerToCells = function () {
        tableElement.querySelectorAll('.cell').forEach(function (item) {
            item.addEventListener('mouseover', moveButtons);
        });
    };

    function hideButtons() {
        timerID.push(setTimeout(function () {
            setButtonsVisibility('hidden');
        }, 200));
    }

    addListenerToCells();

    tableElement.addEventListener('mouseout', hideButtons);
    minusColumnButton.addEventListener('mousedown', deleteColumn);
    minusRowButton.addEventListener('mousedown', deleteRow);
    minusRowButton.addEventListener('mouseout', hideButtons);
    minusColumnButton.addEventListener('mouseover', stayButtonsVisible);
    minusColumnButton.addEventListener('mouseout', hideButtons);
    minusRowButton.addEventListener('mouseover', stayButtonsVisible);
    plusRowButton.addEventListener('mousedown', addRow);
    plusColumnButton.addEventListener('mousedown', addColumn);

    function moveButtons({target: currentTarget}) {
        stayButtonsVisible();
        minusColumnButton.style.left = `${currentTarget.offsetLeft - tableElement.offsetLeft + minusRowButton.offsetWidth}px`;
        minusRowButton.style.top = `${currentTarget.offsetTop - tableElement.offsetTop}px`;
    }

    function stayButtonsVisible() {
        while (timerID.length > 0) {
            clearTimeout(timerID.pop());
        }
        setButtonsVisibility('visible');
    }

    function setButtonsVisibility(visibility) {
        minusColumnButton.style.visibility = minusRowButton.style.visibility = visibility;
        if (isRowSingle())
            minusRowButton.style.visibility = 'hidden';
        if (isColumnSingle())
            minusColumnButton.style.visibility = 'hidden';
    }

    function deleteColumn({target: currentButton}) {
        let filteredCells = [...tableElement.querySelectorAll('.cell')].filter(function (item) {
            return item.offsetLeft === currentButton.offsetLeft;
        });
        deleteElementsFromDOM(filteredCells);
    }

    function deleteRow({target: currentButton}) {
        let filteredCells = [...tableElement.querySelectorAll('.tableRow')].filter(function (item) {
            return item.offsetTop === currentButton.offsetTop;
        });
        deleteElementsFromDOM(filteredCells);
    }

    function addRow() {
        let row = tableElement.querySelector('.tableRow');
        tableElement.appendChild(row.cloneNode(true));
        addListenerToCells();
    }

    function addColumn() {
        let tableRows = tableElement.querySelectorAll('.tableRow');
        tableRows.forEach(function (item) {
            item.appendChild(item.firstElementChild.cloneNode(true));
        });
        addListenerToCells();
    }

    function deleteElementsFromDOM(elements) {
        elements.forEach(function (item) {
            item.remove();
        })
    }

    function isRowSingle() {
        return tableElement.querySelectorAll('.tableRow').length === 1;
    }

    function isColumnSingle() {
        return tableElement.querySelectorAll('.tableRow:nth-child(1) .cell').length === 1;
    }
};