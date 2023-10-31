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

  constructor() {
    this.initializeGame();
  }
  initializeGame(mode: string = 'easy'): void {
    let targetSize = mode === 'easy' ? 10 : 10;

    for (let i = 0; i < targetSize; i++) {
      this.targetList.push({
        size: mode,
        points: mode === 'easy' ? 1 : 2,
        clicked: false,
        shown: false,
        style: {
          position: 'absolute',
          top: `${Math.floor(Math.random() * 90)}%`,
          left: `${Math.floor(Math.random() * 90)}%`,
          padding: '5px 10px',
          'border-radius': '100%',
        },
      });
    }

    this.toggleWordVisibility();
  }

  toggleWordVisibility() {
    this.targetIndex = 0;
    this.targetList[this.targetIndex].shown = true;
    this.intervalId = setInterval(() => {
      this.targetIndex++;
      this.targetList[this.targetIndex].shown = true;
      console.log(this.targetIndex);
      if (this.targetIndex + 1 === this.targetList.length) {
        console.log(this.targetList);
        clearInterval(this.intervalId);
      }
    }, 700);
  }

  targetClicked(target: TargetList) {
    console.log(target);
    target.clicked = true;
    target.shown = false;
    if (this.playerTurn === 'O') {
      this.playerOScore += target.points;
    } else {
      this.playerXScore += target.points;
    }
  }
}
