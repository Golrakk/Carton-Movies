import { Component } from '@angular/core';
import { Preferences, prefs } from '../modeles/prefs';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.css']
})
export class PreferencesComponent {
  prefs: Preferences[];
  prefsList: Preferences[];
  prefAdult: boolean;
  
  constructor() {
    this.prefs = [];
    this.prefsList = [];
    this.prefAdult = false;
  }

  ngOnInit(): void {
    this.prefs = prefs;
  }

  addRemovePrefs(pref : Preferences) {
    if (this.prefsList.includes(pref)) {
      this.prefsList = this.prefsList.filter(prf => prf !== pref);
    }
    else {
      this.prefsList.push(pref);
    }

   this.prefsList.forEach(element => {
    console.log(element.name + " " + element.id)
   });
  }

  sendPrefs() {
    var jsonPref = JSON.stringify(this.prefsList);
    if (this.prefsList.length != 0) {
      var jsonRes = JSON.stringify({adult: this.prefAdult, genres: this.prefsList});
    }
    else {
      var jsonRes = JSON.stringify({adult: this.prefAdult, genres: []});
    }
    
    console.log(jsonRes)
  }
}
