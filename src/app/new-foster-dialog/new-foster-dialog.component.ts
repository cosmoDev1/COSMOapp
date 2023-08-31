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

    constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<NewFosterDialogComponent>, public global: Globals, private http: HttpClient, private dialog: MatDialog) {  }


 
    closeDialog() {
        console.log('closing dialog')
        this.dialogRef.close();
    }

    submitDialog(fosterForm: any) {
        if (fosterForm.invalid) {
            console.log('There are errors on the form')
            return;
        }

        var head = new HttpHeaders({ 'Content-Type': 'application/json' });
        const options = { headers: head };

        this.http.post(this.global.webserviceBaseUrl + 'fosters', this.formdata, options).subscribe((res: any) => {
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
            dialogRef.afterClosed().subscribe((result: any) => { this.closeDialog(); });
        });

        console.log(fosterForm);
        console.log(this.formdata);
    }

}
