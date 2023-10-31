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

  easyMode = [
    { size: 'easy', points: 1, count: 9, padding: '10px 15px' },
    { size: 'medium', points: 3, count: 7, padding: '7px 10px' },
    { size: 'hard', points: 5, count: 5, padding: '3px 5px' },
  ];
  constructor() {
    this.initializeGame();
  }
  initializeGame(mode: string = 'easy'): void {
    let targetSize = mode === 'easy' ? 10 : 10;

    let currentMode = mode === 'easy' ? this.easyMode : this.easyMode;

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

    console.log(this.targetList.length);
    this.toggleWordVisibility();
  }

  setTargetList() {}
  toggleWordVisibility() {
    this.targetIndex = 0;
    this.targetList[this.targetIndex].shown = true;
    this.intervalId = setInterval(() => {
      this.targetIndex++;
      this.targetList[this.targetIndex].shown = true;
      if (this.targetIndex + 1 === this.targetList.length) {
        console.log(this.targetList);
        clearInterval(this.intervalId);
      }
    }, 700);
  }

  targetClicked(target: TargetList) {
    target.clicked = true;
    target.shown = false;
    if (this.playerTurn === 'O') {
      this.playerOScore += target.points;
    } else {
      this.playerXScore += target.points;
    }
  }
}
