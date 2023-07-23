import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewShelterDialogComponent } from './new-shelter-dialog.component';

describe('NewShelterDialogComponent', () => {
  let component: NewShelterDialogComponent;
  let fixture: ComponentFixture<NewShelterDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewShelterDialogComponent]
    });
    fixture = TestBed.createComponent(NewShelterDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
