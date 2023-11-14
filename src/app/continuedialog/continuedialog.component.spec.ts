import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContinuedialogComponent } from './continuedialog.component';

describe('ContinuedialogComponent', () => {
  let component: ContinuedialogComponent;
  let fixture: ComponentFixture<ContinuedialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContinuedialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContinuedialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
