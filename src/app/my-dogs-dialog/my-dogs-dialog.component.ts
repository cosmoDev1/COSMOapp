import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Animal, Globals } from '../globals';




@Component({
  selector: 'app-my-dogs-dialog',
  templateUrl: './my-dogs-dialog.component.html',
  styleUrls: ['./my-dogs-dialog.component.css']
})
export class MyDogsDialogComponent {

    myAnimals = new MatTableDataSource<Animal>(this.global.animals);
    displayedColumns: string[] = [ 'action', 'shelterAnimalID', 'name', 'gender', 'breed', 'weight', 'age'];


    constructor(@Inject(MAT_DIALOG_DATA) public data: any, dialogRef: MatDialogRef<MyDogsDialogComponent>, public global: Globals) {
        this.global.myAnimals = this.global.animals.filter((el) => el.status == 2);
        this.myAnimals.data = this.global.myAnimals;
    }
    
   
}
