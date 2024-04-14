import { Component } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.css']
})
export class AuthentificationComponent {
  name: String = "";
  password: String = "";
  token: string = "";

  constructor(public userService: UserService) { }


  public async onValidation() {
    this.token = await this.userService.login(this.name, this.password);
    console.log(this.token);
  }

}
