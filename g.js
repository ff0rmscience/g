
var d = document.getElementById("can");
var c = d.getContext("2d");
var x = 0, y = 0, x_inc = 21, y_inc = 36, cell_types = 4;
var old_x, old_y;
//var player_code = 928; var monster_code = 923;
var itemCode = [2866, 32, 9617, 9608, 2866, 10624];
var itemColor = ["red", "white", "white", "gray", "green", "yellow"];
//player, space, space, wall, monster
var W = can.width, H = can.height, rows = 15, cols = 28;
var monsters = 1;
var goals = 1;
var mutation = 20;
var highScore = 0;
board = Create2DArray(100);
monsterPos = Create2DArray(100);
goalPos = Create2DArray(100);
x = randint(cols);
y = randint(rows);
//monsterPos[0][0] = 10;
//monsterPos[0][1] = 10;
var score = 0;

//c.font = "30px Helvetica";
c.font = "30px Arial"
//clear();
var snd = new Audio("boing.mp3"); // buffers automatically when created

createBoard();
addMonsters(1);
addGoals(1);
drawBoard();
//alert();
setInterval(moveMonsters, 500);
setInterval(drawBoard, 25);
setInterval(mutate, 500);

function touchStarted() {
    getAudioContext().resume();
}

function createBoard() {

    board[x][y] = 0;
    for (var bx = 0; bx < cols; bx++) {
        for (var by = 0; by < rows; by++) {
            if (bx != x || by != y) {
                board[bx][by] = randint(3) + 1;

            }
        }
    }
}

function mutate() {
    for (var b = 0; b < mutation; b++) {
        thisX = randint(cols);
        thisY = randint(rows);
        switch (board[thisX][thisY]) {
            case 3:
                board[thisX][thisY] = 1;
                break;
            case 1:
                board[thisX][thisY] = 3;
                break;

        }

    }
}

function addMonsters(numMonsters) {
    var mx = 0;
    var my = 0;
    for (var m = 0; m < numMonsters; m++) {
        do {
            mx = randint(cols);
            my = randint(rows);

        }
        while (board[mx][my] != 1);
        monsterPos[m][0] = mx;
        monsterPos[m][1] = my;
        board[mx][my] = 4;
    }
}
function addGoals(numGoals) {
    var gx = 0;
    var gy = 0;
    goals = numGoals;
    for (var g = 0; g < numGoals; g++) {
        do {
            gx = randint(cols);
            gy = randint(rows);

        }
        while (board[gx][gy] != 1);
        goalPos[g][0] = gx;
        goalPos[g][1] = gy;
        board[gx][gy] = 5;
    }

}

function newLevel(m) {
    mutation = 20+randint(50);
    createBoard();
    addMonsters(m);
    addGoals(1);
    //sound();

}

function startOver() {
    monsters = 1;
    goals = 1;
    newLevel(1);
}

function drawBoard() {
    clear();
    for (var bx = 0; bx < cols; bx++) {
        for (var by = 0; by < rows; by++) {
            c.fillStyle = itemColor[board[bx][by]];
            printw(bx * x_inc + x_inc, by * y_inc + y_inc,
                String.fromCharCode(itemCode[board[bx][by]]));

        }
    }
    c.fillStyle = 'white';
    //printw(cols*x_inc + x_inc, rows*y_inc+y_inc,
    // score.toString())
    //printw(x_inc, y_inc,
    //    score.toString() + "/" + highScore);
}


function randint(max) {
    return Math.floor(Math.random() * max);
}

function rancolor() {

    return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

function printw(x, y, text) {
    c.fillText(text, x, y);
}
document.addEventListener('keydown', (event) => {
    old_x = x; old_y = y;
    switch (event.key) {
        case "ArrowUp": y -= 1; break;
        case "ArrowDown": y += 1; break;
        case "ArrowLeft": x -= 1; break;
        case "ArrowRight": x += 1; break;
        case "l": monsters = 20;newLevel(20);break;
        case "m" : mutation += 10;break;
    }
    if (x < 0) x = cols - 1;
    if (x > cols - 1) x = 0;
    if (y < 0) y = rows - 1;
    if (y > rows - 1) y = 0;
    switch (board[x][y]) {
        case 0: break;
        case 1: 
            playSound('sine',100,0.01);
            break;
        case 2:
            playSound('sin', 100, 0.04);
            break;
        case 3:
            x = old_x; y = old_y;
            break;
        case 4:
            x = old_x; y = old_y;
            playSound("siren");
            score = 0;
            monsters = 1;
            startOver();
            //alert('you lose!');
            break;
        case 5: score++;
            if (score > highScore) highScore = score;
            monsters++;
            playTone(chord["C"], "sine", 1);
            newLevel(monsters); break;

    }
    board[old_x][old_y] = 1;
    board[x][y] = 0;
    //snd.play();
    //playSound('square', 2000, 0.01);
    //drawSprite();


});

function clear() {
    c.fillStyle = 'black';
    c.fillRect(x_inc, 8, cols * x_inc, rows * y_inc+2);
}


function moveMonsters() {

    for (var m = 0; m < monsters; m++) moveMonster(m);
}

function Create2DArray(rows) {
    var arr = [];

    for (var i = 0; i < rows; i++) {
        arr[i] = [];
    }
    return arr;
}

