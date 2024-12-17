import { Component } from '@angular/core';
import { MatDialogRef, MatDialogConfig } from '@angular/material/dialog';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-supplies-request',
  templateUrl: './supplies-request.component.html',
  styleUrls: ['./supplies-request.component.css']
})
export class SuppliesRequestComponent {

    supplyData = { radioDescription: "1", quantity: "", textDescription: "", }

    entireFormEnabled: boolean = false;

    constructor(private http: HttpClient, public dialogRef: MatDialogRef<SuppliesRequestComponent>) { }

    submitDialog(supplyInfo: any) {
        var dataToSend = { radioDescription: this.supplyData.radioDescription.toLocaleString(), quantity: this.supplyData.quantity, textDescription: this.supplyData.textDescription }

        this.http.post('http://localhost:5000/api/supplies', dataToSend).subscribe((res: any) => {

            console.log('everything went ok')
            console.log(res);


        }, (err: any) => {
            //this section only happens if clientside -> serverside fails
            console.log('something horrible happened')
        })

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
