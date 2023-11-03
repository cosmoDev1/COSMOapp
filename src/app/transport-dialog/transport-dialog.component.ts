import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog, } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Globals } from '../globals';

@Component({
  selector: 'app-transport-dialog',
  templateUrl: './transport-dialog.component.html',
  styleUrls: ['./transport-dialog.component.css']
})
export class TransportDialogComponent implements OnInit {
    transport: any = [];
    transportDatasource = new MatTableDataSource<any>();
    transportColumns: string[] = ['action', 'name', 'city', 'state', 'zip', 'phone', 'email'];
    selectedState = 'any';
    cities: any[] = [];
    formdata = { transportSelect: "" }

    constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<TransportDialogComponent>, private dialog: MatDialog, private http: HttpClient, public global: Globals) {

    }

    ngOnInit(): void {
        this.http.get<any>(this.global.webserviceBaseUrl + 'transport/prget').subscribe((response:any) => {
            console.log("API Response:", response);  // Check the full response

            if (response.status == 'error') {
                this.dialogRef.close({ title: 'Error', data: response.description });
            } else {
                if (response.data.length == 0) {
                    this.dialogRef.close({ title: 'Notification', data: 'There are no registered transports' });
                } else {

                    this.transport = response.data;
                    this.transportDatasource.data = response.data;
                    console.log("Assigned Transports:", this.transport);
                }
            }
        });
    }

    closeDialog() { this.dialogRef.close({ title:"", button: 'close', data: '' }); }

    onStateChange(selectedState: string) {
        console.log("State changed to:", selectedState);
        var tempTransports = [];

        if (selectedState == 'any') { tempTransports = this.transport; } else {
            tempTransports = this.transport.filter((availTransports: any) => availTransports.transportState === selectedState);
        }

        this.transportDatasource.data = tempTransports;
    }

    selectedTransport(transportId: string) {
        console.log("Inside selectedFoster with Name:", transportId); // This will log the transport ID.
        this.dialogRef.close({ button: 'select', data: transportId });
    }
}
