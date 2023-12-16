const blockSize = 25;
const rows = 20;
const columns = 20;
let board;
let context;
const resetButton = document.querySelector(".reset-button")

// Snake head

let snakeX = blockSize * 5;
let snakeY = blockSize * 5;
let velocityX = 0;
let velocityY = 0;

const snakeBody = [];

// Food
let foodX;
let foodY;

let gameOver = false;

window.onload = () => {
    board = document.querySelector('#board');
    board.height = rows * blockSize;
    board.width = columns * blockSize;
    context = board.getContext('2d');

    placeFood();
    document.addEventListener('keyup', changeDirection)
    setInterval(update, 1000 / 10)
}


// const initializeGame = () => {
//     board = document.querySelector('#board');
//     board.height = rows * blockSize;
//     board.width = columns * blockSize;
//     context = board.getContext('2d');
    
//     placeFood();
//     document.addEventListener('keyup', changeDirection)
//     setInterval(update, 1000 / 10)
// }

// window.onload = () => initializeGame()

const update = () => {
    if (gameOver) {
        return
    }

    context.fillStyle = 'beige';
    context.fillRect(0, 0, board.width, board.height);

    //Food
    context.fillStyle = 'pink';
    context.fillRect(foodX, foodY, blockSize, blockSize)

    if (snakeX === foodX && snakeY === foodY) {
        snakeBody.push([foodX, foodY])
        placeFood();
    }

    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }
    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY]
    }

    //Snake body
    context.fillStyle = 'lime';
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize);

    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }

    //Game over conditions
    if (snakeX < 0 || snakeX > columns * blockSize ||
        snakeY < 0 || snakeY > rows * blockSize) {
        gameOver = true;
        alert("Game Over: Snake bit wall")
    }

    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
            gameOver = true;
            alert("Game Over: Snake bit itself")
        }
    }

}



const placeFood = () => {
    foodX = Math.floor(Math.random() * columns) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;
}

const changeDirection = (event) => {
    if (event.code === 'ArrowUp' && velocityY !== 1) {
        velocityX = 0;
        velocityY = -1;
    }
    else if (event.code === 'ArrowDown' && velocityY !== -1) {
        velocityX = 0;
        velocityY = 1;
    }
    else if (event.code === 'ArrowLeft' && velocityX !== 1) {
        velocityX = -1;
        velocityY = 0;
    }
    else if (event.code === 'ArrowRight' && velocityX !== -1) {
        velocityX = 1;
        velocityY = 0;
    }
}

// resetButton.addEventListener('click', initializeGame)