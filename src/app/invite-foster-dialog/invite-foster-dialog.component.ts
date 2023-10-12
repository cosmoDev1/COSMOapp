import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Globals } from '../globals';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
    selector: 'app-invite-foster-dialog',
    templateUrl: './invite-foster-dialog.component.html',
    styleUrls: ['./invite-foster-dialog.component.css']
})
export class InviteFosterDialogComponent {
    formdata = { inviteFosterEmail: '' };
    emailInProgress: boolean = false;

    constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<InviteFosterDialogComponent>, private dialog: MatDialog, private http: HttpClient, public global: Globals) { }

    submitDialog(inviteForm: any) {
        if (!inviteForm.valid) { return }

        this.emailInProgress = true;
        const inviteEmail = inviteForm.value.fosterEmail;

        this.http.post(this.global.webserviceBaseUrl + 'invitefoster/prpost', { email: inviteEmail }).subscribe(
            (response: any) => {
                if (response.status == 'error') {
                    this.dialog.open(ConfirmationDialogComponent, {
                        data: { title: 'Error', message: response.description }
                    });
                    this.dialogRef.close();
                }
                else {
                      console.log('Invitation sent successfully', inviteEmail);
                      this.dialogRef.close();
                }
            },
                error => { console.error('Error sending invitation', error); }
          );
    }
}