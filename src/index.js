const myScoreDisplay = document.getElementById("myScore");
const aiScoreDisplay = document.getElementById("aiScore");
let myScore = 0;
let aiScore = 0;

/**
 * Updates UI with actual score values.
 */
function updateScoreDisplay() {
    myScoreDisplay.innerText = myScore;
    aiScoreDisplay.innerText = aiScore;
}

updateScoreDisplay();

/**
 * Returns 1 if p1 won the game, -1 if p2, and 0 if tied.
 */
function winner(p1, p2) {
    if (p1 == p2) {
        return 0;
    } else if (p1 == 'Rock') {
        if (p2 == 'Scissors') {
            return 1;
        } else if (p2 == 'Paper') {
            return -1;
        }
    } else if (p1 == 'Scissors') {
        if (p2 == 'Rock') {
            return -1;
        } else if (p2 == 'Paper') {
            return 1;
        }
    } else {
        if (p2 == 'Scissors') {
            return -1;
        } else if (p2 == 'Rock') {
            return 1;
        }
    }
}


function randomMove() {
    let choice = Math.random() * 3;

    if (choice < 1) {
        return "Rock";
    } else if (choice < 2) {
        return "Paper";
    } else {
        return "Scissors";
    }
}

document.querySelectorAll(".buttons button").forEach((button) => {
    button.addEventListener("click", (event) => {
        let myMove = button.innerText;
        let aiMove = randomMove();

        document.getElementById("myMove").innerText = myMove;
        document.getElementById("aiMove").innerText = aiMove;

        let winPlayer = winner(myMove, aiMove);
        if (winPlayer == 1) {
            myScore++;
            flashHighlight(myScoreDisplay);

        } else if (winPlayer == -1) {
            aiScore++;
            flashHighlight(aiScoreDisplay);
        }

        setTimeout(updateScoreDisplay, 300);
    })
});

function flashHighlight(winaner) {
    winaner.classList.add("active");
    setTimeout(() => {
        winaner.classList.remove("active");
    }, 1000);
}