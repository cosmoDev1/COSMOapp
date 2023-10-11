import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyFostersDialogComponent } from './my-fosters-dialog.component';

describe('MyFostersDialogComponent', () => {
  let component: MyFostersDialogComponent;
  let fixture: ComponentFixture<MyFostersDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyFostersDialogComponent]
    });
    fixture = TestBed.createComponent(MyFostersDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
