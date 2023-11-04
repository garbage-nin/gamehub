import { Component, EventEmitter, Output } from '@angular/core';
import { interval } from 'rxjs';

interface TargetList {
  size: string;
  points: number;
  style: any;
  clicked: boolean;
  shown: boolean;
}

@Component({
  selector: 'app-shooting-game',
  templateUrl: './shooting-game.component.html',
  styleUrls: ['./shooting-game.component.scss'],
})
export class ShootingGameComponent {
  @Output() close = new EventEmitter<boolean>();
  playerXScore: number = 0;
  playerOScore: number = 0;
  currPlayerOScore: number = 0;
  currPlayerXScore: number = 0;
  playerTurn: string = 'O';
  winner: string = '';
  intervalId: any;
  targetList: TargetList[] = [];
  targetIndex = -1;
  targetCounter = 0;
  targetClickedCounter = 0;
  easyMode = [
    { size: 'easy', points: 1, count: 9, padding: '10px 15px' },
    { size: 'medium', points: 3, count: 7, padding: '7px 10px' },
    { size: 'hard', points: 5, count: 4, padding: '3px 5px' },
  ];

  medMode = [
    { size: 'easy', points: 1, count: 13, padding: '10px 15px' },
    { size: 'medium', points: 3, count: 9, padding: '7px 10px' },
    { size: 'hard', points: 5, count: 8, padding: '3px 5px' },
  ];

  hardMode = [
    { size: 'easy', points: 1, count: 7, padding: '10px 15px' },
    { size: 'medium', points: 3, count: 12, padding: '7px 10px' },
    { size: 'hard', points: 5, count: 16, padding: '3px 5px' },
  ];
  difficulty: string = '';
  constructor() {}

  startGame(difficulty: string) {
    if (this.targetList.length > 0) {
      return;
    }
    this.winner = '';
    this.difficulty = difficulty;
    this.targetList = [];
    this.targetIndex = -1;
    this.targetCounter = 0;
    this.targetClickedCounter = 0;
    setTimeout(() => {
      this.initializeGame();
    }, 1000);
  }

  initializeGame(): void {
    let currentMode = this.easyMode;
    if (this.difficulty === 'medium-mode') {
      currentMode = this.medMode;
    }

    if (this.difficulty === 'hard-mode') {
      currentMode = this.hardMode;
    }

    currentMode.forEach((mode) => {
      for (let i = 0; i < mode.count; i++) {
        this.targetList.push({
          size: mode.size,
          points: mode.points,
          clicked: false,
          shown: false,
          style: {
            position: 'absolute',
            top: `${Math.floor(Math.random() * 90)}%`,
            left: `${Math.floor(Math.random() * 90)}%`,
            padding: mode.padding,
            'border-radius': '100%',
          },
        });
      }
    });

    this.targetList.sort(() => Math.random() - 0.5);
    this.targetCounter = this.targetList.length;
    this.toggleWordVisibility();
  }

  toggleWordVisibility() {
    this.targetIndex = 0;
    this.targetList[this.targetIndex].shown = true;
    this.targetCounter--;
    this.intervalId = setInterval(() => {
      this.targetIndex++;
      this.targetList[this.targetIndex].shown = true;
      this.targetCounter--;
      if (this.targetIndex + 1 === this.targetList.length) {
        clearInterval(this.intervalId);

        setTimeout(() => {
          if (this.playerTurn === 'X') {
            this.setWinner();
          }
          this.playerTurn = 'X' === this.playerTurn ? 'O' : 'X';
          this.targetList = [];
          this.targetClickedCounter = 0;
        }, 3000);
      }
    }, 700);
  }

  targetClicked(target: TargetList) {
    target.clicked = true;
    target.shown = false;
    this.targetClickedCounter++;
    if (this.playerTurn === 'O') {
      this.currPlayerOScore += target.points;
    } else {
      this.currPlayerXScore += target.points;
    }
  }

  setWinner() {
    if (this.currPlayerXScore > this.currPlayerOScore) {
      this.winner = `Winner of this round is Player X with a score of ${this.currPlayerXScore}`;
      this.playerXScore++;
    } else if (this.currPlayerXScore < this.currPlayerOScore) {
      this.winner = `Winner of this round is Player O with a score of ${this.currPlayerOScore}`;
      this.playerOScore++;
    } else {
      this.winner = `It's a tie! Both players scored ${this.currPlayerXScore}`;
    }
    this.currPlayerOScore = 0;
    this.currPlayerXScore = 0;
    this.targetList = [];
    this.difficulty = '';
  }
}
