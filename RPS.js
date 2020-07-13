/*
Textual description:
RPS is a two-player game where each player chooses one of three possible moves: rock, paper, or scissors.
The winner is chosen by comparing their moves with the following rules:

- Rock crushes scissors, i.e., rock wins against scissors
- Scissors cuts paper, i.e., scissors beats paper
- Paper wraps rock, i.e., paper beats rock
- If players chose the same move, the game is a tie

Extract significant nouns and verbs from the description
Nouns: player, move, rule
Verbs: choose, compare

Organize and associate the verbs with the nouns
Player
  - choose
Move
Rule

  - compare
*/
const readline = require('readline-sync');

const RPSGame = {
  human: createPlayer('human'),
  computer: createPlayer('computer'),

  displayWelcomeMessage() {
    console.log('Welcome to Rock, Paper, Scissors!');
  },

  displayGoodbyeMessage() {
    console.log('Thanks for playing Rock, Paper, Scissors. Goodbye!');
  },
  displayWinner() {
    let humanMove = this.human.move;
    let computerMove = this.computer.move;
    
    console.log(`You choose: ${this.human.move}`);
    console.log(`Computer choose: ${this.computer.move}`);

    if ((humanMove === 'rock' && computerMove === 'scissors') ||
    (humanMove === 'paper' && computerMove === 'rock') ||
    (humanMove === 'scissors' && computerMove === 'paper')) {
      console.log('You win!');
    } else if ((humanMove === 'rock' && computerMove === 'paper') ||
    (humanMove === 'paper' && computerMove === 'scissors') ||
    (humanMove === 'scissors' && computerMove === 'rock')) {
      console.log('Computer wins!');
    }
  },

  playAgain() {
    console.log('Would you like to play again? (y/n) ');
    let answer = readline.question();
    return answer.toLowerCase()[0] === 'y';
  },

  play() {
    this.displayWelcomeMessage();
    while(true) {
      this.human.choose();
      this.computer.choose();
      this.displayWinner();
      if(!this.playAgain()) break;
    }
    this.displayGoodbyeMessage();
  },
};

RPSGame.play();

function createPlayer(playerType) {
  return {
    playerType: playerType,
    move: null,

    choose() {
      if (this.isHuman()) {
        let choice;

        while(true) {
          console.log('Please choose rock, paper, or scissors: ');
          choice = readline.question();
          if(['rock', 'paper', 'scissors'].includes(choice)) break;
          console.log('Sorry, invalid schoice.');
        }

        this.move = choice;
      } else {
        const choices = ['rock', 'paper', 'scissors'];
        let randomIndex = Math.floor(Math.random() * choices.length);
        this.move = choices[randomIndex];
      }
    },

    isHuman() {
      return this.playerType === 'human';
    }
  };
}
