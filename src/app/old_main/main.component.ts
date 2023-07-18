import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<MainComponent>) { }
  
  closeDialog() {
    console.log('closing dialog')
    this.dialogRef.close();
  }

  submitDialog() {

  }

}
