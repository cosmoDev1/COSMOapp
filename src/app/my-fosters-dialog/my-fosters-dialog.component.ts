import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Animal, Globals } from '../globals';
import { HttpClient, HttpHeaders } from '@angular/common/http';



@Component({
  selector: 'app-my-fosters-dialog',
  templateUrl: './my-fosters-dialog.component.html',
  styleUrls: ['./my-fosters-dialog.component.css']
})
export class MyFostersDialogComponent {

    myFosters = new MatTableDataSource<any>();
    fosterColumns: string[] = ['action', 'name', 'city', 'state', 'zip', 'phone', 'email'];
    
    constructor(@Inject(MAT_DIALOG_DATA) public data: any, dialogRef: MatDialogRef<MyFostersDialogComponent>, private http: HttpClient, public global: Globals) {
      
    }

    ngOnInit(): void {
        this.http.get<any>(this.global.webserviceBaseUrl + 'fosters/prget').subscribe(response => {
            console.log("API Response:", response);  // Check the full response
            this.myFosters.data = response.data;
            console.log("Assigned Fosters:", this.myFosters.data);  // Check the assigned fosters data
        });
    }

    
}
