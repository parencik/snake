const size = 50;
document.addEventListener("DOMContentLoaded", () => {
    const grid = document.querySelector(".grid");
    for (let i = 1; i <= size * size; i++) {
        grid.appendChild(document.createElement("div"));
    }
    const squares = document.querySelectorAll(".grid div");
    const scoreDisplay = document.querySelector("span");
    const startBtn = document.querySelector(".start");
    const stopBtn = document.querySelector(".stop");

    const width = size;
    let currentIndex = 0 //first div in our grid
    let appleIndex = 0 // first div in our grid
    let currentSnake = [2, 1, 0];

    let direction = 1;
    let score = 0;
    let speed = 0.99;
    let intervalTime = 0;
    let interval = 0;

    // starting/restarting game
    function startGame() {
        console.log("startGame!")
        currentSnake.forEach(index => squares[index].classList.remove("snake"))
        squares[appleIndex].classList.remove("apple");
        clearInterval(interval);
        score = 0;
        randomApple()
        direction = 1;
        scoreDisplay.innerText = score;
        intervalTime = 100;
        currentSnake = [2, 1, 0];
        currentIndex = 0;
        currentSnake.forEach(index => squares[index].classList.add("snake"));
        interval = setInterval(moveOutcomes, intervalTime)
    }

    // function dealing with ALL the move outcomes of the Snake
    function moveOutcomes() {
        console.log("moveOutcomes!")
        // dealing with snake hitting border and snake hitting itself
        console.log("squares", squares);
        if (
            (currentSnake[0] + width >= (width * width) && direction === width) || // hitting bottom
            (currentSnake[0] % width === width - 1 && direction === 1) || // hitting right wall
            (currentSnake[0] % width === 0 && direction === -1) || // hitting left wall
            (currentSnake[0] - width < 0 && direction === -width) || // hitting the top
            squares[currentSnake[0] + direction].classList.contains("snake") // hitting itself
        ) {
            // return clearInterval(interval)
            alert(`Your score is ${score}`)
            startGame()
        }
        const tail = currentSnake.pop() // removes last element of array and shows it
        squares[tail].classList.remove("snake"); // removes class of snake from tail
        currentSnake.unshift(currentSnake[0] + direction) // gives direction to the head of the array

        // dealing with snake getting apple
        if (squares[currentSnake[0]].classList.contains("apple")) {
            squares[currentSnake[0]].classList.remove("apple");
            squares[tail].classList.add("snake");
            currentSnake.push(tail);
            randomApple();
            score++;
            scoreDisplay.textContent = score;
            clearInterval(interval);
            intervalTime = intervalTime * speed;
            interval = setInterval(moveOutcomes, intervalTime);
        }
        squares[currentSnake[0]].classList.add("snake");
    }

    // generating random app-le
    function randomApple() {
        console.log("randomApple!")
        do {
            appleIndex = Math.floor(Math.random() * squares.length);
        } while (squares[appleIndex].classList.contains("snake"))
        squares[appleIndex].classList.add("apple");
    }

    // assign fnuctions to keycodes
    function control(e) {
        console.log("control!")
        squares[currentIndex].classList.remove("snake");
        if (e.keyCode === 39 && direction !== -1) {
            direction = 1; //pressing right arrow turns right
        } else if (e.keyCode === 38 && direction !== +width) {
            direction = -width; // pressing up arrow goes up
        } else if (e.keyCode === 37 && direction !== 1) {
            direction = -1; // pressing left turns left
        } else if (e.keyCode === 40 && direction !== -width) {
            direction = +width; // pressing right turns right
        }
    }

    function stopGame() {
        clearInterval(interval)
    }

    document.addEventListener("keyup", control);
    startBtn.addEventListener("click", startGame);
    stopBtn.addEventListener("click", stopGame);
})