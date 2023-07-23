import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: 'new-foster-dialog',
  templateUrl: './new-foster-dialog.component.html',
  styleUrls: ['./new-foster-dialog.component.css']
})

export class NewFosterDialogComponent {

    constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<NewFosterDialogComponent>) {  }


 
  closeDialog() {
    console.log('closing dialog')
    this.dialogRef.close();
  }

  submitDialog() {

  }

}
