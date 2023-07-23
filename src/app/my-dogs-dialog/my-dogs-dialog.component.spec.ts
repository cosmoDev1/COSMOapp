import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyDogsDialogComponent } from './my-dogs-dialog.component';

describe('MyDogsDialogComponent', () => {
  let component: MyDogsDialogComponent;
  let fixture: ComponentFixture<MyDogsDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyDogsDialogComponent]
    });
    fixture = TestBed.createComponent(MyDogsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
