const { remote } = require("electron");
const myScoreDisplay = document.getElementById("myScore");
const aiScoreDisplay = document.getElementById("aiScore");
// let myScore = 0;
// let aiScore = 0;

function setScore(player, score) {
    remote.getGlobal("score")[player] = score;
}

function getScore(player, score) {
    return remote.getGlobal("score")[player];
}

/**
 * Updates UI with actual score values.
 */
function updateScoreDisplay() {
    myScoreDisplay.innerText = remote.getGlobal("score")["me"];
    aiScoreDisplay.innerText = remote.getGlobal("score")["ai"];
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
        let statusDisplay = document.getElementById("status");

        document.getElementById("myMove").innerText = myMove;
        document.getElementById("aiMove").innerText = aiMove;

        let winPlayer = winner(myMove, aiMove);
        if (winPlayer == 1) {
            setScore("me", getScore("me") +1);
            flashHighlight(myScoreDisplay);
            statusDisplay.innerText = ("You won this round!");

        } else if (winPlayer == -1) {
            setScore("ai", getScore("ai") +1);
            flashHighlight(aiScoreDisplay);
            statusDisplay.innerText = ("You lost this round...");
        } else {
            flashHighlight(aiScoreDisplay);
            flashHighlight(myScoreDisplay);
            statusDisplay.innerText = ("It's a tie.");
        }

        setTimeout(updateScoreDisplay, 250);
    })
});

function flashHighlight(winaner) {
    winaner.classList.add("active");
    setTimeout(() => {
        winaner.classList.remove("active");
    }, 500);
}