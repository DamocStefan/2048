var columns = 4;
var rows = 4;
var score = 0;
var board;
window.onload = function () {
    initBoard();
}

function initBoard() {
    board = [
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0]
    ];
    for (let r = 0; r < rows; r++)
        for (let c = 0; c < columns; c++) {
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            updateTile(tile, board[r][c]);

            document.getElementById("board").append(tile);
        }

    addTwo();
    addTwo();
}


function updateTile(tile, num) {
    tile.innerText = "";
    tile.classList.value = "";
    tile.classList.add("tile");
    if (num > 0) {
        tile.innerText = num.toString();
        if (num <= 2048)
            tile.classList.add("n" + num.toString());
        else
            tile.classList.add("greaterThan2048");
    }
}

document.addEventListener("keyup", (e) => {
    if (e.code == "ArrowLeft")
        slideLeft();
    else if (e.code == "ArrowRight")
        slideRight();
    else if (e.code == "ArrowUp")
        slideUp();
    else if (e.code == "ArrowDown")
        slideDown();

        addTwo();
    document.getElementById("score").innerText = score;
});

function filterZero(row) {
    return row.filter(num => num != 0);
}

function slide(row) {
    row = filterZero(row);
    for (let i = 0; i < row.length - 1; i++) {
        if (row[i] == row[i + 1]) {
            row[i] *= 2;
            row[i + 1] = 0;
            score += row[i];
        }
    }
    row = filterZero(row);
    while (row.length < columns) {
        row.push(0);
    }
    return row;
}

function addTwo() {
    var ok = false;
    for (let r = 0; r < rows && !ok; r++)
        for (let c = 0; c < columns && !ok; c++)
            if (board[r][c] == 0)
               ok = true;

    if (ok) {
        ok = false;
        while (!ok) {
            let r = Math.floor(Math.random() * rows);
            let c = Math.floor(Math.random() * columns);
            if (board[r][c] == 0) {
                board[r][c]=2;
                let tile = document.getElementById(r.toString() + '-' + c.toString());
                tile.innerText = "2";
                tile.classList.add("n2");
                ok = true;
            }

        }
    }
}

function slideLeft() {
    for (let r = 0; r < rows; r++) {
        let row = board[r];
        row = slide(row);
        board[r] = row;
        for (let c = 0; c < columns; c++) {
            let tile = document.getElementById(r.toString() + '-' + c.toString());
            updateTile(tile, board[r][c]);
        }
    }

}

function slideRight() {
    for (let r = 0; r < rows; r++) {
        let row = board[r];
        row = slide(row.reverse());
        board[r] = row.reverse();
        for (let c = 0; c < columns; c++) {
            let tile = document.getElementById(r.toString() + '-' + c.toString());
            updateTile(tile, board[r][c]);
        }
    }

}

function slideUp() {
    for (let c = 0; c < columns; c++) {
        let row = [0];
        for (let r = 0; r < rows; r++) {
            row.push(board[r][c]);
        }
        row = slide(row);
        for (let r = 0; r < rows; r++) {
            board[r][c] = row[r];
            let tile = document.getElementById(r.toString() + '-' + c.toString());
            updateTile(tile, board[r][c]);
        }
    }

}

function slideDown() {
    for (let c = 0; c < columns; c++) {
        let row = [0];
        for (let r = 0; r < rows; r++) {
            row.push(board[r][c]);
        }
        row = slide(row.reverse());
        row.reverse();
        for (let r = 0; r < rows; r++) {
            board[r][c] = row[r];
            let tile = document.getElementById(r.toString() + '-' + c.toString());
            updateTile(tile, board[r][c]);
        }
    }

}