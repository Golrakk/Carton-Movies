import { Component } from '@angular/core';
import { Movie, movies } from '../modeles/movie';
import { RecomendationService } from '../services/recomendation.service';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recomendation',
  templateUrl: './recomendation.component.html',
  styleUrls: ['./recomendation.component.css']
})
export class RecomendationComponent {
  movies: Movie[];
  user: string = "";
  searched: boolean = false;
  userFound: boolean = false;
  errorMsg: string = "";

  constructor(public recommandationService: RecomendationService, public userService: UserService, private router: Router) {
    this.movies = [];
  }
  ngOnInit(): void {
    if (!this.userService.isLoggedIn()) {
      this.router.navigate(['/login'])
    }
    this.getMovies()
  }

  async addUser() {
    this.searched = true;
    //this.userFound = (call api pour trouver le user)

    //this.movies.append(liste des films recommandés a user)
  }

  async getMovies() {
    //Api call to find the user's list of movies previously rated
    //this.movies =  await this.recommandationService.getJsonDataResult();
    console.log(this.movies)
  }
}
