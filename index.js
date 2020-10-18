var timer, difficulty, row, col, countdown, counter = 120,
    score = 0,
    timesout, highest;

// function executed after dom is initialised

function start() {
    highest = localStorage.getItem('highest');
    if (highest) {
        document.getElementById('highest').innerHTML = highest;
    } else {
        highest = 0;
    }
}

// function executed when difficulty is changed

function change() {
    if (timer || countdown || timesout) {
        clear();
        counter = 120;
        score = 0;
    }
    difficulty = parseInt(document.getElementById('difficulty').value);
    createTable(difficulty);
    countdown = setInterval(changeCounter, 1000);
    timer = setInterval(changeColor, 1000);
    timesout = setTimeout(function () {
        resetData();
    }, 121000)
}

// function to create a table on selection of difficulty

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

// function to randomly change cell color to green

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

// function to update score on basis of color

function getColor(el) {
    var element = document.getElementById(el.target.id);
    if (element) {
        var color = element.style.backgroundColor;
        if (color == 'green') {
            score++;
            console.log(score)
        } else if (color == 'grey') {
            score--;
            if (score < 0) {
                score = 0;
            }
            console.log(score)
        }
    }
}

// function to update counter

function changeCounter() {
    document.getElementById('count').innerHTML = counter--;
}

// function executed at end of game
function resetData() {
    alert('Game Over!!!\nYour score is: ' + score);
    removeTable();
    if (timer || countdown || timesout) {
        clear();
    }
    document.getElementById('score').innerHTML = score;
    if (score > highest) {
        localStorage.setItem('highest', score);
        document.getElementById('highest').innerHTML = score;
    }
    counter = 120;
    score = 0;
    document.getElementById('difficulty').value = '';
}

// function executed on resetting the game

function reset() {
    removeTable();
    if (timer || timesout || countdown) {
        clear();
    }
    document.getElementById('score').innerHTML = '';
    document.getElementById('count').innerHTML = '';
    counter = 120;
    score = 0;
    document.getElementById('difficulty').value = '';
}

// function to clear all timers

function clear() {
    clearInterval(countdown);
    clearInterval(timer);
    clearTimeout(timesout);
}

// function to remove table

function removeTable() {
    var element = document.getElementById('table');
    if (element) {
        element.remove();
    }
}