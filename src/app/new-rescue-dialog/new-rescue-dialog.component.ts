import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Globals } from "../globals";

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
    

    constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<NewRescueDialogComponent>, public global: Globals) { }

    closeDialog() {
        console.log('closing dialog')
        this.dialogRef.close();
    }

    submitDialog() {


        console.log(this.formdata);

        //call via http the webservice        

    }

}
