import { Component } from '@angular/core';
import { Movie } from 'src/app/modeles/movie';

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
