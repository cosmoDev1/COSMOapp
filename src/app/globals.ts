import { Injectable } from '@angular/core';

//export interface Animal {
//  animalID: string;
//  shelterAnimalID: string;
//  shelterID: string;
//  name: string;
//  species: string;
//  age: string;
//  breed: string;
//  weight: string;
//  hwfiv: string;
//  intakeDate: string;
//  shelterNotes: string;
//  volunteerNotes: string;
//  volunteerFavorite: boolean;
//  gender: string;
//  imageURL: string;
//  imageFile: string;
//  status: number;
//}


export interface Animal {
    animalID: string;
    shelterAnimalID: string;
    shelterID: string;
    name: string;
    dueOutDate: string;
    kennel: string;
    weight: string;
    condition: string;
    daysShelter: string;
    decription: string;
    gender: string;
    age: string;
    spayNeuter: string;
    breed: string;
    color: string;
    hwFIVstatus: string;
    outcomeRequest: string;
    reason: string;
    evalNotes: string;
    species: string;

    volunteerNotes: string;
    volunteerFavorite: boolean;
    imageFile: string;
    status: number;
}



@Injectable({ providedIn: 'root' })
export class Globals {
    public rescueName: string = "Bernie Test Rescue";
    public states: any = [
        { "name": "Alabama", "abbreviation": "AL" },
        { "name": "Alaska", "abbreviation": "AK" },
        { "name": "American Samoa", "abbreviation": "AS" },
        { "name": "Arizona", "abbreviation": "AZ" },
        { "name": "Arkansas", "abbreviation": "AR" },
        { "name": "California", "abbreviation": "CA" },
        { "name": "Colorado", "abbreviation": "CO" },
        { "name": "Connecticut", "abbreviation": "CT" },
        { "name": "Delaware", "abbreviation": "DE" },
        { "name": "District Of Columbia", "abbreviation": "DC" },
        { "name": "Federated States Of Micronesia", "abbreviation": "FM" },
        { "name": "Florida", "abbreviation": "FL" },
        { "name": "Georgia", "abbreviation": "GA" },
        { "name": "Guam", "abbreviation": "GU" },
        { "name": "Hawaii", "abbreviation": "HI" },
        { "name": "Idaho", "abbreviation": "ID" },
        { "name": "Illinois", "abbreviation": "IL" },
        { "name": "Indiana", "abbreviation": "IN" },
        { "name": "Iowa", "abbreviation": "IA" },
        { "name": "Kansas", "abbreviation": "KS" },
        { "name": "Kentucky", "abbreviation": "KY" },
        { "name": "Louisiana", "abbreviation": "LA" },
        { "name": "Maine", "abbreviation": "ME" },
        { "name": "Marshall Islands", "abbreviation": "MH" },
        { "name": "Maryland", "abbreviation": "MD" },
        { "name": "Massachusetts", "abbreviation": "MA" },
        { "name": "Michigan", "abbreviation": "MI" },
        { "name": "Minnesota", "abbreviation": "MN" },
        { "name": "Mississippi", "abbreviation": "MS" },
        { "name": "Missouri", "abbreviation": "MO" },
        { "name": "Montana", "abbreviation": "MT" },
        { "name": "Nebraska", "abbreviation": "NE" },
        { "name": "Nevada", "abbreviation": "NV" },
        { "name": "New Hampshire", "abbreviation": "NH" },
        { "name": "New Jersey", "abbreviation": "NJ" },
        { "name": "New Mexico", "abbreviation": "NM" },
        { "name": "New York", "abbreviation": "NY" },
        { "name": "North Carolina", "abbreviation": "NC" },
        { "name": "North Dakota", "abbreviation": "ND" },
        { "name": "Northern Mariana Islands", "abbreviation": "MP" },
        { "name": "Ohio", "abbreviation": "OH" },
        { "name": "Oklahoma", "abbreviation": "OK" },
        { "name": "Oregon", "abbreviation": "OR" },
        { "name": "Palau", "abbreviation": "PW" },
        { "name": "Pennsylvania", "abbreviation": "PA" },
        { "name": "Puerto Rico", "abbreviation": "PR" },
        { "name": "Rhode Island", "abbreviation": "RI" },
        { "name": "South Carolina", "abbreviation": "SC" },
        { "name": "South Dakota", "abbreviation": "SD" },
        { "name": "Tennessee", "abbreviation": "TN" },
        { "name": "Texas", "abbreviation": "TX" },
        { "name": "Utah", "abbreviation": "UT" },
        { "name": "Vermont", "abbreviation": "VT" },
        { "name": "Virgin Islands", "abbreviation": "VI" },
        { "name": "Virginia", "abbreviation": "VA" },
        { "name": "Washington", "abbreviation": "WA" },
        { "name": "West Virginia", "abbreviation": "WV" },
        { "name": "Wisconsin", "abbreviation": "WI" },
        { "name": "Wyoming", "abbreviation": "WY" }
    ];

    public animals: Array<Animal> = [];
    public myAnimals: Array<Animal> = [];

  capitalize(s: any) {
    return s && s[0].toUpperCase() + s.slice(1).toLowerCase();
  }
}


//<mat-form - field class="textField" >
//    <mat-label > City < /mat-label>
//    < input id = "city" matInput type = "text"[(ngModel)] = "info.city" required name = "city" #city = "ngModel" maxlength = "50" />
//        <button * ngIf="info.city" matSuffix mat - icon - button aria - label="Clear"(click) = "info.city=''" >
//            <mat-icon > close < /mat-icon>
//            < /button>
//            < mat - error * ngIf="city.errors?.['required']" >
//                City is < strong > required < /strong>
//                    < /mat-error>
//                    < mat - hint * ngIf="city.value?.length == 50" > Max length reached < /mat-hint>
//                        < /mat-form-field>


