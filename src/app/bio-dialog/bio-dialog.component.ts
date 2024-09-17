import { Component } from '@angular/core';
import { MatDialogRef, MatDialogConfig } from '@angular/material/dialog';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Globals, Animal } from '../globals';

@Component({
    selector: 'bio-dialog',
    templateUrl: './bio-dialog.component.html',
    styleUrls: ['./bio-dialog.component.css']
})
export class BioDialogComponent {

    //bioData = { SelectedDate: "", BehaveriolDescription: "" };
    SelectedDate = "";
    BehaveriolDescription = "";

    entireFormEnabled: boolean = false;
    constructor(public global: Globals, private http: HttpClient, public dialogRef: MatDialogRef<BioDialogComponent>) { }

    submitDialog(bioInfo: any) {
        var dataToSend = { SelectedDate: this.SelectedDate.toLocaleString(), BehaveriolDescription: this.BehaveriolDescription }

        console.log(bioInfo)

        if (bioInfo.invalid) { return; }

        const dialogConfig = new MatDialogConfig(); 
        dialogConfig.disableClose = true;
        console.log(dataToSend)
    }

    testBio() {
        //POST client -> serverside
        //GET  client <- serverside
        //XML  xtended markup language  HTML  packet sniff

        //this.http.post(this.global.webserviceBaseUrl + 'bio/pupost', {}).subscribe((res: any) => {
        this.http.post('http://localhost:5000/api/bio/pupost', {}).subscribe((res: any) => {
            console.log(res);
            //if (res.text == 'error') {
            //    //openm dialog "AN ERROR OCURRED"
            //}
            //if (res.text == 'ok') {
            //    //open dialog Operation Successful
            //}
        });

    }

    saveBio() {
        //var data = { date: this.bioData.SelectedDate, description: this.bioData.BehaveriolDescription }

        var tempDate = this.SelectedDate;
        tempDate = tempDate.toLocaleString();
        
        var myObj = { date: this.SelectedDate.toLocaleString(), description: this.BehaveriolDescription };
        console.clear()
        console.log(myObj)

        this.http.post('http://localhost:5000/api/bio', myObj).subscribe((res: any) => {

            console.log('everything went ok')
            console.log(res);

            
        }, (err: any) => {
            //this section only happens if clientside -> serverside fails
            console.log('something horrible happened')
        })

    }

    closeDialog() {
        console.log('closed')
        this.dialogRef.close();
    }
}
