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
