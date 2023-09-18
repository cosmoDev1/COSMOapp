import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { MaterialModule } from './material-module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AuthModule } from '@auth0/auth0-angular';

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


@NgModule({
    declarations: [
        AppComponent, MainComponent,
        NewRescueDialogComponent, NewFosterDialogComponent, NewShelterDialogComponent, NewNetworkerDialogComponent,
        MyAnimalsDialogComponent, AnimalDetailDialogComponent,
        ConfirmationDialogComponent, PleaDialogComponent, RegisterComponent, TagDialogComponent
    ],
    imports: [
          BrowserModule, AppRoutingModule, BrowserAnimationsModule, MaterialModule, HttpClientModule, FormsModule, ReactiveFormsModule, 
          AuthModule.forRoot({
                domain: 'dev-1tjg2tztyxoxvinb.us.auth0.com',
                clientId: 'V58jvBwPdYmCIcbR9xKLg6QdELSPdzQZ',
                authorizationParams: {
                      redirect_uri: window.location.origin
                }
          }),
    ],
    providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
    bootstrap: [AppComponent]
})
export class AppModule { }
