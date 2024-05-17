import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestFoodDialogComponent } from './request-food-dialog.component';
import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';


describe('RequestFoodDialogComponent', () => {
  let component: RequestFoodDialogComponent;
  let fixture: ComponentFixture<RequestFoodDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RequestFoodDialogComponent]
    });
    fixture = TestBed.createComponent(RequestFoodDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
