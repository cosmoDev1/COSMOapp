import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InviteFosterDialogComponent } from './invite-foster-dialog.component';

describe('InviteFosterDialogComponent', () => {
  let component: InviteFosterDialogComponent;
  let fixture: ComponentFixture<InviteFosterDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InviteFosterDialogComponent]
    });
    fixture = TestBed.createComponent(InviteFosterDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
