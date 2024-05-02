import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalRequestComponent } from './medical-request.component';

describe('MedicalRequestComponent', () => {
  let component: MedicalRequestComponent;
  let fixture: ComponentFixture<MedicalRequestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MedicalRequestComponent]
    });
    fixture = TestBed.createComponent(MedicalRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
