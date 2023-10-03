import { Injectable } from '@angular/core';


export interface Animal {
    animalID: string;
    shelterAnimalID: string;
    shelterID: number;
    name: string;
    dueOutDate: string;
    kennel: string;
    weight: string;
    condition: string;
    daysShelter: string;
    description: string;
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
    youtubeLink: string;
    facebookLink: string;
    dateAdded: string;
}



@Injectable({ providedIn: 'root' })
export class Globals {
    //public webserviceBaseUrl: string = "https://cosmoapp.org/app2/api/";
    public webserviceBaseUrl: string = "http://localhost:5000/api/";
    public testSource: string = '?testSource=false';
    //public webserviceUrl: string = "https://localhost:44307/api/values?testSource=true";
    public rescueName: string = "";
    public states: Array<any> = [];

    public allCities: Array<any> = [];
    public animals: Array<Animal> = [];
    public myAnimals: Array<Animal> = [];

  capitalize(s: any) {
    return s && s[0].toUpperCase() + s.slice(1).toLowerCase();
  }
}
