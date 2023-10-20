import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Animal, Globals } from '../globals';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-my-fosters-dialog',
  templateUrl: './my-fosters-dialog.component.html',
  styleUrls: ['./my-fosters-dialog.component.css']
})
export class MyFostersDialogComponent implements OnInit {
    myFosters: any = [];
    myFostersDatasource = new MatTableDataSource<any>();
    fosterColumns: string[] = ['action', 'name', 'city', 'state', 'zip', 'phone', 'email'];
    selectedState = 'any';
    cities: any[] = [];
    
    constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<MyFostersDialogComponent>, private dialog: MatDialog, private http: HttpClient, public global: Globals) {
      
    }

    ngOnInit(): void {
        this.http.get<any>(this.global.webserviceBaseUrl + 'fosters/prget').subscribe(response => {
            console.log("API Response:", response);  // Check the full response

            if (response.status == 'error') {
                this.dialogRef.close({ title: 'Error', data: response.description });
            } else {
                if (response.data.length == 0) {
                    this.dialogRef.close({ title: 'Notification', data: 'There are no registered fosters' });
                } else {

                    this.myFosters = response.data;
                    this.myFostersDatasource.data = response.data;
                    console.log("Assigned Fosters:", this.myFosters);
                }
            }
        });
    }

    closeDialog() { this.dialogRef.close({ title: '', data: '' }); }

    onStateChange(selectedState: string) {
        console.log("State changed to:", selectedState);
        var tempMyFosters = [];

        if (selectedState == 'any') { tempMyFosters = this.myFosters; } else {
            tempMyFosters = this.myFosters.filter((foster: any) => foster.fosterState === selectedState);
        }
        
        this.myFostersDatasource.data = tempMyFosters;
    }

}
