import { Component } from '@angular/core';
import { UserService } from '../services/user.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.css']
})
export class AuthentificationComponent {
  name: String = "";
  password: String = "";
  token: string = "";
  errorMsg: string = "";

  constructor(public userService: UserService, private router: Router) { }
  ngOnInit(): void {
    if (this.userService.isLoggedIn()) {
      this.router.navigate(['/'])
    }
  }

  public async onValidation() {
    //await this.userService.login(this.name, this.password);
    console.log("WOOSHFOBU")
    this.userService.login(this.name, this.password);

  }

}
