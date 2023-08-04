import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PleaDialogComponent } from './plea-dialog.component';

describe('MyDogsDialogComponent', () => {
    let component: PleaDialogComponent;
    let fixture: ComponentFixture<PleaDialogComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [PleaDialogComponent]
        });
        fixture = TestBed.createComponent(PleaDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});