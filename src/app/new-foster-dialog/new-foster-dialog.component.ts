import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig, MatDialog } from "@angular/material/dialog";
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Globals } from "../globals";
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'new-foster-dialog',
  templateUrl: './new-foster-dialog.component.html',
  styleUrls: ['./new-foster-dialog.component.css']
})

export class NewFosterDialogComponent {

    formdata = { fosterName: "", fosterAddress: "", fosterCity: "", fosterState: "TX", fosterZip:"", fosterPhone:"", fosterEmail:"", fosterDL:"", fosterHome:"1", fosterOwnership:"1",
        fosterLandlord:"1", fosterYard:"1", fosterFence:"", exerciseMethod:"", addressDuration:"", fosterSpecies:"1", fosterPetGender:"1", fosterPetSize:"1", petExperience:"",
        ownedBefore:"1", breedType:"", fosteredBefore:"1", fosterExperience:"", firstPet:"", firstYears:"", firstGender:"1", spayedNeutered1: false, secondPet:"", secondYears:"",
        twoGender: "1", spayedNeutered2: false, thirdPet:"", thirdYears:"", thirdGender:"1", spayedNeutered3: false, vetName:"", vetPhone:"", hoursAlone:"", dailyOccupancy:"",
        nightlyOccupancy: "", crateTrained: "1", adultOne: "", adultOneAge: "", adultOneRelation: "", adultTwo: "", adultTwoAge: "", adultTwoRelation: "",
        childOne: "", childOneAge: "", childOneRelation: "", childTwo: "", childTwoAge: "", childTwoRelation: "", anyoneAllergic: "1", childrenHome: "1", accommodations: "",
        referenceOne: "", firstPhone: "", referenceTwo:"", secondPhone: "", referenceThree:"", thirdPhone:""
    }

    entireFormEnabled: boolean = false;

    constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<NewFosterDialogComponent>, public global: Globals, private http: HttpClient, private dialog: MatDialog) {  }


 
    closeDialog() {
        console.log('closing dialog')
        this.dialogRef.close();
    }

    submitDialog(fosterForm: any) {
        const dialogConfig = new MatDialogConfig();

        if (fosterForm.invalid) {
            dialogConfig.disableClose = true;
            dialogConfig.autoFocus = true;
            dialogConfig.data = { title: 'Warning', message: "One or more errors were found. Please correct them and try again.", notification: true };

            const dialogRef2 = this.dialog.open(ConfirmationDialogComponent, dialogConfig);

            return;
        }

        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.data = { title: 'Confirm', message: "Are you sure to submit this Foster request?", notification: false };

        const dialogRef3 = this.dialog.open(ConfirmationDialogComponent, dialogConfig);
        dialogRef3.afterClosed().subscribe(result => {
            console.log(result);
            if (result == 'accept') {
                this.entireFormEnabled = true;

                var head = new HttpHeaders({ 'Content-Type': 'application/json' });
                const options = { headers: head };

                this.http.post(this.global.webserviceBaseUrl + 'fosters', this.formdata, options).subscribe((res: any) => {
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

                    const dialogRef4 = this.dialog.open(ConfirmationDialogComponent, dialogConfig);
                    dialogRef4.afterClosed().subscribe(result => { this.closeDialog(); });
                });
            }

            });
    }
}