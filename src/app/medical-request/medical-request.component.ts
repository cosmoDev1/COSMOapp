import { Component } from '@angular/core';
import { MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-medical-request',
  templateUrl: './medical-request.component.html',
  styleUrls: ['./medical-request.component.css']
})
export class MedicalRequestComponent {

    medicalData = { symptomDescription: "", frequency: "1", selectedDate:"", requiresTransport:"1" }

    entireFormEnabled: boolean = false;

    constructor(private http: HttpClient, public dialogRef: MatDialogRef<MedicalRequestComponent>) { }

    submitDialog(medicalForm: any) {
        if (medicalForm.invalid) { return; }

        var dataToSend = { symptomDescription: this.medicalData.symptomDescription, frequency: this.medicalData.frequency, selectedDate: this.medicalData.selectedDate.toLocaleString(), requiresTransport: this.medicalData.requiresTransport }

        this.http.post('http://localhost:5000/api/medical', dataToSend).subscribe((res: any) => {
            console.log('everything went ok')
            console.log(res);

            this.dialogRef.close();
        }, (err: any) => {
            //this section only happens if clientside -> serverside fails
            console.log('something horrible happened')

        })


        //const dialogConfig = new MatDialogConfig();
        //dialogConfig.disableClose = true;
        //console.log(this.medicalData.selectedDate.toLocaleString())
        console.log(dataToSend)
    }


    closeDialog() {
        console.log('closing dialog')
        this.dialogRef.close();
    }

}
