import { Component } from '@angular/core';
import { MatDialogRef, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-supplies-request',
  templateUrl: './supplies-request.component.html',
  styleUrls: ['./supplies-request.component.css']
})
export class SuppliesRequestComponent {

    supplyData = { radioDescription: "", quantity: "", textDescription: "", }

    entireFormEnabled: boolean = false;
    constructor(public dialogRef: MatDialogRef<SuppliesRequestComponent>) { }

    submitDialog(supplyInfo: any) {
        var dataToSend = { radioDescription: this.supplyData.radioDescription.toLocaleString(), quantity: this.supplyData.quantity, textDescription: this.supplyData.textDescription }

        console.log(supplyInfo)

        if (supplyInfo.invalid) { return; }

        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        console.log(dataToSend)
    }


    closeDialog() {
        console.log('closed')
        this.dialogRef.close();
    }
}
