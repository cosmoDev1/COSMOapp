import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from './material-module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NewRescueDialogComponent } from './new-rescue-dialog/new-rescue-dialog.component';
import { NewFosterDialogComponent } from './new-foster-dialog/new-foster-dialog.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { AnimalDetailDialogComponent } from './animal-detail-dialog/animal-detail-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    NewRescueDialogComponent, NewFosterDialogComponent, ConfirmationDialogComponent, AnimalDetailDialogComponent
  ],
  imports: [
    BrowserModule, AppRoutingModule, BrowserAnimationsModule, MaterialModule, HttpClientModule, FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
