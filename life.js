document.addEventListener('DOMContentLoaded', () => {
    let board = document.getElementById('board');
    let squareSize = 50;    //size in pixel
    let squares = [];

    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;

    let width = Math.floor((windowWidth - 16)/ (squareSize + 1));
    let height = Math.floor((windowHeight - 16)/ (squareSize + 1));

    board.style.width = width * squareSize + width + "px";
    board.style.height = height * squareSize + height + "px";

    for(let i = 0; i < width*height; i++) {
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

});