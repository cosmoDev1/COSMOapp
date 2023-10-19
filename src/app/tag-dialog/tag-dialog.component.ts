import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig, MatDialog } from "@angular/material/dialog";
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { Globals } from "../globals";


@Component({
    selector: 'tag-dialog',
    templateUrl: './tag-dialog.component.html',
    styleUrls: ['./tag-dialog.component.css']
})

export class TagDialogComponent{
    formdata = { tagAnimal: "0", tagInfo: "" }
    formSaving: boolean = false;


    constructor(@Inject(MAT_DIALOG_DATA) public data: any, private http: HttpClient, public global: Globals, private dialog: MatDialog, public dialogRef: MatDialogRef<TagDialogComponent>) { }

    tagAnimalChange() {
        if (this.formdata.tagAnimal == "0") { this.formdata.tagInfo = ""; }
    }

    closeDialog() { this.dialogRef.close('close'); }

    submitDialog(tagForm: any) {
        console.log(tagForm);
        this.formSaving = true;

        var opType: Number = 0;
        if (this.formdata.tagAnimal == "0") { opType = 100; }
        if (this.formdata.tagAnimal == "1") { opType = 110; }
        if (this.formdata.tagAnimal == "2") { opType = 900; }
        if (this.formdata.tagAnimal == "3") { opType = -1; }

        var tagInfo = { animalId: this.data.id, operationType: opType, operationInfo: this.formdata.tagInfo }

        this.http.post(this.global.webserviceBaseUrl + 'tag/prpost', tagInfo).subscribe((response: any) => {
            console.log(response);
            this.dialogRef.close('accept');

            this.dialog.open(ConfirmationDialogComponent, {
                width: '350px',
                data: { title: response.status.toUpperCase(), message: response.description }
            });
        }, (error: any) => {
            this.dialogRef.close();

            this.dialog.open(ConfirmationDialogComponent, {
                width: '350px',
                data: { title: 'Error', message: error }
            });

            console.error('There was an error sending the data:', error);
        });

    }

}