import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Globals } from "../globals";

@Component({
  selector: 'app-new-shelter-dialog',
  templateUrl: './new-shelter-dialog.component.html',
  styleUrls: ['./new-shelter-dialog.component.css']
})
export class NewShelterDialogComponent {

    constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<NewShelterDialogComponent>, public global:Globals ) { }
}
