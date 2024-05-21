import { Component } from '@angular/core';
import { MatDialogRef, MatDialogConfig } from '@angular/material/dialog';

@Component({
    selector: 'bio-dialog',
    templateUrl: './bio-dialog.component.html',
    styleUrls: ['./bio-dialog.component.css']
})
export class BioDialogComponent {

    bioData = { SelectedDate: "", BehaveriolDescription: "" };

    entireFormEnabled: boolean = false;
constructor(public dialogRef: MatDialogRef<BioDialogComponent>) { }

    submitDialog(bioInfo: any) {
        var dataToSend = { SelectedDate: this.bioData.SelectedDate.toLocaleString(), BehaveriolDescription: this.bioData.BehaveriolDescription }

        console.log(bioInfo)

        if (bioInfo.invalid) { return; }

        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        console.log(dataToSend)

    }

    closeDialog() {
        console.log('closed')
        this.dialogRef.close();
    }
}
