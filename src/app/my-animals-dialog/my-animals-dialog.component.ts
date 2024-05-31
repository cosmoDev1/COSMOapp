import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Animal, Globals } from '../globals';
import { MedicalRequestComponent } from '../medical-request/medical-request.component';
import { MoveRequestComponent } from '../move-request/move-request.component';


@Component({
  selector: 'app-my-animals-dialog',
  templateUrl: './my-animals-dialog.component.html',
  styleUrls: ['./my-animals-dialog.component.css']
})
export class MyAnimalsDialogComponent {
    myAnimals = new MatTableDataSource<Animal>(this.global.animals);
    displayedColumns: string[] = [ 'action', 'shelterAnimalID', 'name', 'gender', 'breed', 'weight', 'age'];

    constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog, dialogRef: MatDialogRef<MyAnimalsDialogComponent>, public global: Globals) {
        this.global.myAnimals = this.global.animals.filter((el) => el.status > 99);
        this.myAnimals.data = this.global.myAnimals;
    }

    requestMedical() {
        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.data = { title: 'Notice', message: 'There are no animals tagged yet.', notification: true };

        const dialogRef = this.dialog.open(MedicalRequestComponent, dialogConfig);

   
    }

    moveRequest() {
        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.data = { title: 'Notice', message: 'There are no animals tagged yet.', notification: true };

        const dialogRef = this.dialog.open(MoveRequestComponent, dialogConfig);


    }


}
