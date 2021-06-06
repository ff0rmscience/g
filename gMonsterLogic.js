function moveMonster(which) {
    var direction = randint(4);
    var old_x = monsterPos[which][0];
    var old_y = monsterPos[which][1];
    var new_x = old_x, new_y = old_y;
    switch (direction) {

        case 0:
            new_y = old_y - 1;
            break;
        case 1:
            new_y = old_y + 1;
            break;
        case 2:
            new_x = old_x - 1;
            break;
        case 3:
            new_x = old_x + 1;
            break;

    }
    if (new_x < 0) new_x = cols - 1;
    if (new_x > cols - 1) new_x = 0;
    if (new_y < 0) new_y = rows - 1;
    if (new_y > rows - 1) new_y = 0;
    switch (board[new_x][new_y]) {
        case 0: playSound("siren");
            score = 0;
            new_x = old_x; new_y = old_y;
            monsters = 1;
            newLevel(1);
            break;
        case 1: break;
        case 2: new_x = old_x; new_y = old_y; break;
        case 3:
        case 4:
        case 5:
            new_x = old_x; new_y = old_y;
            break;
    }
    monsterPos[which][0] = new_x;
    monsterPos[which][1] = new_y;
    board[old_x][old_y] = 1;
    board[new_x][new_y] = 4;
    //draw_board();
    //drawMonster(which);
}
