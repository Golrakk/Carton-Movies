import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RecomendationComponent } from './recomendation/recomendation.component';
import { Err404Component } from './err404/err404.component';
import { HttpClientModule } from '@angular/common/http';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { FormsModule } from '@angular/forms';
import { GoutComponent } from './user-profile/gout/gout.component';
import { RechercheComponent } from './user-profile/gout/recherche/recherche.component';
import { PreferencesComponent } from './preferences/preferences.component';
import { AuthentificationComponent } from './authentification/authentification.component';
import { CreationCompteComponent } from './creation-compte/creation-compte.component';


@NgModule({
  declarations: [
    AppComponent,
    RecomendationComponent,
    Err404Component,
    UserProfileComponent,
    GoutComponent,
    RechercheComponent,
    PreferencesComponent,
    AuthentificationComponent,
    CreationCompteComponent

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
