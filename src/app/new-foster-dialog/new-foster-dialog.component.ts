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
        nightlyOccupancy: "", crateTrained: "1", adultOne: "", adultOneAge: "", adultOneRelation: "", adultTwo: "", adultTwoAge: "", adultTwoRelation: "", childHome:"0",
        childOne: "n/a", childOneAge: "0", childOneRelation: "n/a", childTwo: "n/a", childTwoAge: "0", childTwoRelation: "n/a", anyoneAllergic: "1", childrenHome: "1", accommodations: "",
        referenceOne: "", firstPhone: "", referenceTwo:"", secondPhone: "", referenceThree:"", thirdPhone:""
    }

    entireFormEnabled: boolean = false;

    numberOnlyEvent(event: any): void {
        const charCode = (event.which) ? event.which : event.keyCode;

        if (charCode > 31 && (charCode < 48 || charCode > 57) && (charCode < 96 || charCode > 105) && charCode !== 110 && charCode !== 190) {
            // Prevent non-numeric characters
            event.preventDefault();
        }
    }

    constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<NewFosterDialogComponent>, public global: Globals, private http: HttpClient, private dialog: MatDialog) {  }

    fosterYardChange() {
          if (this.formdata.fosterYard == "1") {
                this.formdata.fosterFence = "";
                this.formdata.exerciseMethod = "n/a";
          } else {
                this.formdata.fosterFence = "n/a";
                this.formdata.exerciseMethod = "";
          }
    }

    ownedBeforeChange() {
          if (this.formdata.ownedBefore == "1") { this.formdata.breedType = "" } else { this.formdata.breedType = "n/a" }
    }
 

    childHomeChange() {
        if (this.formdata.childHome == "0") {
            this.formdata.childOne = "n/a";
            this.formdata.childOneAge = "0";
            this.formdata.childOneRelation = "n/a";
            this.formdata.childTwo = "n/a";
            this.formdata.childTwoAge = "0";
            this.formdata.childTwoRelation = "n/a";
        }
        if (this.formdata.childHome == "1") {
            this.formdata.childOne = "";
            this.formdata.childOneAge = "";
            this.formdata.childOneRelation = "";
            this.formdata.childTwo = "n/a";
            this.formdata.childTwoAge = "0";
            this.formdata.childTwoRelation = "n/a";
        }

        if (this.formdata.childHome == "2") {
            this.formdata.childOne = "";
            this.formdata.childOneAge = "";
            this.formdata.childOneRelation = "";
            this.formdata.childTwo = "";
            this.formdata.childTwoAge = "";
            this.formdata.childTwoRelation = "";
        }
    }

    closeDialog() {
        console.log('closing dialog')
        this.dialogRef.close();
    }

    submitDialog(fosterForm: any) {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;

        if (fosterForm.invalid) {
            dialogConfig.autoFocus = true;
            dialogConfig.data = { title: 'Warning', message: "One or more errors were found. Please correct them and try again.", notification: true };

            const dialogRef2 = this.dialog.open(ConfirmationDialogComponent, dialogConfig);

            return;
        }

        dialogConfig.autoFocus = false;
        dialogConfig.data = { title: 'Confirm', message: "Are you sure to submit this Foster request?", notification: false };

        const dialogRef3 = this.dialog.open(ConfirmationDialogComponent, dialogConfig);
        dialogRef3.afterClosed().subscribe(result => {
            console.log(result);
            if (result == 'accept') {
                this.entireFormEnabled = true;

                var head = new HttpHeaders({ 'Content-Type': 'application/json' });
                const options = { headers: head };

                var newFormData = this.formdata;
                newFormData.fosterZip = this.formdata.fosterZip.toString();

                this.http.post(this.global.webserviceBaseUrl + 'fosters/protected', this.formdata, options).subscribe((res: any) => {
                    console.log(res);
                    //res = JSON.parse(res);

                    dialogConfig.disableClose = true;
                    dialogConfig.autoFocus = true;
                    var tmpText = "";
                    if (res.status == "inserted") {
                        tmpText = 'Your submission was successfully received. You will receive an email with further instructions.'
                    }
                    if (res.status == "notinserted") {
                        tmpText = 'Your submission returned an error. Please contact the app add admin.'
                    }
                    if (res.status == "error") {
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