import { Component, Output, EventEmitter } from '@angular/core';

interface IconList {
  icon: string;
  matched: boolean;
}

@Component({
  selector: 'app-memory-game',
  templateUrl: './memory-game.component.html',
  styleUrls: ['./memory-game.component.scss'],
})
export class MemoryGameComponent {
  @Output() close = new EventEmitter<boolean>();
  playerXScore: number = 0;
  playerOScore: number = 0;

  playerTurn: string = 'O';
  disableResetButton = true;
  winner: string = '';
  selectedIcons: string[] = [];
  selectedCount: number = 0;
  selectedIconList: IconList[] = [];
  iconList: string[] = [
    'ac_unit',
    'airport_shuttle',
    'all_inclusive',
    'beach_access',
    'business_center',
    'casino',
    'child_care',
    'child_friendly',
    'fitness_center',
    'free_breakfast',
    'golf_course',
    'hot_tub',
    'kitchen',
    'meeting_room',
    'no_meeting_room',
    'pool',
    'room_service',
    'rv_hookup',
    'spa',
    'satellite',
    'store_mall_directory',
    'streetview',
    'subway',
    'terrain',
    'traffic',
    'train',
    'local_parking',
    'local_pharmacy',
    'local_phone',
    'local_pizza',
  ];

  playerActions = {
    moves: 2,
    icon1: '',
    icon2: '',
  };

  initializeGame: boolean = false;
  constructor() {
    console.log(this.iconList.length);
  }

  initializeMemoryGame(count: number) {
    this.selectedCount = count;
    this.selectedIcons = [];

    while (
      this.selectedIcons.length < this.selectedCount &&
      this.iconList.length > 0
    ) {
      let randomIndex = Math.floor(Math.random() * this.iconList.length);
      let selectedIcon = this.iconList.splice(randomIndex, 1)[0];
      this.selectedIcons.push(selectedIcon);
    }
    this.randomizeIcons();
  }

  randomizeIcons() {
    this.selectedIcons = [...this.selectedIcons, ...this.selectedIcons];
    this.selectedIcons.sort(() => Math.random() - 0.5);
    this.initializeGame = true;
    this.selectedIcons.forEach((icon) => {
      this.selectedIconList.push({ icon: icon, matched: false });
    });

    console.log(this.selectedIconList);
  }

  selectIcon(icon: string) {
    if (this.playerActions.moves === 2) {
      this.playerActions.icon1 = icon;
      this.playerActions.moves = 1;
    } else if (this.playerActions.moves === 1) {
      this.playerActions.icon2 = icon;
      this.playerActions.moves = 0;
    }

    if (this.playerActions.icon1 === this.playerActions.icon2) {
    }
  }
  resetGame() {}
}
