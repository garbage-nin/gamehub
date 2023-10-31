import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShootingGameComponent } from './shooting-game.component';

describe('ShootingGameComponent', () => {
  let component: ShootingGameComponent;
  let fixture: ComponentFixture<ShootingGameComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShootingGameComponent]
    });
    fixture = TestBed.createComponent(ShootingGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
