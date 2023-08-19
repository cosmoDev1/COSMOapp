import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Globals } from "../globals";

@Component({
  selector: 'new-foster-dialog',
  templateUrl: './new-foster-dialog.component.html',
  styleUrls: ['./new-foster-dialog.component.css']
})

export class NewFosterDialogComponent {

    formdata = {
        fosterName: "",
        fosterAddress: "",
        fosterCity: "",
        fosterState: "TX",
        fosterZip:"",
        fosterPhone:"",
        fosterEmail:"",
        fosterDL:"",
        fosterHome:"1",
        fosterOwnership:"1",
        fosterLandlord:"1",
        fosterYard:"1",
        fosterFence:"",
        exerciseMethod:"",
        addressDuration:"",
        fosterSpecies:"1",
        fosterPetGender:"1",
        fosterPetSize:"1",
        petExperience:"",
        ownedBefore:"1",
        breedType:"",
        fosteredBefore:"1",
        fosterExperience:"",
        firstPet:"",
        firstYears:"",
        firstGender:"1",
        spayedNeutered1: false,
        secondPet:"",
        secondYears:"",
        twoGender: "1",
        spayedNeutered2: false,
        thirdPet:"",
        thirdYears:"",
        thirdGender:"1",
        spayedNeutered3: false,
        vetName:"",
        vetPhone:"",
        hoursAlone:"",
        dailyOccupancy:"",
        nightlyOccupancy:"",
        crateTrained:"1",
        adultOne:"",
        adultOneAge:"",
        adultOneRelation:"",
        adultTwo:"",
        adultTwoAge:"",
        adultTwoRelation:"",
        childOne:"",
        childOneAge:"",
        childOneRelation:"",
        childTwo:"",
        childTwoAge:"",
        childTwoRelation:"",
        anyoneAllergic:"1",
        childrenHome:"1",
        accommodations:"",
        ReferenceOne:"",
        firstPhone:"",
        ReferenceTwo:"",
        secondPhone: "",
        ReferenceThree:"",
        thirdPhone:"",
    }

    constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<NewFosterDialogComponent>, public global: Globals) {  }


 
    closeDialog() {
        console.log('closing dialog')
        this.dialogRef.close();
    }

    submitDialog(fosterForm: any) {
        if (fosterForm.invalid) {
            console.log('There are errors on the form')
            return;
        }


        console.log(fosterForm);
        console.log(this.formdata);
    }

}
