import { Component } from '@angular/core';
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material/dialog';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';


@Component({
  selector: 'app-request-food-dialog',
  templateUrl: './request-food-dialog.component.html',
  styleUrls: ['./request-food-dialog.component.css']
})
export class RequestFoodDialogComponent {

    requestData = { bagQuantity: 0, foodBrand: "", onHand: 0, }

    entireFormEnabled: boolean = false;

    constructor(private http: HttpClient, public dialogRef: MatDialogRef<RequestFoodDialogComponent>, private dialog: MatDialog) { }

    submitDialog(requestInfo: any) {
        if (requestInfo.invalid) { return; }

        var dataToSend = { bagQuantity: this.requestData.bagQuantity, foodBrand: this.requestData.foodBrand, onHand: this.requestData.onHand }

        this.http.post('http://localhost:5000/api/food', dataToSend).subscribe((res: any) => {
            console.log(res);

            this.dialogRef.close();

            const dialogConfig = new MatDialogConfig();
            dialogConfig.disableClose = true;
            dialogConfig.data = { title: 'Attention', message: 'Data was sucessfully recorded.', notification: true }

            this.dialog.open(ConfirmationDialogComponent, dialogConfig); 

        }, (err: any) => {
            const dialogConfig = new MatDialogConfig();
            dialogConfig.disableClose = true;
            dialogConfig.data = { title: 'Attention', message: 'An error ocurred, please try again later.', notification: true }

            this.dialog.open(ConfirmationDialogComponent, dialogConfig);
        })
    }


    closeDialog() {
        this.dialogRef.close();
    }
   
}
