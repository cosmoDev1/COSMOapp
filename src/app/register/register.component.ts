import { Component, AfterViewInit, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { Globals } from '../globals';

@Component({
    selector: 'register',
    templateUrl: './register.component.html',
      styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
      title = 'COSMO app - Register';
      isOptional = false;
      entireFormEnabled = 'false';

      formdata = { typeAccount: "1" }

      shelterdata = { shelterName: "", shelterAddress: "", shelterCity: "", shelterState: "TX", shelterZip: "", shelterPhone: "", adminName: "", adminPhone: "", adminEmail: "",
            coordinatorName: "", coordinatorPhone: "", coordinatorEmail: "" };

      rescuedata = { rescueName: "", rescueAddress: "", rescueCity: "", rescueState: "", rescueZip: "", rescuePhone: "", rescueEmail: "", contactName: "", contactEmail: "", contactPhone: "",
            species: "1", gender: "1", size: "1", age: "1", applicationType: "1" };

      fosterdata = { fosterName: "", fosterAddress: "", fosterCity: "", fosterState: "TX", fosterZip: "", fosterPhone: "", fosterEmail: "", fosterDL: "", fosterHome: "1", fosterOwnership: "1",
            fosterLandlord: "1", fosterYard: "1", fosterFence: "", exerciseMethod: "", addressDuration: "", fosterSpecies: "1", fosterPetGender: "1", fosterPetSize: "1", petExperience: "",
            ownedBefore: "1", breedType: "", fosteredBefore: "1", fosterExperience: "", firstPet: "", firstYears: "", firstGender: "1", spayedNeutered1: false, secondPet: "", secondYears: "",
            twoGender: "1", spayedNeutered2: false, thirdPet: "", thirdYears: "", thirdGender: "1", spayedNeutered3: false, vetName: "", vetPhone: "", hoursAlone: "", dailyOccupancy: "",
            nightlyOccupancy: "", crateTrained: "1", adultOne: "", adultOneAge: "", adultOneRelation: "", adultTwo: "", adultTwoAge: "", adultTwoRelation: "",
            childOne: "", childOneAge: "", childOneRelation: "", childTwo: "", childTwoAge: "", childTwoRelation: "", anyoneAllergic: "1", childrenHome: "1", accommodations: "",
            referenceOne: "", firstPhone: "", referenceTwo: "", secondPhone: "", referenceThree: "", thirdPhone: "" }

      constructor(private http: HttpClient, public global: Globals, private _formBuilder: FormBuilder) {  }

      ngOnInit() { console.log('registering') }

      numberOnlyEvent(event: any): void {
            const charCode = (event.which) ? event.which : event.keyCode;

            if (charCode > 31 && (charCode < 48 || charCode > 57) && (charCode < 96 || charCode > 105) && charCode !== 110 && charCode !== 190) {
                  // Prevent non-numeric characters
                  event.preventDefault();
            }
      }

}
