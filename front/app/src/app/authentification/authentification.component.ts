import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { CookieService } from 'ngx-cookie-service';

// @Component({
//   selector: 'app-authentification',
//   templateUrl: './authentification.component.html',
//   styleUrls: ['./authentification.component.css']
// })
export class AuthentificationComponent {
  name: String = "";
  password: String = "";
  token: string = "";

  constructor(public userService: UserService, private cookieService: CookieService) { }


  public async onValidation() {
    this.token = await this.userService.login(this.name, this.password);
    this.cookieService.set('auth', 'yes');
    console.log(this.token);
  }

}
