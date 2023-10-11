import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


export interface Animal {
    id: string;
    shelterAnimalId: string;
    shelterId: number;
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
    statusInfo: string;
    statusDate: string;
    youtubeLink: string;
    facebookLink: string;
    addedDate: string;
}


@Injectable({ providedIn: 'root' })
export class Globals {
    myFosters: any;

      constructor(private http: HttpClient) {
            this.http.get(this.webserviceBaseUrl + 'cities/prget').subscribe((res: any) => {
                  console.log('cities loaded')
                  if (res.status == "success") { this.allCities = res.data; }

                  this.http.get(this.webserviceBaseUrl + 'states/prget').subscribe((res: any) => {
                        console.log('states loaded')
                        if (res.status == "success") {
                              this.states = res.data;
                              this.statesChange.emit(this.states);
                        }
                  });
            });
      }

    //public webserviceBaseUrl: string = "https://cosmoapp.org/apps2/api/";
    public webserviceBaseUrl: string = "http://localhost:5000/api/";
    public testSource: string = '?testSource=false';
    public rescueName: string = "";
    public states: Array<any> = [];
    statesChange: EventEmitter<any> = new EventEmitter();

    public allCities: Array<any> = [];
    public animals: Array<Animal> = [];
    public myAnimals: Array<Animal> = [];
    public animalsLoading: boolean = true;
    public animalsError: string = "";


    capitalize(s: any) {
       return s && s[0].toUpperCase() + s.slice(1).toLowerCase();
    }
}
