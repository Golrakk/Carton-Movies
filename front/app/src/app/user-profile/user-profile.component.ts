import { Component, OnInit } from '@angular/core';
import { User, users } from '../modeles/user';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  nouveauMDP: string = "";
  nouveauMail: string = "";
  user: User = { id: 0, nom: "blu", email: "blu@blu.blu", password: "blublublu" };


  constructor(public userService: UserService) { }


  ngOnInit(): void {
    this.user = users[0];
    this.nouveauMDP = this.user.password
    this.nouveauMail = this.user.email
  }

  onSubmitAjout() {
    if (this.nouveauMDP != "") {
      this.user.password = this.nouveauMDP
    }
    if (this.nouveauMail != "") {
      this.user.email = this.nouveauMail
    }
    this.registerUser(this.user)
  }

  registerUser(user: User) {
    this.userService.registerUser(user);
  }
}
