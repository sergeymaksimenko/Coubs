window.onload = function () {
    const tableElement = document.querySelector('.table');
    const cellElements = tableElement.querySelectorAll('.cell')
    const minusRowButton = tableElement.previousElementSibling;
    const minusColumnButton = minusRowButton.previousElementSibling;
    cellElements.forEach(function (item) {
        item.addEventListener('mouseover', moveButtons);
    });
    tableElement.addEventListener('mouseout', hideButtons);

    function moveButtons(event) {
        setButtonsVisibility('visible');
        minusColumnButton.style.marginLeft = event.target.offsetLeft - tableElement.offsetLeft + minusRowButton.offsetWidth + 'px';
        minusRowButton.style.marginTop = event.target.offsetTop - tableElement.offsetTop + 'px';
    }

    function hideButtons() {
        setButtonsVisibility('hidden');
    }

    function setButtonsVisibility(visibility) {
        minusColumnButton.style.visibility = minusRowButton.style.visibility = visibility;
    }
};
