import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransportDialogComponent } from './transport-dialog.component';

describe('TransportDialogComponent', () => {
  let component: TransportDialogComponent;
  let fixture: ComponentFixture<TransportDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TransportDialogComponent]
    });
    fixture = TestBed.createComponent(TransportDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
