import {
  Component,
  Output,
  EventEmitter,
  ViewChild,
  AfterViewInit,
} from '@angular/core';

@Component({
  selector: 'app-stop-game',
  templateUrl: './stop-game.component.html',
  styleUrls: ['./stop-game.component.scss'],
})
export class StopGameComponent implements AfterViewInit {
  @Output() close = new EventEmitter<boolean>();
  playerXScore: number = 0;
  playerOScore: number = 0;
  playerOPosition: number = 0;
  playerXPosition: number = 0;
  difficulty: string = '';
  playerTurn: string = 'O';
  disableResetButton = true;
  winner: string = '';
  roundStarted = false;
  speed = 1000;

  arrowDownPos: any;
  arrowDownStyle: any;
  arrowUpPos: any;
  arrowUpStyle: any;
  arrowUpElement: any;

  originalPosition: any;
  @ViewChild('arrowUpIcon') arrowUpIcon: any | undefined;
  @ViewChild('iconContainer') iconContainer: any | undefined;

  ngAfterViewInit(): void {
    this.arrowUpElement = this.arrowUpIcon?._elementRef.nativeElement;
    this.originalPosition = getComputedStyle(this.arrowUpElement).left;
  }

  startGame(difficulty: string) {
    this.difficulty = difficulty;
    if (this.playerTurn === 'O') {
      this.winner = '';
      this.arrowDownPos = Math.floor(Math.random() * 96);
      this.arrowUpElement.style.animation = 'none';
    } else {
      this.arrowUpElement.style.animation = 'none';
    }

    this.arrowDownStyle = { left: `${this.arrowDownPos}%` };

    setTimeout(() => {
      this.arrowUpElement.style.animation = '';
    }, 500);

    this.roundStarted = true;
    this.arrowUpStyle = difficulty;
  }

  stopArrow() {
    this.arrowUpElement = this.arrowUpIcon?._elementRef.nativeElement;
    let iconContainerWidth = this.iconContainer?.nativeElement.offsetWidth;

    this.arrowUpElement.style.animationPlayState = 'paused';

    this.arrowUpPos = getComputedStyle(this.arrowUpElement).left;
    this.arrowUpPos = (parseFloat(this.arrowUpPos) / iconContainerWidth) * 100;

    if (this.playerTurn === 'O') {
      this.playerOPosition = this.arrowUpPos;
    } else {
      this.playerXPosition = this.arrowUpPos;
    }

    if (this.playerOPosition !== 0 && this.playerXPosition !== 0) {
      this.determineWinner();
    }
    this.playerTurn = this.playerTurn === 'O' ? 'X' : 'O';
    this.roundStarted = false;
  }

  determineWinner() {
    let xDiffPos = Math.abs(this.arrowDownPos - this.playerXPosition);
    let oDiffPos = Math.abs(this.arrowDownPos - this.playerOPosition);

    if (xDiffPos < oDiffPos) {
      this.winner = `Winner of this round is Player X with a shortter distance of ${xDiffPos.toFixed(
        2
      )} from the target`;
      this.playerXScore++;
    } else {
      this.winner = `Winner of this round is Player O with a shortter distance of ${oDiffPos.toFixed(
        2
      )} from the target`;
      this.playerOScore++;
    }

    this.difficulty = '';
  }

  resetGame() {
    this.playerXScore = 0;
    this.playerOScore = 0;
    this.playerOPosition = 0;
    this.playerXPosition = 0;
    this.difficulty = '';
    this.playerTurn = 'O';
    this.disableResetButton = true;
    this.winner = '';
    this.roundStarted = false;
    this.arrowUpStyle = '';
    this.arrowDownStyle = '';
    this.arrowUpElement.style.animation = '';
    this.arrowUpElement.style.left = this.originalPosition;
  }
}
