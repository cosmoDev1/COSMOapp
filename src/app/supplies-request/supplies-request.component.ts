import { Component } from '@angular/core';
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material/dialog';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-supplies-request',
  templateUrl: './supplies-request.component.html',
  styleUrls: ['./supplies-request.component.css']
})
export class SuppliesRequestComponent {

    supplyData = { radioDescription: "1", quantity: "", textDescription: "", }

    entireFormEnabled: boolean = false;

    constructor(private http: HttpClient, public dialogRef: MatDialogRef<SuppliesRequestComponent>, private dialog: MatDialog) { }

    submitDialog(supplyInfo: any) {
        if (supplyInfo.invalid) { return; }

        var dataToSend = { radioDescription: this.supplyData.radioDescription.toLocaleString(), quantity: this.supplyData.quantity, textDescription: this.supplyData.textDescription }

        this.http.post('http://localhost:5000/api/supplies', dataToSend).subscribe((res: any) => {
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
        console.log('closed')
        this.dialogRef.close();
    }
}
