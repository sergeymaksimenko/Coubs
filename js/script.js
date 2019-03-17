document.querySelector('.table').onmousemove = function (event) {
    let target = event.target;
    let buttonMinusColumn = document.querySelector('.buttonMinusColumn');
    let buttonMinusRow = document.querySelector('.buttonMinusRow');
    let table = document.querySelector('.table');
    buttonMinusColumn.style.marginLeft = event.pageX - table.offsetLeft + (target.offsetWidth / 2) + 'px';
    buttonMinusRow.style.marginTop = event.pageY - table.offsetTop + (target.offsetHeight / 2) + 'px';
};

