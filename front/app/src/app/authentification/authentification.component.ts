import { Component } from '@angular/core';
import { UserServiceService } from '../services/user-service.service';

@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.css']
})
export class AuthentificationComponent {
  nouveauNom: String = "";
  nouveauMDP: String = "";
  token: string = "";

  constructor(public userService: UserServiceService){}


  public async onValidation(){
    this.token = await this.userService.login(this.nouveauNom, this.nouveauMDP);
    console.log(this.token);
  }
}
