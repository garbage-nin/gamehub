import { Injectable } from '@angular/core';
import * as randomWords from 'random-words';
@Injectable({
  providedIn: 'root',
})
export class WordsApiService {
  constructor() {}

  getWords(mode: string = 'easy', count: number): string[] {
    // easy 1min 30 words
    return randomWords.generate({
      exactly: count,
      maxLength: 10000,
      minLength: 4,
    });
  }
}
