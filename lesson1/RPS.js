/*
Textual description:
RPS is a two-player game where each player chooses one of three possible moves: rock, paper, or scissors.
The winner is chosen by comparing their moves with the following rules:

- Rock crushes scissors, i.e., rock wins against scissors
- Scissors cuts paper, i.e., scissors beats paper
- Paper wraps rock, i.e., paper beats rock
- If players chose the same move, the game is a tie
- Game is over once one of the players reach 5 points score
- Player reaching 5 points score first wins

Extract significant nouns and verbs from the description
Nouns: player, move, rule, score
Verbs: choose, compare

Organize and associate the verbs with the nouns
Player
  - choose
Move
Rule

  - compare
*/
const readline = require("readline-sync");

const RPSGame = {
    human: createHuman(),
    computer: createComputer(),

    displayWelcomeMessage() {
        console.log("Welcome to Rock, Paper, Scissors!");
    },

    displayGoodbyeMessage() {
        console.log("Thanks for playing Rock, Paper, Scissors. Goodbye!");
    },

    displayWinner() {
        let humanMove = this.human.move;
        let computerMove = this.computer.move;

        console.log(`You chose: ${this.human.move}`);
        console.log(`Computer choose: ${this.computer.move}`);

        if ((humanMove === "rock" && computerMove === "scissors") ||
            (humanMove === "paper" && computerMove === "rock") ||
            (humanMove === "scissors" && computerMove === "paper")) {
                this.human.score += 1;
                console.log("You win!");
        } else if ((humanMove === "rock" && computerMove === "paper") ||
            (humanMove === "paper" && computerMove === "scissors") ||
            (humanMove === "scissors" && computerMove === "rock")) {
                this.computer.score += 1;
                console.log("Computer wins!");
        } else {
            console.log("It's a tie.");
        }

    },

    playAgain() {
        let answer = readline.question("Would you like to play again? (y/n) ");
        return answer[0].toLowerCase() === "y";
    },

    continueToNextRound() {
        console.log("Tap 'Enter' to continue.");
        readline.question();
        console.clear();
    },

    play() {

        do {
            this.displayWelcomeMessage();
            let round = 0;

            while (this.human.score !== 5 && this.computer.score !== 5) {
                let scoreText = `🧑‍ - ${this.human.score}, 💻 - ${this.computer.score}`;
                console.log(`Round ${round += 1}: ${scoreText}`);
                
                let divideLine = `${"_".repeat(scoreText.length)}`;
                console.log(divideLine);

                this.human.choose();
                this.computer.choose();
                this.displayWinner();

                this.continueToNextRound();
            }
            console.clear();
            
        } while(this.playAgain());
        
        this.displayGoodbyeMessage();
    },
};

RPSGame.play();

function createPlayer() {
    return {
        move: null,
        score: 0,
    };
}

function createHuman() {
    let playerObject = createPlayer();

    let humanObject = {

        choose() {
            let choice;

            while (!["rock", "paper", "scissors"].includes(choice)) {
                console.log("Please choose rock, paper, or scissors: ");
                choice = readline.question();
                if (["rock", "paper", "scissors"].includes(choice)) break;
                console.log("Sorry, invalid schoice.");
            }

            this.move = choice;
        },
    };

    return Object.assign(playerObject, humanObject);
}

function createComputer() {
    let playerObject = createPlayer();

    let computerObject = {
        choose() {
            const choices = ["rock", "paper", "scissors"];
            let randomIndex = Math.floor(Math.random() * choices.length);
            this.move = choices[randomIndex];
        },
    };

    return Object.assign(playerObject, computerObject);
}