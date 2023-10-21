import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { MaterialModule } from './material-module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AuthModule, AuthHttpInterceptor } from '@auth0/auth0-angular';

import { environment as env } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { NewRescueDialogComponent } from './new-rescue-dialog/new-rescue-dialog.component';
import { NewFosterDialogComponent } from './new-foster-dialog/new-foster-dialog.component';
import { NewShelterDialogComponent } from './new-shelter-dialog/new-shelter-dialog.component';
import { NewNetworkerDialogComponent } from './new-networker-dialog/new-networker-dialog.component';

import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { TagDialogComponent } from './tag-dialog/tag-dialog.component';
import { AnimalDetailDialogComponent } from './animal-detail-dialog/animal-detail-dialog.component';
import { MyAnimalsDialogComponent } from './my-animals-dialog/my-animals-dialog.component';
import { PleaDialogComponent } from './plea-dialog/plea-dialog.component';
import { RegisterComponent } from './register/register.component';
import { MyFostersDialogComponent } from './my-fosters-dialog/my-fosters-dialog.component';
import { InviteFosterDialogComponent } from './invite-foster-dialog/invite-foster-dialog.component';
import { NewTransportDialogComponent } from './new-transport-dialog/new-transport-dialog.component';


@NgModule({
    declarations: [
        AppComponent, MainComponent,
        NewRescueDialogComponent, NewFosterDialogComponent, NewShelterDialogComponent, NewNetworkerDialogComponent,
        MyAnimalsDialogComponent, AnimalDetailDialogComponent,
        ConfirmationDialogComponent, PleaDialogComponent, RegisterComponent, TagDialogComponent, MyFostersDialogComponent, InviteFosterDialogComponent, NewTransportDialogComponent
    ],
    imports: [
          BrowserModule, AppRoutingModule, BrowserAnimationsModule, MaterialModule, HttpClientModule, FormsModule, ReactiveFormsModule, 
          AuthModule.forRoot({ ...env.auth }),
    ],
    providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true },
          { provide: LocationStrategy, useClass: HashLocationStrategy }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
