import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThegridComponent } from './thegrid.component';

describe('ThegridComponent', () => {
  let component: ThegridComponent;
  let fixture: ComponentFixture<ThegridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThegridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThegridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
