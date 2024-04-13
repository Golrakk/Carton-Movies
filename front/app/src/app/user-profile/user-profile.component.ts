import { Component, OnInit } from '@angular/core';
import { User, users } from '../modeles/user';
import { UserServiceService } from '../services/user-service.service';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  nouveauMDP : string = "";
  nouveauMail : string = "";
  user: User ={id:0, nom:"blu", email:"blu@blu.blu", password:"blublublu"};


  constructor(public userService: UserServiceService) { }


  ngOnInit(): void {
    this.user = users[0];
    this.nouveauMDP = this.user.password
    this.nouveauMail = this.user.email
  }

  onSubmitAjout(){
    if (this.nouveauMDP!="") {
      this.user.password = this.nouveauMDP
    }
    if (this.nouveauMail!="") {
      this.user.email = this.nouveauMail
    }
    this.enregistrerUser(this.user)
  }

  enregistrerUser(user: User){
    this.userService.enregistrerUser(user);
  }
}
