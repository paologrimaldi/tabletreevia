import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameCategoryComponent } from './game-category.component';

describe('GameCategoryComponent', () => {
  let component: GameCategoryComponent;
  let fixture: ComponentFixture<GameCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
