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
    this.difficulty = difficulty;
    this.targetList = [];
    this.targetIndex = -1;
    this.targetCounter = 0;
    this.targetClickedCounter = 0;
    this.initializeGame();
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
    console.log(this.targetList.length);
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
        this.playerTurn = 'X' === this.playerTurn ? 'O' : 'X';
      }
    }, 700);
  }

  targetClicked(target: TargetList) {
    target.clicked = true;
    target.shown = false;
    this.targetClickedCounter++;
    if (this.playerTurn === 'O') {
      this.playerOScore += target.points;
    } else {
      this.playerXScore += target.points;
    }
  }
}
