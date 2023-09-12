import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: 'animal-detail-dialog',
  templateUrl: './animal-detail-dialog.component.html',
  styleUrls: ['./animal-detail-dialog.component.css']
})
export class AnimalDetailDialogComponent {
    editMode: boolean = false;

    constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<AnimalDetailDialogComponent>) { }
  
    closeDialog() { this.dialogRef.close('close'); }

    editDialog() {
        this.editMode = !this.editMode;

    }
}
