import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoveRequestComponent } from './move-request.component';

describe('MoveRequestComponent', () => {
  let component: MoveRequestComponent;
  let fixture: ComponentFixture<MoveRequestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MoveRequestComponent]
    });
    fixture = TestBed.createComponent(MoveRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
