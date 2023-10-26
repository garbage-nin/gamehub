import {
  Component,
  Output,
  EventEmitter,
  HostListener,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { WordsApiService } from 'src/app/service/words-api.service';

interface WordList {
  word: string;
  matched: string | boolean;
  shown: boolean;
  position: any;
}
@Component({
  selector: 'app-typing-game',
  templateUrl: './typing-game.component.html',
  styleUrls: ['./typing-game.component.scss'],
})
export class TypingGameComponent {
  @Output() close = new EventEmitter<boolean>();
  words: string[] = [];
  playerXScore: number = 0;
  playerOScore: number = 0;
  playerOTime: number = 0;
  playerXTime: number = 0;
  disableResetButton = true;
  playerTurn: string = 'O';
  winner: string = '';

  wordList: WordList[] = [];
  wordIndex = -1;
  intervalId: any;
  timerId: any;
  showTimer = 1000; // 4 seconds
  typeWord: string = '';
  wordsMatched: number = 0;

  seconds: number = 0;
  milliseconds: number = 0;

  @ViewChild('inputType') inputType: ElementRef | undefined;

  constructor(private wordsApiService: WordsApiService) {}

  @HostListener('document:keydown.enter', ['$event'])
  handleEnterkey(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.initializeTypingGame();
      event.preventDefault();
    }
  }

  initializeTypingGame() {
    this.setWordList();
    this.wordList[0].shown = true;
    this.toggleWordVisibility();
    this.startTimer();
    setTimeout(() => {
      this.inputType?.nativeElement.focus();
    }, 1);
  }

  setWordList() {
    this.resetValue();
    this.words = this.wordsApiService.getWords('easy', 1);
    this.words.forEach((word) => {
      this.wordList.push({
        word: word,
        matched: false,
        shown: false,
        position: this.randomPosition(),
      });
    });
  }

  toggleWordVisibility() {
    this.intervalId = setInterval(() => {
      this.wordList[this.wordIndex].shown = true;
      this.wordIndex++;
      if (this.wordIndex === this.wordList.length) {
        clearInterval(this.intervalId);
      }
    }, this.showTimer);
  }

  randomPosition(): any {
    const top = Math.floor(Math.random() * 90) + 1; // Adjust the range as needed
    const left = Math.floor(Math.random() * 87) + 1; // Adjust the range as needed

    return {
      position: 'absolute',
      top: `${top}%`,
      left: `${left}%`,
    };
  }

  startTimer() {
    this.timerId = setInterval(() => {
      this.milliseconds += 100;
      if (this.milliseconds === 1000) {
        this.milliseconds = 0;
        this.seconds++;
      }
    }, 100);
  }

  checkWord(event: any) {
    this.typeWord = event.target.value;
    if (this.typeWord.length < 3) {
      return;
    }

    this.wordList.forEach((word) => {
      if (
        word.word === this.typeWord &&
        word.shown === true &&
        word.matched === false
      ) {
        word.matched = true;
        word.shown = false;
        this.typeWord = '';
        this.wordsMatched++;

        if (this.wordsMatched === this.wordList.length) {
          clearInterval(this.timerId);
          this.setScore();
          this.wordList = [];
        }
      }
    });
  }

  setScore() {
    let totalTime = this.seconds + this.milliseconds / 1000;
    if (this.playerTurn === 'O') {
      this.playerOTime = totalTime;
      this.playerTurn = 'X';
    } else {
      this.playerXTime = totalTime;
      this.playerTurn = 'O';
    }

    if (this.playerOTime !== 0 && this.playerXTime !== 0) {
      if (this.playerOTime < this.playerXTime) {
        this.playerOScore++;
        this.winner = `Player O win this round with a time of ${this.playerOTime} seconds vs Player X time ${this.playerXTime} seconds`;
      } else {
        this.playerXScore++;
        this.winner = `Player X win this round with a time of ${this.playerXTime} seconds vs Player O time ${this.playerOTime} seconds`;
      }
      this.disableResetButton = false;
      this.playerOTime = 0;
      this.playerXTime = 0;
    }
  }

  resetGame() {
    this.disableResetButton = true;
    this.playerOTime = 0;
    this.playerXTime = 0;
    this.playerTurn = 'O';
    this.winner = '';
    this.wordList = [];
  }

  resetValue() {
    this.typeWord = '';
    this.wordsMatched = 0;
    this.wordList = [];
    this.words = [];
    this.winner = '';
    this.milliseconds = 0;
    this.seconds = 0;
    this.wordIndex = 0;
  }
}
