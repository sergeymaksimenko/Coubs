class Coub {
    constructor(container) {
        this.container = container;

        this.tableElement = container.querySelector('.table');
        this.minusRowButton = container.querySelector(".minusRowButton");
        this.minusColumnButton = container.querySelector(".minusColumnButton");
        this.plusRowButton = container.querySelector('.plusRowButton');
        this.plusColumnButton = container.querySelector('.plusColumnButton');

        this.timerID = [];

        this.tableElement.addEventListener('mouseout', this.hideButtons.bind(this));
        this.minusColumnButton.addEventListener('click', this.deleteColumn.bind(this));
        this.minusRowButton.addEventListener('click', this.deleteRow.bind(this));
        this.minusRowButton.addEventListener('mouseout', this.hideButtons.bind(this));
        this.minusColumnButton.addEventListener('mouseover', this.stayButtonsVisible.bind(this));
        this.minusColumnButton.addEventListener('mouseout', this.hideButtons.bind(this));
        this.minusRowButton.addEventListener('mouseover', this.stayButtonsVisible.bind(this));
        this.plusRowButton.addEventListener('click', this.addRow.bind(this));
        this.plusColumnButton.addEventListener('click', this.addColumn.bind(this));
        this.addListenerToCells();
    }

    addListenerToCells() {
        this.tableElement.querySelectorAll('.cell').forEach(function(item) {
            item.addEventListener('mouseover', this.moveButtons.bind(this));
        }.bind(this));
    };

    moveButtons({target: currentTarget}) {
        this.stayButtonsVisible();
        this.minusColumnButton.style.left = `${currentTarget.offsetLeft - this.tableElement.offsetLeft + this.minusRowButton.offsetWidth + 1}px`;
        this.minusRowButton.style.top = `${currentTarget.offsetTop - this.tableElement.offsetTop}px`;
    }

    stayButtonsVisible() {
        while (this.timerID.length > 0) {
            clearTimeout(this.timerID.pop());
        }
        this.setButtonsVisibility('visible');
    }

    setButtonsVisibility(visibility) {
        this.minusColumnButton.style.visibility = this.minusRowButton.style.visibility = visibility;
        if (this.isRowSingle())
            this.minusRowButton.style.visibility = 'hidden';
        if (this.isColumnSingle())
            this.minusColumnButton.style.visibility = 'hidden';
    }

    deleteColumn() {
        let filteredCells = [...this.tableElement.querySelectorAll('.cell')].filter(function(item) {
            return item.offsetLeft === this.minusColumnButton.offsetLeft;
        }.bind(this));
        this.deleteElementsFromDOM(filteredCells);
    }

    deleteRow() {
        let filteredCells = [...this.tableElement.querySelectorAll('.tableRow')].filter(function(item) {
            return item.offsetTop === this.minusRowButton.offsetTop;
        }.bind(this));
        this.deleteElementsFromDOM(filteredCells);
    }

    addRow() {
        let row = this.tableElement.querySelector('.tableRow');
        this.tableElement.appendChild(row.cloneNode(true));
        this.addListenerToCells();
    }

    addColumn() {
        let tableRows = this.tableElement.querySelectorAll('.tableRow');
        tableRows.forEach(function(item) {
            item.appendChild(item.firstElementChild.cloneNode(true));
        });
        this.addListenerToCells();
    }

    hideButtons() {
        this.timerID.push(setTimeout(function() {
            this.setButtonsVisibility('hidden');
        }.bind(this), 200));
    }

    deleteElementsFromDOM(elements) {
        elements.forEach(function(item) {
            item.remove();
        })
    }

    isRowSingle() {
        return this.tableElement.querySelectorAll('.tableRow').length === 1;
    }

    isColumnSingle() {
        return this.tableElement.querySelectorAll('.tableRow:nth-child(1) .cell').length === 1;
    }

    cloneCoub() {
        return this.container.parentElement.appendChild(this.container.cloneNode(true));
    }
}
