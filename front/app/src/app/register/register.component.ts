import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../modeles/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  nouveauNom: string = ""
  nouveauMDP: string = ""
  nouveauEmail: string = ""

  errorMsg: string = "";


  constructor(public userService: UserService, private router: Router) { }


  public onValidation() {
    const user: User = { id: 0, nom: this.nouveauNom, email: this.nouveauEmail, password: this.nouveauMDP };
    var response = JSON.stringify(this.userService.registerUser(user))
    this.router.navigate(['/login']);
  }
}
