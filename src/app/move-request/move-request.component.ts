import { Component } from '@angular/core';
import { MatDialogConfig, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-move-request',
  templateUrl: './move-request.component.html',
  styleUrls: ['./move-request.component.css']
})
export class MoveRequestComponent {

    moveData = { homeStatus:"", behaviorStatus:"", describeTrauma:"" }

    entireFormEnabled: boolean = false;

    constructor(public dialogRef: MatDialogRef<MoveRequestComponent>) { }

    submitDialog(moveForm: any) {
        var dataToSend = { homeStatus: this.moveData.homeStatus, behaviorStatus: this.moveData.behaviorStatus, describeTrauma: this.moveData.describeTrauma }

        if (moveForm.invalid) { return; }

        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        console.log(dataToSend)
    }


    closeDialog() {
        console.log('closing dialog')
        this.dialogRef.close();
    }
}
