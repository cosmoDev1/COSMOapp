import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";

import { Globals } from '../globals';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
    selector: 'register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    title: string = 'COSMO app - Register';
    entireFormEnabled: boolean = false;
    entireFormSteps: string = 'true';
    reqType: string = "";
    loadingRed: any;
    
    
    formdata = { typeAccount: "1" }

    shelterdata = {
        shelterName: "", shelterAddress: "", shelterCity: "", shelterState: "TX", shelterZip: "", shelterPhone: "", adminName: "", adminPhone: "", adminEmail: "",
        coordinatorName: "", coordinatorPhone: "", coordinatorEmail: ""
    };

    rescuedata = {
        rescueName: "", rescueAddress: "", rescueCity: "", rescueState: "TX", rescueZip: "", rescuePhone: "", rescueEmail: "", contactName: "", contactEmail: "", contactPhone: "",
        species: "1", gender: "1", size: "1", age: "1", applicationType: "1"
    };

    fosterdata = {
        fosterName: "", fosterAddress: "", fosterCity: "", fosterState: "TX", fosterZip: "", fosterPhone: "", fosterEmail: "", fosterDL: "", fosterHome: "1", fosterOwnership: "1",
        fosterLandlord: "1", fosterYard: "1", fosterFence: "", exerciseMethod: "n/a", addressDuration: "", fosterSpecies: "1", fosterPetGender: "1", fosterPetSize: "1", petExperience: "",
        ownedBefore: "1", breedType: "", fosteredBefore: "1", fosterExperience: "", firstPet: "", firstYears: "", firstGender: "1", spayedNeutered1: false, secondPet: "", secondYears: "",
        twoGender: "1", spayedNeutered2: false, thirdPet: "", thirdYears: "", thirdGender: "1", spayedNeutered3: false, vetName: "", vetPhone: "", hoursAlone: "", dailyOccupancy: "",
        nightlyOccupancy: "", crateTrained: "1", adultOne: "", adultOneAge: "", adultOneRelation: "", adultTwo: "", adultTwoAge: "", adultTwoRelation: "", childHome: "0",
        childOne: "n/a", childOneAge: "0", childOneRelation: "n/a", childTwo: "n/a", childTwoAge: "0", childTwoRelation: "n/a", anyoneAllergic: "1", childrenHome: "1", accommodations: "",
        referenceOne: "", firstPhone: "", referenceTwo: "", secondPhone: "", referenceThree: "", thirdPhone: ""
    }

    networkerdata = {
        networkerName: "", networkerAddress: "", networkerCity: "", networkerState: "TX", networkerZip: "", networkerPhone: "", networkerEmail: ""
    };

    constructor(private dialog: MatDialog, private http: HttpClient, public global: Globals) { }

    ngOnInit() {
        console.log('registering')
    }

    numberOnlyEvent(event: any): void {
        const charCode = (event.which) ? event.which : event.keyCode;

        if (charCode > 31 && (charCode < 48 || charCode > 57) && (charCode < 96 || charCode > 105) && charCode !== 110 && charCode !== 190) {
            // Prevent non-numeric characters
            event.preventDefault();
        }
    }

    fosterYardChange() {
        if (this.fosterdata.fosterYard == "1") {
            this.fosterdata.fosterFence = "";
            this.fosterdata.exerciseMethod = "n/a";
        } else {
            this.fosterdata.fosterFence = "n/a";
            this.fosterdata.exerciseMethod = "";
        }
    }

    ownedBeforeChange() {
        if (this.fosterdata.ownedBefore == "1") { this.fosterdata.breedType = "" } else { this.fosterdata.breedType = "n/a" }
    }

    childHomeChange() {
        if (this.fosterdata.childHome == "0") {
            this.fosterdata.childOne = "n/a";
            this.fosterdata.childOneAge = "0";
            this.fosterdata.childOneRelation = "n/a";
            this.fosterdata.childTwo = "n/a";
            this.fosterdata.childTwoAge = "0";
            this.fosterdata.childTwoRelation = "n/a";
        }
        if (this.fosterdata.childHome == "1") {
            this.fosterdata.childOne = "";
            this.fosterdata.childOneAge = "";
            this.fosterdata.childOneRelation = "";
            this.fosterdata.childTwo = "n/a";
            this.fosterdata.childTwoAge = "0";
            this.fosterdata.childTwoRelation = "n/a";
        }

        if (this.fosterdata.childHome == "2") {
            this.fosterdata.childOne = "";
            this.fosterdata.childOneAge = "";
            this.fosterdata.childOneRelation = "";
            this.fosterdata.childTwo = "";
            this.fosterdata.childTwoAge = "";
            this.fosterdata.childTwoRelation = "";
        }
    }

    submitForm() {
        this.reqType = (this.formdata.typeAccount == '1') ? 'Shelter' : this.reqType;
        this.reqType = (this.formdata.typeAccount == '2') ? 'Rescue' : this.reqType;
        this.reqType = (this.formdata.typeAccount == '3') ? 'Foster' : this.reqType;
        this.reqType = (this.formdata.typeAccount == '4') ? 'Transport' : this.reqType;
        this.reqType = (this.formdata.typeAccount == '5') ? 'Networker' : this.reqType;

        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = false;
        dialogConfig.data = { title: 'Confirm', message: "Are you sure to submit this " + this.reqType + " request?", notification: false };

        const dialogRef = this.dialog.open(ConfirmationDialogComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(result => {
            if (result == 'accept') {
                this.entireFormEnabled = true;

                dialogConfig.data = { title: 'Loading', message: '', notification: false };
                this.loadingRed = this.dialog.open(ConfirmationDialogComponent, dialogConfig);

                var head = new HttpHeaders({ 'Content-Type': 'application/json' });
                const options = { headers: head };

                var newShelterData = this.shelterdata;
                newShelterData.shelterZip = this.shelterdata.shelterZip.toString();

                var newRescueData = this.rescuedata;
                newRescueData.rescueZip = this.rescuedata.rescueZip.toString();
                console.log(newRescueData);

                var newFosterData = this.fosterdata;
                newFosterData.fosterZip = this.fosterdata.fosterZip.toString();
                newFosterData.addressDuration = this.fosterdata.addressDuration.toString();

                var newNetworkerData = this.networkerdata;
                newNetworkerData.networkerZip = this.networkerdata.networkerZip.toString();

                if (this.formdata.typeAccount == '1') {
                    this.http.post(this.global.webserviceBaseUrl + 'shelters/pupost', newShelterData, options).subscribe((res: any) => {
                        //res = JSON.parse(res);
                        this.resultDialog(res);
                    });
                }

                if (this.formdata.typeAccount == '2') {
                    this.http.post(this.global.webserviceBaseUrl + 'rescues/pupost', newRescueData, options).subscribe((res: any) => {
                       // res = JSON.parse(res);
                        this.resultDialog(res);
                    });
                }

                if (this.formdata.typeAccount == '3') {
                    this.http.post(this.global.webserviceBaseUrl + 'fosters/pupost', newFosterData, options).subscribe((res: any) => {
                      //  res = JSON.parse(res);
                        this.resultDialog(res);
                    });
                }

                if (this.formdata.typeAccount == '5') {
                    this.http.post(this.global.webserviceBaseUrl + 'networkers/pupost', newNetworkerData, options).subscribe((res: any) => {
                      //  res = JSON.parse(res);
                        this.resultDialog(res);
                    });
                }

            }
        });
    }

    resultDialog(res: any) {
        this.entireFormSteps = "false";
        this.loadingRed.close();

        const dialogConfig = new MatDialogConfig();
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
        dialogRef4.afterClosed().subscribe(result => { });
    }

    weAreAllMadeOfStars() {
        console.log('you are a star');

        window.open('https://youtu.be/x1rFAaAKpVc', '_blank');
    }

}
