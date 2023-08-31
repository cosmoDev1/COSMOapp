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


    constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<NewRescueDialogComponent>, public global: Globals, private http: HttpClient, private dialog: MatDialog) { }

    closeDialog() {
        console.log('closing dialog')
        this.dialogRef.close();
    }

    submitDialog(rescueForm: any) {
        if (rescueForm.invalid) {
            console.log('there are errors on the form')
            return;
        }

        var head = new HttpHeaders({ 'Content-Type': 'application/json' });
        const options = { headers: head };

        this.http.post(this.global.webserviceBaseUrl + 'rescues', this.formdata, options).subscribe((res: any) => {
            console.log(res);
            res = JSON.parse(res);

            const dialogConfig = new MatDialogConfig();

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

            const dialogRef = this.dialog.open(ConfirmationDialogComponent, dialogConfig);
            dialogRef.afterClosed().subscribe(result => { this.closeDialog(); });
        });
    }

}