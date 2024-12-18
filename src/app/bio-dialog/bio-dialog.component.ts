import { Component } from '@angular/core';
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material/dialog';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Globals, Animal } from '../globals';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
    selector: 'bio-dialog',
    templateUrl: './bio-dialog.component.html',
    styleUrls: ['./bio-dialog.component.css']
})
export class BioDialogComponent {

    bioData = { SelectedDate: "", BehavioralDescription: "" };
    

    entireFormEnabled: boolean = false;
    constructor(public global: Globals, private http: HttpClient, public dialogRef: MatDialogRef<BioDialogComponent>, private dialog: MatDialog) { }

    submitDialog(bioInfo: any) {
        if (bioInfo.invalid) { return; }

        var dataToSend = { SelectedDate: this.bioData.SelectedDate.toLocaleString(), BehavioralDescription: this.bioData.BehavioralDescription }

        this.http.post('http://localhost:5000/api/bio', dataToSend).subscribe((res: any) => {
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

        console.log(bioInfo)

        

        const dialogConfig = new MatDialogConfig(); 
        dialogConfig.disableClose = true;
        console.log(dataToSend)
    }


    

    closeDialog() {
        console.log('closed')
        this.dialogRef.close();
    }
}
