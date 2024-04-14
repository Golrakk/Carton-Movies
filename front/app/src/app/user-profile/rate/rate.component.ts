import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from 'src/app/modeles/movie';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-rate',
  templateUrl: './rate.component.html',
  styleUrls: ['./rate.component.css']
})
export class RateComponent {
  movie: string = ""
  searched: boolean = false;
  movieFound: boolean = false;
  rated: boolean = false;
  movieRate: number = 0;
  errorMsg: string = "";
  constructor(public userService: UserService, private router: Router) { }
  ngOnInit(): void {
    if (!this.userService.isLoggedIn()) {
      this.router.navigate(['/'])
    }
  }
  findMovie() {
    this.searched = true;
    //getsearchmovie(movie)
  }

  rateMovie() {
    this.rated = true;
    //add movie with rating to db
    //this.movieRate = 0;
  }

}
