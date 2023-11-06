import { Component } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  opened: boolean = false;
  lightTheme: boolean = false;
  gameSelected = '';
  gameList = [
    { name: 'tic-tac-toe', icon: 'gamepad' },
    { name: 'typing-game', icon: 'keyboard' },
    { name: 'memory-game', icon: 'memory' },
    { name: 'shooting-game', icon: 'sports_esports' },
    { name: 'stop-game', icon: 'stop' },
  ];

  selectGame(game: string) {
    this.gameSelected = game === this.gameSelected ? '' : game;
  }
}
