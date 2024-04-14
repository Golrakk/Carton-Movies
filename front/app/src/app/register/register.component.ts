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
  name: string = ""
  password: string = ""
  email: string = ""

  errorMsg: string = "";


  constructor(public userService: UserService, private router: Router) { }
  ngOnInit(): void {
    if (this.userService.isLoggedIn()) {
      this.router.navigate(['/'])
    }
  }

  public onValidation() {
    const user: User = { id: 0, name: this.name, email: this.password, password: this.email };
    var response = JSON.stringify(this.userService.registerUser(user))
    this.router.navigate(['/login']);
  }
}
