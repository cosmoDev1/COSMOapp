import { ApplicationInitStatus, Component } from '@angular/core';
import { MatDialogRef, MatDialogConfig } from '@angular/material/dialog';

@Component({
    selector: 'bio-dialog',
    templateUrl: './bio-dialog.component.html',
    styleUrls: ['./bio-dialog.component.css']
})
export class BioDialogComponent {

    bioData = { SelectedDate: "", BehaveriolDescription: "" };


    entireFormEnabled: boolean = true;
    constructor(public dialogRef: MatDialogRef<BioDialogComponent>) { }

    submitDialog(bioInfo: any) {
        var dataToSend = { SelectedDate: this.bioData.SelectedDate.toLocaleString(), BehaveriolDescription: this.bioData.BehaveriolDescription }

        console.log(this.bioData)

        if (bioInfo.invalid) { return; }

        const dialogConfig = new MatDialogConfig(); 
        dialogConfig.disableClose = true;
        console.log(dataToSend)
        //here we send that info to the database using an httpclient


        //loosely typed language
        //strongly typed language - strict mode

        //SQL         C#               HTML CSS javascript typescript Angular (typescript framework)  React
        database < -> server side                    <-> client side
                      //API                               //http client
                      //webservices -> endpoints
                      //sql clients

    }

    closeDialog() {
        console.log('closed')
        this.dialogRef.close();
    }
}
