import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Globals } from "../globals";
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
    selector: 'app-new-shelter-dialog',
    templateUrl: './new-shelter-dialog.component.html',
    styleUrls: ['./new-shelter-dialog.component.css']
})
export class NewShelterDialogComponent {

    formdata = {
        shelterName: "", shelterAddress: "", shelterCity: "", shelterState: "TX", shelterZip: "", shelterPhone: "", adminName: "", adminPhone: "", adminEmail: "", coordinatorName: "", coordinatorPhone: "",
        coordinatorEmail: ""
    };

    entireFormEnabled: boolean = false;

    numberOnlyEvent(event: any): void {
        const charCode = (event.which) ? event.which : event.keyCode;

        if (charCode > 31 && (charCode < 48 || charCode > 57) && (charCode < 96 || charCode > 105) && charCode !== 110 && charCode !== 190) {
            // Prevent non-numeric characters
            event.preventDefault();
        }
    }

    constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<NewShelterDialogComponent>, public global: Globals, private http: HttpClient, private dialog: MatDialog) { }

    closeDialog() {
        console.log('closing dialog')
        this.dialogRef.close();
    }

    submitDialog(shelterForm: any) {
        const dialogConfig = new MatDialogConfig();

        if (shelterForm.invalid) {
            dialogConfig.disableClose = true;
            dialogConfig.autoFocus = true;
            dialogConfig.data = { title: 'Warning', message: "One or more errors were found. Please correct them and try again.", notification: true };

            const dialogRef = this.dialog.open(ConfirmationDialogComponent, dialogConfig);

            return;
        }

        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.data = { title: 'Warning', message: "One or more errors were found. Please correct them and try again.", notification: true };

        const dialogRef = this.dialog.open(ConfirmationDialogComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(result => {
            console.log(result);
            if (result == 'accept') {
                this.entireFormEnabled = true;

                var head = new HttpHeaders({ 'Content-Type': 'application/json' });
                const options = { headers: head };

                this.http.post(this.global.webserviceBaseUrl + 'shelters', this.formdata, options).subscribe((res: any) => {
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

                    const dialogRef = this.dialog.open(ConfirmationDialogComponent, dialogConfig);
                    dialogRef.afterClosed().subscribe(result => { this.closeDialog(); });
                });


            }
        });
    }
}