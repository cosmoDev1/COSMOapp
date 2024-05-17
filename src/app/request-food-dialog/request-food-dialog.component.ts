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

    onClose() {

    }

    requestFunc() {

    }
}
