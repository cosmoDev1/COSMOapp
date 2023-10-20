import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from "@angular/material/dialog";
import { Globals } from '../globals';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
    selector: 'animal-detail-dialog',
    templateUrl: './animal-detail-dialog.component.html',
    styleUrls: ['./animal-detail-dialog.component.css']
})
export class AnimalDetailDialogComponent {
    editMode: boolean = false;
    saveAnimalInfo: any;
    description: any;
    formSaving: boolean = false;
    constructor(@Inject(MAT_DIALOG_DATA) public data: any, private http: HttpClient, public global: Globals, private dialog: MatDialog, public dialogRef: MatDialogRef<AnimalDetailDialogComponent>) { }

    closeDialog() { this.dialogRef.close('close'); }

    editDialog() { this.editMode = !this.editMode; }

    saveDialog() {
        var animalInfo = { shelterAnimalId: this.data.animalInfo.shelterAnimalId, facebookLink: this.data.animalInfo.facebookLink, youtubeLink: this.data.animalInfo.youtubeLink, volunteerNotes: this.data.animalInfo.volunteerNotes, volunteerFavorite: this.data.animalInfo.volunteerFavorite };
        console.log(animalInfo)
        this.formSaving = true;
        
        this.http.post(this.global.webserviceBaseUrl + 'animalUpdateInfo/prpost', animalInfo).subscribe(
            (response: any) => {
                console.log('Animal information updated successfully', response);
                // You can perform any additional actions here after a successful update.
                this.dialog.open(ConfirmationDialogComponent, {
                    width: '350px',
                    data: { title: response.status.toUpperCase(), message: response.description }
                });

                this.dialogRef.close('update');
            },
            (error) => {
                this.dialog.open(ConfirmationDialogComponent, {
                    width: '350px',
                    data: { title: 'error', message: error }
                });

                this.dialogRef.close('update');

                console.error('Failed to update animal information', error);
                // Handle errors or display error messages to the user.
            }
        );

    }
   
}