let squares = [];
let shadowSquares = [];
let width = 0;
let height = 0;
let interval;
let isStarted = false;
let isPaused = false;
let squareSize;    //size in pixel
let speed = parseFloat(0.5);

document.addEventListener('DOMContentLoaded', () => {
    boardSetting();
});

function drawBoard() {
    squares = [];
    shadowSquares = [];
    let board = document.getElementById('board');
    board.innerHTML = "";
    let shadowBoard = document.getElementById('shadow_board');
    shadowBoard.innerHTML = "";
    let main = document.getElementById('main');

    var windowWidth = main.offsetWidth;
    var windowHeight = main.offsetHeight;

    width = Math.floor((windowWidth)/ (squareSize + 1));
    height = Math.floor((windowHeight)/ (squareSize + 1));

    board.style.width = width * squareSize + width + "px";
    board.style.height = height * squareSize + height + "px";

    let squareCnt = width*height;


    for(let i = 0; i < squareCnt; i++) {
        let square = document.createElement('div');
        square.setAttribute('id', i);
        square.style.width = squareSize + "px";
        square.style.height = squareSize + "px";
        square.addEventListener('click', () => {
            if (square.classList.contains('black')) 
                square.classList.remove('black')
            else 
                square.classList.add('black');
        })
        board.appendChild(square);
        squares.push(square);     
    }

    //Create shadow board
    for(let i = squareCnt; i < (squareCnt * 2); i++) {
        let square = document.createElement('div');
        square.setAttribute('id', i);
        shadowBoard.appendChild(square);
        shadowSquares.push(square);     
    }
}

function fillRandom(cnt) {
    let blackAmount = cnt;
    //get shuffled game array with random blacks
    const blacksArray = Array(blackAmount).fill('black')
    const emptyArray = Array(width*height - blackAmount).fill('white')
    const gameArray = emptyArray.concat(blacksArray)
    const shuffledArray = gameArray.sort(() => Math.random() -0.5)

    for(let i = 0; i < squares.length; i++) {
        squares[i].className = "";
        if (shuffledArray[i] == 'black') {
            squares[i].classList.add('black');
        }
    }
    neighbourCount();
}

function changeStatus() {
    let cnt = 0;
    for (let i = 0; i < squares.length; i++) {
        shadowSquares[i].className = "";
        cnt = squares[i].getAttribute('data');
        if (cnt == 2 ) {
            if (squares[i].classList.contains('black')) {
                shadowSquares[i].classList.add('black');
            }
        }
        else if (cnt == 3) {
            shadowSquares[i].classList.add('black');
        }
    }
    for (let i = 0; i < squares.length; i++) {
        if (shadowSquares[i].classList.contains('black')) {
            squares[i].classList.add('black');
        }
        else {
            squares[i].className = "";
        }
    }
    neighbourCount();
}

function neighbourCount() {
    for (let i = 0; i < squares.length; i++) {
        let cnt = 0;
        const isLeftEdge = (i % width === 0);
        const isRightEdge = (i % width === width -1);

        //not in the edges
        if (i > 0 && !isLeftEdge && squares[i -1].classList.contains('black')) cnt ++          //left
        if (i >= width && !isRightEdge && squares[i +1 -width].classList.contains('black')) cnt ++  //above right
        if (i >= width && squares[i -width].classList.contains('black')) cnt ++                    //above
        if (i > width && !isLeftEdge && squares[i -1 -width].classList.contains('black')) cnt ++  //above left
        if (i < squares.length-2 && !isRightEdge && squares[i +1].classList.contains('black')) cnt ++        //right
        if (i < squares.length-width && !isLeftEdge && squares[i -1 +width].classList.contains('black')) cnt ++  //below left
        if (i < squares.length-width-2 && !isRightEdge && squares[i +1 +width].classList.contains('black')) cnt ++ //below right
        if (i < squares.length-width-1 && squares[i +width].classList.contains('black')) cnt ++   
        squares[i].setAttribute('data', cnt)                 
        //squares[i].innerHTML = cnt;
    }
}

function start() {
    if (!isStarted) {
        interval = setInterval(changeStatus, speed * 1000);
        isStarted = true;
    }
}

function pause() {
    if (isStarted && !isPaused) {
        clearInterval(interval);
        isPaused = true;
    }
  }

function resume(timer) {
    if (isStarted && isPaused)  {
        interval = setInterval(changeStatus, speed * 1000);
        isPaused = false;
    }
}
  
function stop() {
    if (isStarted) {
        clearInterval(interval);
        isStarted = false;
    }
  }

function boardSetting() {
    let val = document.getElementById("squaresize");
    squareSize = parseInt(val.value);
    drawBoard();
}  

function fillBoard() {
    let val = parseInt(document.getElementById("frate").value);
    fillRandom(Math.round(width*height*val/100));
}

function setSpeed() {
    speed = parseFloat(document.getElementById("speed").value);
    if (isStarted) {
        clearInterval(interval);
        interval = setInterval(changeStatus, speed * 1000);
        isStarted = true;
    }
}