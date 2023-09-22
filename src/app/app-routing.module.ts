import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@auth0/auth0-angular';

import { MainComponent } from './main/main.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
      { path: '', component: MainComponent, canActivate: [AuthGuard] },
      //{ path: '', component: MainComponent },
      { path: 'register', component: RegisterComponent, pathMatch: 'full', title: 'COSMO - Request new account' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
