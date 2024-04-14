import { Component, OnInit } from '@angular/core';
import { User, users } from '../modeles/user';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  name: string = "";
  email: string = "";
  user: User = { id: 0, name: "", email: "", password: "" };
  errorMsg: string = "";
  password: string = "";

  constructor(public userService: UserService, private router: Router) { }
  ngOnInit(): void {
    if (!this.userService.isLoggedIn()) {
      this.router.navigate(['/login'])
    }
    this.user = users[0];
    this.email = this.user.email
  }

  onSubmitAjout() {
    if (this.password != "") {
      this.user.password = this.password
    }
    if (this.email != "") {
      this.user.email = this.email
    }
    this.registerUser(this.user)
  }

  registerUser(user: User) {
    this.userService.registerUser(user);
  }
}
