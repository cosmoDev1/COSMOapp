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

    formdata = { shelterName: "", shelterAddress: "", shelterCity: "", shelterState: "TX", shelterZip: "", shelterPhone: "", adminName: "", adminPhone:"", adminEmail: "", coordinatorName: "", coordinatorPhone:"",
        coordinatorEmail: "" };
 

    constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<NewShelterDialogComponent>, public global: Globals, private http: HttpClient, private dialog: MatDialog) { }

    closeDialog() {
        console.log('closing dialog')
        this.dialogRef.close();
    }

    submitDialog(shelterForm: any) {
        if (shelterForm.invalid) {
            console.log('There are errors on the form')
            return;
        }

        var head = new HttpHeaders({ 'Content-Type': 'application/json' });
        const options = { headers: head };

        this.http.post(this.global.webserviceBaseUrl + 'shelters', this.formdata, options).subscribe((res: any) => {
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

        console.log(shelterForm);
        console.log(this.formdata);
    }

}
