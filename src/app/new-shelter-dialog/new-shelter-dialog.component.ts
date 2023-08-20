import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Globals } from "../globals";

@Component({
  selector: 'app-new-shelter-dialog',
  templateUrl: './new-shelter-dialog.component.html',
  styleUrls: ['./new-shelter-dialog.component.css']
})
export class NewShelterDialogComponent {

    formdata = { shelterName: "", shelterAddress: "", shelterCity: "", shelterState: "TX", shelterZip: "", shelterPhone: "", adminName: "", adminPhone:"", adminEmail: "", coordinatorName: "", coordinatorPhone:"",
        coordinatorEmail: "" };
 

    constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<NewShelterDialogComponent>, public global: Globals, private http: HttpClient) { }

    closeDialog() {
        console.log('closing dialog')
        this.dialogRef.close();
    }

    submitDialog(shelterForm: any) {
        if (shelterForm.invalid) {
            console.log('There are errors on the form')
            return;
        }


        console.log(shelterForm);
        console.log(this.formdata);
    }

}