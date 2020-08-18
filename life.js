document.addEventListener('DOMContentLoaded', () => {
    const board = document.querySelector('.board');
    let squareSize = 50;
    let width = Math.floor(board.clientWidth / squareSize);
    let height = Math.floor(board.clientHeight / squareSize);
    let squares = [];

    for(let i = 0; i <= width*height; i++) {
        const square = document.createElement('div');
        square.setAttribute('id', i);
        board.appendChild(square)
        squares.push(square);     
    }

});