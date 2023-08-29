import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { NewRescueDialogComponent } from './new-rescue-dialog/new-rescue-dialog.component';

const routes: Routes = [
      { path: '', component: AppComponent, pathMatch: 'full' },
      { path: 'newRescue', component: NewRescueDialogComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
