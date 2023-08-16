import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Globals } from "../globals";

@Component({
    selector: 'new-rescue-dialog',
    templateUrl: './new-rescue-dialog.component.html',
    styleUrls: ['./new-rescue-dialog.component.css']
})
export class NewRescueDialogComponent {
    rescueName = "";
    rescueAddress = "";
    rescueCity = "";
    rescueState = "";
    rescueZip = "";
    rescuePhone = "";
    rescueEmail = "";
    rescueContact = "";
    contactName = "";
    contactEmail = "";
    contactPhone = "";

    constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<NewRescueDialogComponent>, public global: Globals) { }

    closeDialog() {
        console.log('closing dialog')
        this.dialogRef.close();
    }

    submitDialog() {

        console.log(this.rescueName);
        console.log(this.rescueAddress);
        console.log(this.rescueCity);
        console.log(this.rescueState);
        console.log(this.rescueZip);
        console.log(this.rescuePhone);
        console.log(this.rescueEmail);
        console.log(this.rescueContact);
        console.log(this.contactName);
        console.log(this.contactEmail);
        //muestras el contenido del objecto  ie console.log(xxx)
    }

}
