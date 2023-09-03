import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Globals } from "../globals";
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
    selector: 'new-rescue-dialog',
    templateUrl: './new-rescue-dialog.component.html',
    styleUrls: ['./new-rescue-dialog.component.css']
})
export class NewRescueDialogComponent {
    formdata = {
        rescueName: "", rescueAddress: "", rescueCity: "", rescueState: "", rescueZip: "", rescuePhone: "", rescueEmail: "", contactName: "", contactEmail: "", contactPhone: "",
        species: "1", gender: "1", size: "1", age: "1", applicationType: "1"
    };
    entireFormEnabled: boolean = false;


    constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<NewRescueDialogComponent>, public global: Globals, private http: HttpClient, private dialog: MatDialog) { }

    closeDialog() {
        console.log('closing dialog')
        this.dialogRef.close();
    }

    submitDialog(rescueForm: any) {
        const dialogConfig = new MatDialogConfig();

        if (rescueForm.invalid) {
            dialogConfig.disableClose = true;
            dialogConfig.autoFocus = true;
            dialogConfig.data = { title: 'Warning', message: "One or more errors were found. Please correct them and try again.", notification: true };

            const dialogRef2 = this.dialog.open(ConfirmationDialogComponent, dialogConfig);

            return;
        }

        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.data = { title: 'Confirm', message: "Are you sure to submit this Rescue request?", notification: false };

        const dialogRef3 = this.dialog.open(ConfirmationDialogComponent, dialogConfig);
        dialogRef3.afterClosed().subscribe(result => {
            console.log(result);
            if (result == 'accept') {
                this.entireFormEnabled = true;

                var head = new HttpHeaders({ 'Content-Type': 'application/json' });
                const options = { headers: head };

                this.http.post(this.global.webserviceBaseUrl + 'rescues', this.formdata, options).subscribe((res: any) => {
                    console.log(res);
                    res = JSON.parse(res);

                    dialogConfig.disableClose = true;
                    dialogConfig.autoFocus = true;
                    var tmpText = "";
                    if (res.message == "inserted") {
                        tmpText = 'Your submission was successfully received. You will receive an email with further instructions.'
                    }
                    if (res.message == "notinserted") {
                        tmpText = 'Your submission returned an error. Please contact the app add admin.'
                    }
                    if (res.message == "error") {
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