import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MainComponent } from './main.component';

import { NavigationComponent } from '../navigation/navigation.component';
import { TictacComponent } from '../tictac/tictac.component';
import { MemoryGameComponent } from '../memory-game/memory-game.component';
import { TypingGameComponent } from '../typing-game/typing-game.component';
import { StopGameComponent } from '../stop-game/stop-game.component';
import { ShootingGameComponent } from '../shooting-game/shooting-game.component';

import { MainRoutingModule } from './main-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [
    MainComponent,
    NavigationComponent,
    TictacComponent,
    MemoryGameComponent,
    TypingGameComponent,
    StopGameComponent,
    ShootingGameComponent,
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatSidenavModule,
    MatToolbarModule,
    MatCardModule,
    MatChipsModule,
    MatTooltipModule,
    FormsModule,
  ],
})
export class MainModule {}
