import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuppliesRequestComponent } from './supplies-request.component';

describe('SuppliesRequestComponent', () => {
  let component: SuppliesRequestComponent;
  let fixture: ComponentFixture<SuppliesRequestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SuppliesRequestComponent]
    });
    fixture = TestBed.createComponent(SuppliesRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
