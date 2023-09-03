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

      firstFormGroup = this._formBuilder.group({
            firstCtrl: ['', Validators.required],
      });
      secondFormGroup = this._formBuilder.group({
            secondCtrl: '',
      });
      constructor(private http: HttpClient, public global: Globals, private _formBuilder: FormBuilder) {  }


      ngOnInit() {
            console.log('registering')

      }

}
