import { Component } from '@angular/core';
import { MatDialogRef, MatDialogConfig } from '@angular/material/dialog';

@Component({
    selector: 'bio-dialog',
    templateUrl: './bio-dialog.component.html',
    styleUrls: ['./bio-dialog.component.css']
})
export class BioDialogComponent {

    LongDescription = { SelectedDate: "", BehaveriolDescription:"",}

    entireFormEnabled: boolean = false;
constructor(public dialogRef: MatDialogRef<BioDialogComponent>) { }

    submitDialog(BioInfo: any) {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        console.log(this.LongDescription)

    }

    closeDialog() {
        console.log('closed')
        this.dialogRef.close();
    }
}
