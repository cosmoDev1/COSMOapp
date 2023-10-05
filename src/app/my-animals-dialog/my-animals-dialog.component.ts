import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Animal, Globals } from '../globals';




@Component({
  selector: 'app-my-animals-dialog',
  templateUrl: './my-animals-dialog.component.html',
  styleUrls: ['./my-animals-dialog.component.css']
})
export class MyAnimalsDialogComponent {
    myAnimals = new MatTableDataSource<Animal>(this.global.animals);
    displayedColumns: string[] = [ 'action', 'shelterAnimalID', 'name', 'gender', 'breed', 'weight', 'age'];

      constructor(@Inject(MAT_DIALOG_DATA) public data: any, dialogRef: MatDialogRef<MyAnimalsDialogComponent>, public global: Globals) {
            console.clear();
            console.log(this.global.myAnimals)
        this.global.myAnimals = this.global.animals.filter((el) => el.status > 99);
        this.myAnimals.data = this.global.myAnimals;
    }
   
}
