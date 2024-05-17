import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpBackend } from '@angular/common/http';


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
      private customHttpClient: HttpClient;

      constructor(private backend: HttpBackend) {
            this.customHttpClient = new HttpClient(backend);

            this.customHttpClient.get(this.webserviceBaseUrl + 'cities/puget').subscribe((res: any) => {
                  console.log('cities loaded')
                  if (res.status == "success") { this.allCities = res.data; }

                  this.customHttpClient.get(this.webserviceBaseUrl + 'states/puget').subscribe((res: any) => {
                        console.log('states loaded')
                        if (res.status == "success") {
                              this.states = res.data;
                              this.statesChange.emit(this.states);
                        }
                  }, (err: any) => {
                        console.log('error states')
                        console.log(err);
                  });
            }, (err: any) => {
                  console.log('error cities')
                  console.log(err);
            });
      }

    public webserviceBaseUrl: string = "https://cosmoapp.org/apps2/api/";
    //public webserviceBaseUrl: string = "http://localhost:5000/api/";
    //'https://cosmoapp.org/webservices/PDFdata/'
    //change this setting for production environment
    public imagesBaseUrl: string = "assets//images//";
    public registerActive: boolean = false;
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
