import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecomendationComponent } from './recomendation/recomendation.component';
import { Err404Component } from './err404/err404.component';
import { UserProfileComponent } from "./user-profile/user-profile.component";
import { RateComponent } from './user-profile/rate/rate.component';
import { AuthentificationComponent } from './authentification/authentification.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: '', component: RecomendationComponent },
  { path: 'login', component: AuthentificationComponent },
  { path: 'signin', component: RegisterComponent },
  { path: 'user', component: UserProfileComponent },
  { path: 'rate', component: RateComponent },
  { path: '*', component: Err404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
