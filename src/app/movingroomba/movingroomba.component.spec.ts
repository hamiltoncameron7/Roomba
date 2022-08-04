import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovingroombaComponent } from './movingroomba.component';

describe('MovingroombaComponent', () => {
  let component: MovingroombaComponent;
  let fixture: ComponentFixture<MovingroombaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovingroombaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovingroombaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
