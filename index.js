var timer, difficulty, row, col, countdown, counter = 120, score = 0, timesout, highest;

function start() {
    highest = localStorage.getItem('highest');
    if (highest) {
        document.getElementById('highest').innerHTML = highest;
    }
    else {
        highest = 0;
    }
}

function change() {
    if (timer || countdown || timesout) {
        clearInterval(timer);
        clearInterval(countdown);
        clearTimeout(timesout);
        counter = 120;
        score = 0;
    }
    difficulty = parseInt(document.getElementById('difficulty').value);
    createTable(difficulty);
    countdown = setInterval(changeText, 1000);
    timer = setInterval(changeColor, 1000);
    timesout = setTimeout(function () {
        resetData();
    }, 121000)
}

function createTable(size) {
    var element = document.getElementById('table');
    if (element) {
        element.remove();
    }
    var tablearea = document.getElementById('table-area');
    var table = document.createElement('div');
    table.id = 'table';
    table.className = 'container';
    for (var i = 0; i < size; i++) {
        var tr = document.createElement('div');
        tr.className = 'row'
        for (var j = 0; j < size; j++) {
            var td = document.createElement('div')
            td.className = 'col';
            td.id = i + '-' + j;
            td.style.border = '1px solid black'
            td.style.height = '50px';
            td.style.backgroundColor = 'grey';
            td.addEventListener('click', (el) => {
                getColor(el);
            });
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    tablearea.appendChild(table);
}

function changeColor() {
    if (row != 'undefined' && col != 'undefined') {
        var element = document.getElementById(row + '-' + col);
        if (element) {
            element.style.backgroundColor = 'grey';
        }
    }
    col = (Math.floor(Math.random() * difficulty));
    row = (Math.floor(Math.random() * difficulty));
    var element = document.getElementById(row + '-' + col)
    if (element) {
        element.style.backgroundColor = 'green';
    }
}

function getColor(el) {
    var element = document.getElementById(el.target.id);
    if (element) {
        var color = element.style.backgroundColor;
        if (color == 'green') {
            score++;
        }
    }
}

function changeText() {
    document.getElementById('count').innerHTML = counter--;
}

function resetData() {
    var element = document.getElementById('table');
    if (element) {
        element.remove();
    }
    clearInterval(countdown);
    clearInterval(timer);
    document.getElementById('score').innerHTML = score;
    if (score > highest) {
        localStorage.setItem('highest', score);
        document.getElementById('highest').innerHTML = score;
    }
    counter = 120;
    score = 0;
    document.getElementById('difficulty').value = '';
}