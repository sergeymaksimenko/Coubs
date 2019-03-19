window.onload = function () {
    let cellElements = document.getElementsByClassName('cell');
    Array.prototype.forEach.call(cellElements, function (element) {
        element.addEventListener('mousemove', function () {
            moveButtons(element)
        }, false);
        element.addEventListener('mouseout', hideButtons, false);
    });
};

function moveButtons(element) {
    let buttonMinusColumn = document.querySelector('.buttonMinusColumn');
    let buttonMinusRow = document.querySelector('.buttonMinusRow');
    buttonMinusColumn.style.visibility = 'visible';
    buttonMinusRow.style.visibility = 'visible';
    let table = document.querySelector('.table');
    buttonMinusColumn.style.marginLeft = event.pageX - table.offsetLeft + (element.offsetWidth / 2) + 'px';
    buttonMinusRow.style.marginTop = event.pageY - table.offsetTop - (element.offsetHeight / 2) + 'px';
}

function hideButtons(event) {
    if (!event.relatedTarget.classList.contains('cell')) {
        let buttonMinusColumn = document.querySelector('.buttonMinusColumn');
        let buttonMinusRow = document.querySelector('.buttonMinusRow');
        buttonMinusColumn.style.visibility = 'hidden';
        buttonMinusRow.style.visibility = 'hidden';
    }
}