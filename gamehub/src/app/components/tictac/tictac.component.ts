import { Component, Output, EventEmitter } from '@angular/core';

interface Square {
  value: string | null;
  id: number;
}

@Component({
  selector: 'app-tictac',
  templateUrl: './tictac.component.html',
  styleUrls: ['./tictac.component.scss'],
})
export class TictacComponent {
  @Output() close = new EventEmitter<boolean>();

  squares: Square[] = [
    { value: null, id: 1 },
    { value: null, id: 2 },
    { value: null, id: 3 },
    { value: null, id: 4 },
    { value: null, id: 5 },
    { value: null, id: 6 },
    { value: null, id: 7 },
    { value: null, id: 8 },
    { value: null, id: 9 },
  ];

  playerXScore: number = 0;
  playerOScore: number = 0;

  playerTurn: string = 'O';
  turn = 0;
  disableResetButton = true;
  disableScoreButton = true;
  winner: string = '';

  placeValue(square: Square) {
    if (square.value === null) {
      square.value = this.playerTurn;
      this.turn++;

      if (this.turn >= 5) {
        this.checkWinner();
      }

      if (this.turn === 9 && this.winner === '') {
        this.winner = 'Tie Game!';
        this.disableResetButton = false;
      }

      this.playerTurn = this.playerTurn === 'X' ? 'O' : 'X';
    }
  }

  checkWinner() {
    let winningCombos = [
      [1, 2, 3],
      [1, 5, 9],
      [1, 4, 7],
      [2, 5, 8],
      [3, 5, 7],
      [3, 6, 9],
      [4, 5, 6],
      [7, 8, 9],
    ];

    let x = this.squares
      .filter((square) => square.value === this.playerTurn)
      .map((square) => square.id);

    winningCombos.forEach((combo) => {
      if (combo.every((num) => x.includes(num))) {
        this.winner = 'Player ' + this.playerTurn + ' wins!!!';
        this.playerTurn === 'X' ? this.playerXScore++ : this.playerOScore++;
        this.disableResetButton = false;
      }
    });
  }

  resetGame() {
    this.squares.forEach((square) => (square.value = null));
    this.winner = '';
    this.turn = 0;
    this.disableResetButton = true;
  }
}
