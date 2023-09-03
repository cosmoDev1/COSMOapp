import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { RegisterComponent } from './register/register.component';

//, pathMatch: 'full'
const routes: Routes = [
      { path: '', component: MainComponent },
      { path: 'register', component: RegisterComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
