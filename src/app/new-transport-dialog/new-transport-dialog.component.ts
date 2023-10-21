import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatDialogConfig, } from '@angular/material/dialog';
import { Globals } from '../globals';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-new-transport-dialog',
  templateUrl: './new-transport-dialog.component.html',
  styleUrls: ['./new-transport-dialog.component.css']
})
export class NewTransportDialogComponent {
    formdata = {
        transportName: "", transportAddress: "", transportCity: "", transportState: "TX", transportZip: "", transportPhone: "", transportEmail: ""
    };

    entireFormEnabled: boolean = false;

    numberOnlyEvent(event: any): void {
        const charCode = (event.which) ? event.which : event.keyCode;

        if (charCode > 31 && (charCode < 48 || charCode > 57) && (charCode < 96 || charCode > 105) && charCode !== 110 && charCode !== 190) {
            event.preventDefault();
        }
    }

    constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<NewTransportDialogComponent>, public global: Globals, private http: HttpClient, private dialog: MatDialog) { }

    closeDialog() {
        console.log('closing dialog')
        this.dialogRef.close();
    }

    submitDialog(networkerForm: any) {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;

        if (networkerForm.invalid) {
            dialogConfig.autoFocus = true;
            dialogConfig.data = { title: 'Warning', message: "One or more errors were found. Please correct them and try again.", notification: true };

            const dialogRef2 = this.dialog.open(ConfirmationDialogComponent, dialogConfig);

            return;
        }

        dialogConfig.autoFocus = false;
        dialogConfig.data = { title: 'Confirm', message: "Are you sure to submit this Networker request?", notification: false };

        const dialogRef3 = this.dialog.open(ConfirmationDialogComponent, dialogConfig);
        dialogRef3.afterClosed().subscribe(result => {
            console.log(result);
            if (result == 'accept') {
                this.entireFormEnabled = true;

                var head = new HttpHeaders({ 'Content-Type': 'application/json' });
                const options = { headers: head };

                var newFormData = this.formdata;
                newFormData.transportZip = this.formdata.transportZip.toString();

                this.http.post(this.global.webserviceBaseUrl + 'networkers/pupost', this.formdata, options).subscribe((res: any) => {
                    console.log(res);

                    dialogConfig.disableClose = true;
                    dialogConfig.autoFocus = true;
                    var tmpText = "";
                    if (res.status == "inserted") {
                        tmpText = 'Your submission was successfully received. You will receive an email with further instructions.'
                    }
                    if (res.status == "notinserted") {
                        tmpText = 'Your submission returned an error. Please contact the app add admin.'
                    }
                    if (res.status == "error") {
                        tmpText = 'An internal error ocurred. Please contact the app add admin.'
                    }

                    dialogConfig.data = { title: 'Notice', message: tmpText, notification: true };

                    const dialogRef4 = this.dialog.open(ConfirmationDialogComponent, dialogConfig);
                    dialogRef4.afterClosed().subscribe(result => { this.closeDialog(); });
                });


            }
        });
    }
}
