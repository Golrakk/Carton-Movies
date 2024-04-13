import { Component } from '@angular/core';
import { UserServiceService } from '../services/user-service.service';
import { User } from '../modeles/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-creation-compte',
  templateUrl: './creation-compte.component.html',
  styleUrls: ['./creation-compte.component.css']
})
export class CreationCompteComponent {
  nouveauNom: string = ""
  nouveauMDP: string = ""
  nouveauEmail: string = ""

  errorMsg: string = "";


  constructor(public userService: UserServiceService, private router: Router){}


  public onValidation(){
    const user : User = {id : 0, nom : this.nouveauNom, email : this.nouveauEmail, password : this.nouveauMDP };
    var response = JSON.stringify(this.userService.enregistrerUser(user))
    this.router.navigate(['/login']);
  }
}
