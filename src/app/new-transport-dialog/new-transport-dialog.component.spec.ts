import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTransportDialogComponent } from './new-transport-dialog.component';

describe('NewTransportDialogComponent', () => {
  let component: NewTransportDialogComponent;
  let fixture: ComponentFixture<NewTransportDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewTransportDialogComponent]
    });
    fixture = TestBed.createComponent(NewTransportDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
