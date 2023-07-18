import { Injectable } from '@angular/core';

export interface Animal {
  animalID: string;
  shelterAnimalID: string;
  shelterID: string;
  name: string;
  species: string;
  age: string;
  breed: string;
  weight: string;
  hwfiv: string;
  intakeDate: string;
  shelterNotes: string;
  volunteerNotes: string;
  volunteerFavorite: boolean;
  gender: string;
  imageURL: string;
  imageFile: string;
  status: number;
}



@Injectable({ providedIn: 'root' })
export class Globals {
  public rescueName: string = "Bernie Test Rescue";

  capitalize(s: any) {
    return s && s[0].toUpperCase() + s.slice(1).toLowerCase();
  }
}
