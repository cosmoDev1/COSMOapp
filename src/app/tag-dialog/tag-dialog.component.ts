import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig, MatDialog } from "@angular/material/dialog";
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Globals } from "../globals";
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';


@Component({
    selector: 'tag-dialog',
    templateUrl: './tag-dialog.component.html',
    styleUrls: ['./tag-dialog.component.css']
})

export class TagDialogComponent{

      formdata = { tagAnimal: "0", tagInfo: "" }
    constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<TagDialogComponent>) { }

    tagAnimalChange() {
        if (this.formdata.tagAnimal == "0") { this.formdata.tagInfo = ""; }
    }

    closeDialog() { this.dialogRef.close('close'); }

    submitDialog(tagForm: any) {
        this.dialogRef.close('accept');
    }

}