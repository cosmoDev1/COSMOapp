import { Component } from '@angular/core';
import { MatDialogConfig, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-medical-request',
  templateUrl: './medical-request.component.html',
  styleUrls: ['./medical-request.component.css']
})
export class MedicalRequestComponent {

    medicalData = { symptomDescription: "", frequency: "1", selectedDate:"", requiresTransport:"1" }

    entireFormEnabled: boolean = false;

    constructor(public dialogRef: MatDialogRef<MedicalRequestComponent>) { }

    submitDialog(medicalForm: any) {
        var dataToSend = { symptomDescription: this.medicalData.symptomDescription, frequency: this.medicalData.frequency, selectedDate: this.medicalData.selectedDate.toLocaleString(), requiresTransport: this.medicalData.requiresTransport }

        if (medicalForm.invalid) { return; }

        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        console.log(this.medicalData.selectedDate.toLocaleString())
        console.log(dataToSend)
    }


    closeDialog() {
        console.log('closing dialog')
        this.dialogRef.close();
    }

}
