import { Component } from '@angular/core';
import { MatDialogRef, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-supplies-request',
  templateUrl: './supplies-request.component.html',
  styleUrls: ['./supplies-request.component.css']
})
export class SuppliesRequestComponent {
    dialogRef: any;







    closeDialog() {
        console.log('closed')
        this.dialogRef.close();
    }
}
