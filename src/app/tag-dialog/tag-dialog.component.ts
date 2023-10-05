import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig, MatDialog } from "@angular/material/dialog";
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Globals } from "../globals";

export interface AnimalData {
    animalId?: string;
    operationType?: number;
    operationInfo?: string; 
}


@Component({
    selector: 'tag-dialog',
    templateUrl: './tag-dialog.component.html',
    styleUrls: ['./tag-dialog.component.css']
})

export class TagDialogComponent{
    formdata = { tagAnimal: "0", tagInfo: "" }
    selectedOperationKey: any;


    constructor(@Inject(MAT_DIALOG_DATA) public data: any, private http: HttpClient, public global: Globals, public dialogRef: MatDialogRef<TagDialogComponent>) { }

    tagAnimalChange() {
        if (this.formdata.tagAnimal == "0") { this.formdata.tagInfo = ""; }
    }

    closeDialog() { this.dialogRef.close('close'); }

    submitDialog(tagForm: any) {
        console.log(tagForm)
        this.dialogRef.close('accept');

        var opType: Number = 0;
        if (this.formdata.tagAnimal == "0") { opType = 100; }
        if (this.formdata.tagAnimal == "1") { opType = 110; }
        if (this.formdata.tagAnimal == "2") { opType = 900; }
        if (this.formdata.tagAnimal == "3") { opType = -1; }

        var tagInfo = { animalId: this.data.id, operationType: opType, operationInfo: this.formdata.tagInfo }

        this.http.post(this.global.webserviceBaseUrl + 'tag/prpost', tagInfo).subscribe((response: any) => {
                    console.log(response);
                }, (error: any) => {
                    console.error('There was an error sending the data:', error);
                });

    }

}