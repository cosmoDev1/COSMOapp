import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Globals } from "../globals";

@Component({
  selector: 'app-new-shelter-dialog',
  templateUrl: './new-shelter-dialog.component.html',
  styleUrls: ['./new-shelter-dialog.component.css']
})
export class NewShelterDialogComponent {

    formdata = {
        shelterName: "",
        shelterAddress: "",
        shelterCity: "",
        shelterState: "",
        shelterZip: "",
        shelterPhone: "",
        adminName: "",
        adminEmail: "",
        coordinatorName: "",
        coordinatorEmail: "",

    };

  

    constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<NewShelterDialogComponent>, public global: Globals) { }

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
