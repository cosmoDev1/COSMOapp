import { Component } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent
} from '@angular/material/dialog';

@Component({
  selector: 'app-request-food-dialog',
  templateUrl: './request-food-dialog.component.html',
  styleUrls: ['./request-food-dialog.component.css']
})
export class RequestFoodDialogComponent {
    brand: string = "";
    quantity_needed: number = 0;
    quantity_owned: number = 0;

    constructor(public dialogRef: MatDialogRef<RequestFoodDialogComponent>) { }

    onClose() {
        this.dialogRef.close();
    }

    requestFunc() {

    }

    //created by Daniel - date:
}
