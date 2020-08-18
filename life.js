document.addEventListener('DOMContentLoaded', () => {
    let board = document.getElementById('board');
    let squareSize = 50;
    let width = Math.floor((window.innerWidth-5) / (squareSize + 1)) ;
    let height = Math.floor((window.innerHeight-5) / (squareSize + 1)) ;
    //let width = 5;
    //let height = 5;
    let squares = [];

    let w = (width * squareSize) + width;
    let h = (height *squareSize) + height;
    board.style.width = w + "px";
    board.style.height = h + "px";
    for(let i = 0; i < width*height; i++) {
        const square = document.createElement('div');
        square.setAttribute('id', i);
        board.appendChild(square)
        squares.push(square);     
    }

});