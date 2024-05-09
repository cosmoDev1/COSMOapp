import { Component, inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';





@Component({
    selector: 'bio-dialog',
    templateUrl: './bio-dialog.component.html',
    styleUrls: ['./bio-dialog.component.css']
})
export class BioDialogComponent {
    constructor(public dialogRef: MatDialogRef<BioDialogComponent> ) { }
}
