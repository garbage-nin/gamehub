import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent {
  @Output() lightTheme = new EventEmitter<boolean>();
  @Output() openSideNav = new EventEmitter<boolean>();
  theme: boolean = false;
  opened: boolean = false;
  themeIcon = 'light_mode';
  lightThemeToggle() {
    this.theme = !this.theme;
    this.themeIcon = this.theme ? 'dark_mode' : 'light_mode';
    this.lightTheme.emit(this.theme);
  }

  openSideNavToggle() {
    this.opened = !this.opened;
    this.openSideNav.emit(this.opened);
  }
}
