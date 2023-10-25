import { Component, Output, EventEmitter } from '@angular/core';
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
  disableResetButton = true;
  playerTurn: string = 'O';

  wordList: WordList[] = [];
  wordIndex = -1;
  intervalId: any;
  timerId: any;
  showTimer = 1000; // 4 seconds
  typeWord: string = '';
  wordsMatched: number = 0;

  seconds: number = 0;
  milliseconds: number = 0;

  constructor(private wordsApiService: WordsApiService) {
    this.words = this.wordsApiService.getWords('easy', 30);
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

    // setInterval(() => {
    //   this.wordList[this.wordIndex].shown = false;
    //   this.wordIndex++;
    // }, this.hideTimer); // Repeat every 5 seconds
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

  initializeTypingGame() {
    this.wordList[0].shown = true;
    this.wordIndex = 0;
    this.toggleWordVisibility();
    this.startTimer();
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
          this.disableResetButton = false;
        }
      }
    });
  }
}
