import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RecomendationComponent } from './recomendation/recomendation.component';
import { Err404Component } from './err404/err404.component';
import { HttpClientModule } from '@angular/common/http';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { FormsModule } from '@angular/forms';
import { RateComponent } from './user-profile/rate/rate.component';
import { PreferencesComponent } from './preferences/preferences.component';
import { AuthentificationComponent } from './authentification/authentification.component';
import { RegisterComponent } from './register/register.component';
import { HeaderComponent } from './header/header.component';


@NgModule({
  declarations: [
    AppComponent,
    RecomendationComponent,
    Err404Component,
    UserProfileComponent,
    RateComponent,
    PreferencesComponent,
    AuthentificationComponent,
    RegisterComponent,
    HeaderComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
